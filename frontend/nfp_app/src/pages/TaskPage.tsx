import React, { useState, useEffect, useRef } from "react"; 
import {
    Box,
    Typography,
    IconButton,
    TextField,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    InputAdornment,
    Checkbox,
    Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { BASE_URL } from "../constants";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getEmptyImage } from 'react-dnd-html5-backend';

// Define item types for drag and drop
const ItemTypes = {
  TASK: 'task'
};

export default function TaskPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [tasks, setTasks] = useState<Record<string, Task[]>>({
        todo: [
            { id: "1", title: "Visit client", details: "John Doe", status: "todo" },
            { id: "2", title: "Prepare meeting", details: "Alice Smith", status: "todo" },
        ],
        inProgress: [
            { id: "3", title: "Call client", details: "Jane Doe", status: "inProgress" },
            { id: "4", title: "Draft proposal", details: "Bob Johnson", status: "inProgress" },
        ],
        done: [
            { id: "5", title: "Send email to client", details: "Will Smith", status: "done" },
            { id: "6", title: "Complete report", details: "Chris Evans", status: "done" },
        ],
    });
    
    // Key for forcing component re-mount
    const [dndKey, setDndKey] = useState(0);

    // State to track if delete mode is active for each section
    const [deleteMode, setDeleteMode] = useState<Record<string, boolean>>({
        todo: false,
        inProgress: false,
        done: false
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(BASE_URL + "api/tasks/");
                const fetchedTasks = response.data;
                
                // Organize tasks by status
                const organizedTasks: Record<string, Task[]> = {
                    todo: [],
                    inProgress: [],
                    done: []
                };

                // Sort tasks into their respective status categories
                fetchedTasks.forEach((task: Task) => {
                    if (organizedTasks[task.status]) {
                        organizedTasks[task.status].push(task);
                    }
                });

                setTasks(organizedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []); 

    const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
    const [taskDetailsDialogOpen, setTaskDetailsDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [currentSection, setCurrentSection] = useState<string>("");
    const [newTask, setNewTask] = useState({ title: "", details: "" });
    const [selectedTasks, setSelectedTasks] = useState<Record<string, string[]>>({
        todo: [],
        inProgress: [],
        done: []
    });

    const handleOpenTaskDetails = (task: Task) => {
        // Only open task details if not in delete mode
        if (!deleteMode[task.status]) {
            setSelectedTask(task);
            setTaskDetailsDialogOpen(true);
        }
    };

    const handleCloseTaskDetails = () => {
        setTaskDetailsDialogOpen(false);
        setSelectedTask(null);
    };

    const handleOpenNewTaskDialog = (section: string) => {
        setCurrentSection(section);
        setNewTaskDialogOpen(true);
    };

    const handleCloseNewTaskDialog = () => {
        setNewTaskDialogOpen(false);
        setNewTask({ title: "", details: "" });
    };

    const handleAddTask = () => {
        if (newTask.title.trim() === "") return;
    
        axios
            .post(BASE_URL + "api/tasks/", {
                title: newTask.title,
                details: newTask.details,
                status: currentSection,
            })
            .then((res) => {
                // Create a properly structured task object
                const formattedTask: Task = {
                    id: res.data.id,
                    title: newTask.title,
                    details: newTask.details,
                    status: currentSection
                };
                
                setTasks((currentTasks) => {
                    const updatedTasks = { ...currentTasks };
                    updatedTasks[currentSection] = [
                        ...updatedTasks[currentSection],
                        formattedTask
                    ];
                    return updatedTasks;
                });
                
                setNewTask({ title: "", details: "" });
                setNewTaskDialogOpen(false);
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
    };
    
    // Handle moving a task to a new status
    const handleMoveTask = (taskId: string, oldStatus: string, newStatus: string) => {
        if (oldStatus === newStatus) return;

        // Find the task that's being moved
        const taskToMove = tasks[oldStatus].find((task) => task.id === taskId);
        if (!taskToMove) return;

        // Update the backend
        axios.patch(BASE_URL + `api/tasks/${taskId}/`, {
            status: newStatus
        })
        .then(() => {
            // Update the frontend state
            setTasks((currentTasks) => {
                const updatedTasks = { ...currentTasks };
                // Remove task from old section
                updatedTasks[oldStatus] = updatedTasks[oldStatus].filter(
                    (task) => task.id !== taskId
                );
                // Add task to new section with updated status
                const taskCopy = { ...taskToMove, status: newStatus };
                updatedTasks[newStatus] = [...updatedTasks[newStatus], taskCopy];
                return updatedTasks;
            });
            
            // Force DnD to re-initialize by changing the key
            setDndKey(prevKey => prevKey + 1);
        })
        .catch((error) => {
            console.error("Error updating task status:", error);
        });
    };

    // Toggle delete mode for a specific section
    const toggleDeleteMode = (section: string) => {
        setDeleteMode(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
        
        // Clear selected tasks when toggling delete mode off
        if (deleteMode[section]) {
            setSelectedTasks(prev => ({
                ...prev,
                [section]: []
            }));
        }
    };

    // Handle toggling a task for deletion
    const handleToggleTask = (taskId: string, section: string) => {
        setSelectedTasks((prev) => {
            const updated = { ...prev };
            if (updated[section].includes(taskId)) {
                updated[section] = updated[section].filter(id => id !== taskId);
            } else {
                updated[section] = [...updated[section], taskId];
            }
            return updated;
        });
    };

    // Handle delete selected tasks
    const handleDeleteTasks = (section: string) => {
        const taskIdsToDelete = selectedTasks[section];
    
        Promise.all(
          taskIdsToDelete.map((taskId) =>
            axios.delete(BASE_URL + `api/tasks/${taskId}/`).catch((error) => {
              console.error(`Error deleting task with id ${taskId}:`, error);
            })
          )
        ).then(() => {
          setTasks((currentTasks) => {
            const updatedTasks = { ...currentTasks };
            updatedTasks[section] = updatedTasks[section].filter(
              (task) => !selectedTasks[section].includes(task.id)
            );
            return updatedTasks;
          });
          
          // Exit delete mode and clear selections
          toggleDeleteMode(section);
          
          // Force DnD to re-initialize by changing the key
          setDndKey(prevKey => prevKey + 1);
        });
    };

    const filteredTasks = {
        todo: Array.isArray(tasks.todo)
            ? tasks.todo.filter((task) =>
                  task.title?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : [],
        inProgress: Array.isArray(tasks.inProgress)
            ? tasks.inProgress.filter((task) =>
                  task.title?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : [],
        done: Array.isArray(tasks.done)
            ? tasks.done.filter((task) =>
                  task.title?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : [],
    };
    
    return (
        <>
            {/* Search bar */}
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>Tasks</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <TextField
                        label="Search task"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ ml: 3, mb: 2, width: "300px" }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setSearchTerm("")} edge="end">
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                
                {/* Task sections with DnD */}
                <DndProvider backend={HTML5Backend} key={dndKey}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2 }}>
                        <TaskSection
                            title="To Do"
                            status="todo"
                            tasks={filteredTasks.todo}
                            onTaskClick={handleOpenTaskDetails}
                            onAddTask={() => handleOpenNewTaskDialog("todo")}
                            onDeleteModeToggle={() => toggleDeleteMode("todo")}
                            onMoveTask={handleMoveTask}
                            deleteMode={deleteMode.todo}
                            selectedTasks={selectedTasks.todo}
                            onToggleTask={handleToggleTask}
                            onDeleteSelectedTasks={() => handleDeleteTasks("todo")}
                        />
                        <TaskSection
                            title="In Progress"
                            status="inProgress"
                            tasks={filteredTasks.inProgress}
                            onTaskClick={handleOpenTaskDetails}
                            onAddTask={() => handleOpenNewTaskDialog("inProgress")}
                            onDeleteModeToggle={() => toggleDeleteMode("inProgress")}
                            onMoveTask={handleMoveTask}
                            deleteMode={deleteMode.inProgress}
                            selectedTasks={selectedTasks.inProgress}
                            onToggleTask={handleToggleTask}
                            onDeleteSelectedTasks={() => handleDeleteTasks("inProgress")}
                        />
                        <TaskSection
                            title="Done"
                            status="done"
                            tasks={filteredTasks.done}
                            onTaskClick={handleOpenTaskDetails}
                            onAddTask={() => handleOpenNewTaskDialog("done")}
                            onDeleteModeToggle={() => toggleDeleteMode("done")}
                            onMoveTask={handleMoveTask}
                            deleteMode={deleteMode.done}
                            selectedTasks={selectedTasks.done}
                            onToggleTask={handleToggleTask}
                            onDeleteSelectedTasks={() => handleDeleteTasks("done")}
                        />
                    </Box>
                </DndProvider>

                {/* Task Details Dialog */}
                <Dialog open={taskDetailsDialogOpen} onClose={handleCloseTaskDetails}>
                    <DialogTitle>Task Details</DialogTitle>
                    <DialogContent>
                        {selectedTask && (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6">{selectedTask.title}</Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    {selectedTask.details}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                    Status: {selectedTask.status === 'todo' ? 'To Do' : 
                                            selectedTask.status === 'inProgress' ? 'In Progress' : 'Done'}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseTaskDetails}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* New Task Dialog */}
                <Dialog open={newTaskDialogOpen} onClose={handleCloseNewTaskDialog}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Task Name"
                            fullWidth
                            margin="normal"
                            value={newTask.title}
                            onChange={(e) =>
                                setNewTask((prev) => ({ ...prev, title: e.target.value }))
                            }
                        />
                        <TextField
                            label="Task Details"
                            fullWidth
                            margin="normal"
                            value={newTask.details}
                            onChange={(e) =>
                                setNewTask((prev) => ({ ...prev, details: e.target.value }))
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewTaskDialog}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}

interface Task {
    id: string;
    title: string;
    details: string;
    status: string;
}

interface TaskSectionProps {
    title: string;
    status: string;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onAddTask: () => void;
    onDeleteModeToggle: () => void;
    onMoveTask: (taskId: string, oldStatus: string, newStatus: string) => void;
    deleteMode: boolean;
    selectedTasks: string[];
    onToggleTask: (taskId: string, status: string) => void;
    onDeleteSelectedTasks: () => void;
}

// Draggable Task Item Component
function DraggableTaskItem({ 
    task, 
    onTaskClick, 
    deleteMode, 
    isSelected, 
    onToggleTask 
}: { 
    task: Task; 
    onTaskClick: (task: Task) => void;
    deleteMode: boolean;
    isSelected: boolean;
    onToggleTask: (taskId: string, status: string) => void;
}) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id: task.id, status: task.status, title: task.title },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: !deleteMode, // Disable dragging when in delete mode
        end: (item, monitor) => {
            if (!monitor.didDrop()) {
                // Handle case when item was not dropped on a valid target
                console.log("Task was not dropped on a valid target");
            }
        },
    });
    
    return (
        <div 
            ref={drag} 
            style={{ 
                opacity: isDragging ? 0.4 : 1,
                cursor: deleteMode ? 'default' : (isDragging ? 'grabbing' : 'grab'),
                transform: isDragging ? 'scale(0.95)' : 'scale(1)',
                transition: 'opacity 0.2s, transform 0.2s'
            }}
            data-testid={`task-${task.id}`}
        >
            <Paper 
                elevation={2}
                sx={{ 
                    backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : "white", 
                    borderRadius: "8px", 
                    marginBottom: "8px",
                    transition: "box-shadow 0.2s ease, background-color 0.2s ease",
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                    },
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <ListItemButton 
                    onClick={() => {
                        if (deleteMode) {
                            onToggleTask(task.id, task.status);
                        } else if (!isDragging) {
                            onTaskClick(task);
                        }
                    }}
                    disabled={isDragging}
                    sx={{ flexGrow: 1 }}
                >
                    <ListItemText 
                        primary={task.title} 
                        secondary={task.details}
                        primaryTypographyProps={{
                            style: { 
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }
                        }}
                    />
                </ListItemButton>
                
                {deleteMode && (
                    <Checkbox
                        checked={isSelected}
                        onChange={() => onToggleTask(task.id, task.status)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ mr: 1 }}
                    />
                )}
            </Paper>
        </div>
    );
}

function TaskSection({ 
    title, 
    status, 
    tasks, 
    onTaskClick, 
    onAddTask, 
    onDeleteModeToggle, 
    onMoveTask,
    deleteMode,
    selectedTasks,
    onToggleTask,
    onDeleteSelectedTasks
}: TaskSectionProps) {
    // Set up drop target with proper accept type
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item: { id: string, status: string }) => {
            onMoveTask(item.id, item.status, status);
            return { dropped: true };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: () => !deleteMode, // Disable dropping when in delete mode
    });

    // Calculate background color based on drag state
    const backgroundColor = deleteMode 
        ? "#FFF8E1" // Light yellow for delete mode
        : isOver 
            ? canDrop 
                ? "#d0f0d0" // Green tint when can drop 
                : "#ffe0e0" // Red tint when cannot drop
            : "#F3EAF0"; // Default color

    return (
        <Box 
            ref={drop}
            sx={{ 
                flexGrow: 1, 
                borderRadius: 1, 
                bgcolor: backgroundColor, 
                display: "flex", 
                flexDirection: "column", 
                padding: 2, 
                ml: 2,
                transition: "background-color 0.3s ease",
                height: "100%",
                minHeight: "300px",
                boxShadow: (isOver && canDrop) || deleteMode ? '0 0 8px rgba(0, 0, 0, 0.1)' : 'none',
                border: isOver ? '2px dashed #999' : deleteMode ? '2px solid #FFA000' : '2px solid transparent'
            }}
            data-testid={`droppable-${status}`}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontSize: "30px", fontWeight: "bold" }}>{title} ({tasks.length})</Typography>
                
                {!deleteMode ? (
                    <Box>
                        <IconButton onClick={onAddTask}>
                            <AddCircleIcon fontSize="large" color="primary" />
                        </IconButton>
                        <IconButton onClick={onDeleteModeToggle}>
                            <DeleteIcon fontSize="large" color="error"/>
                        </IconButton>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                            {selectedTasks.length} selected
                        </Typography>
                        <IconButton 
                            color="success" 
                            onClick={onDeleteSelectedTasks}
                            disabled={selectedTasks.length === 0}
                        >
                            <CheckIcon />
                        </IconButton>
                        <IconButton color="default" onClick={onDeleteModeToggle}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
            
            {deleteMode && (
                <Box sx={{ mb: 2, p: 1, bgcolor: 'rgba(0, 0, 0, 0.05)', borderRadius: 1 }}>
                    <Typography variant="body2">
                        Select tasks to delete
                    </Typography>
                </Box>
            )}
            
            <List sx={{ 
                flexGrow: 1, 
                overflow: 'auto', 
                backgroundColor: isOver && canDrop ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
                borderRadius: 1,
                p: 1
            }}>
                {tasks.map((task) => (
                    <DraggableTaskItem 
                        key={task.id} 
                        task={task} 
                        onTaskClick={onTaskClick}
                        deleteMode={deleteMode}
                        isSelected={selectedTasks.includes(task.id)}
                        onToggleTask={onToggleTask}
                    />
                ))}
                {isOver && canDrop && tasks.length === 0 && (
                    <Box sx={{ 
                        height: '80px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        border: '1px dashed #aaa',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }}>
                        <Typography color="text.secondary">Drop task here</Typography>
                    </Box>
                )}
            </List>
        </Box>
    );
}