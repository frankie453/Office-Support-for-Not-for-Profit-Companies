import React, { useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [tasks, setTasks] = useState<Record<string, Task[]>>({
        todo: [
            { primary: "Visit client", secondary: "John Doe", status: "todo" },
            { primary: "Prepare meeting", secondary: "Alice Smith", status: "todo" },
        ],
        inProgress: [
            { primary: "Call client", secondary: "Jane Doe", status: "inProgress" },
            { primary: "Draft proposal", secondary: "Bob Johnson", status: "inProgress" },
        ],
        done: [
            { primary: "Send email to client", secondary: "Will Smith", status: "done" },
            { primary: "Complete report", secondary: "Chris Evans", status: "done" },
        ],
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [currentSection, setCurrentSection] = useState<string>("");
    const [newTask, setNewTask] = useState({ primary: "", secondary: "" });
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    const handleOpenDialog = (task: Task) => {
        setEditTask(task);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditTask(null);
    };

    const handleOpenNewTaskDialog = (section: string) => {
        setCurrentSection(section);
        setNewTaskDialogOpen(true);
    };

    const handleCloseNewTaskDialog = () => {
        setNewTaskDialogOpen(false);
        setNewTask({ primary: "", secondary: "" });
    };

    const handleAddTask = () => {
        if (newTask.primary.trim() !== "") {
            setTasks((currentTasks) => ({
                ...currentTasks,
                [currentSection]: [
                    ...currentTasks[currentSection],
                    { ...newTask, status: currentSection },
                ],
            }));
            handleCloseNewTaskDialog();
        }
    };

    const handleStatusChange = (newStatus: string) => {
        if (editTask && editTask.status !== newStatus) {
            setTasks((currentTasks) => {
                // Remove task from current section
                const updatedTasks = { ...currentTasks };
                updatedTasks[editTask.status] = updatedTasks[editTask.status].filter(
                    (task) => task.primary !== editTask.primary
                );
                // Add task to new section
                const taskCopy = { ...editTask, status: newStatus };
                updatedTasks[newStatus] = [...updatedTasks[newStatus], taskCopy];
                return updatedTasks;
            });
            setEditTask({ ...editTask, status: newStatus });
        }
    };

    const handleOpenDeleteDialog = (section: string) => {
        setCurrentSection(section);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedTasks([]);
    };

    const handleToggleTask = (taskPrimary: string) => {
        setSelectedTasks((currentSelected) => {
            if (currentSelected.includes(taskPrimary)) {
                return currentSelected.filter((primary) => primary !== taskPrimary);
            } else {
                return [...currentSelected, taskPrimary];
            }
        });
    };

    const handleDeleteTasks = () => {
        setTasks((currentTasks) => {
            const updatedTasks = { ...currentTasks };
            updatedTasks[currentSection] = updatedTasks[currentSection].filter(
                (task) => !selectedTasks.includes(task.primary)
            );
            return updatedTasks;
        });
        handleCloseDeleteDialog();
    };

    const handleSaveTask = () => {
       
        handleCloseDialog();
    };

    const filteredTasks = {
        todo: tasks.todo.filter((task) =>
            task.primary.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        inProgress: tasks.inProgress.filter((task) =>
            task.primary.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        done: tasks.done.filter((task) =>
            task.primary.toLowerCase().includes(searchTerm.toLowerCase())
        ),
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
                
                {/* Task sections */}

                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2 }}>
                    <TaskSection
                        title="To Do"
                        tasks={filteredTasks.todo}
                        onTaskClick={handleOpenDialog}
                        onAddTask={() => handleOpenNewTaskDialog("todo")}
                        onDeleteTask={() => handleOpenDeleteDialog("todo")}
                    />
                    <TaskSection
                        title="In Progress"
                        tasks={filteredTasks.inProgress}
                        onTaskClick={handleOpenDialog}
                        onAddTask={() => handleOpenNewTaskDialog("inProgress")}
                        onDeleteTask={() => handleOpenDeleteDialog("inProgress")}
                    />
                    <TaskSection
                        title="Done"
                        tasks={filteredTasks.done}
                        onTaskClick={handleOpenDialog}
                        onAddTask={() => handleOpenNewTaskDialog("done")}
                        onDeleteTask={() => handleOpenDeleteDialog("done")}
                    />
                </Box>

                {/* Edit Task Dialog */}

                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Change task status</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleStatusChange("todo")}
                            >
                                To Do
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleStatusChange("inProgress")}
                            >
                                In Progress
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleStatusChange("done")}
                            >
                                Done
                            </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button variant="contained" onClick={handleSaveTask}>Save</Button>
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
                            value={newTask.primary}
                            onChange={(e) =>
                                setNewTask((prev) => ({ ...prev, primary: e.target.value }))
                            }
                        />
                        <TextField
                            label="Task Details"
                            fullWidth
                            margin="normal"
                            value={newTask.secondary}
                            onChange={(e) =>
                                setNewTask((prev) => ({ ...prev, secondary: e.target.value }))
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewTaskDialog}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Task Dialog */}

                <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>Delete Tasks</DialogTitle>
                    <DialogContent>
                        <List>
                            {tasks[currentSection]?.map((task, index) => (
                                <ListItem key={index} disablePadding>
                                    <Checkbox
                                        checked={selectedTasks.includes(task.primary)}
                                        onChange={() => handleToggleTask(task.primary)}
                                    />
                                    <ListItemText primary={task.primary} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                        <Button variant="contained" color="error" onClick={handleDeleteTasks}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </>
    );
}

interface Task {
    primary: string;
    secondary: string;
    status: string;
}

interface TaskSectionProps {
    title: string;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onAddTask: () => void;
    onDeleteTask: () => void;
}



function TaskSection({ title, tasks, onTaskClick, onAddTask, onDeleteTask }: TaskSectionProps) {
    return (
        <Box sx={{ flexGrow: 1, borderRadius: 1, bgcolor: "#F3EAF0", display: "flex", flexDirection: "column", padding: 2, ml: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontSize: "30px", fontWeight: "bold" }}>{title} ({tasks.length})</Typography>
                <Box>
                    <IconButton onClick={onAddTask}>
                        <AddCircleIcon fontSize="large" color="primary" />
                    </IconButton>
                    <IconButton onClick={onDeleteTask}>
                        <DeleteIcon fontSize="large" color="error"/>
                    </IconButton>
                </Box>
            </Box>
            <List>
                {tasks.map((task, index) => (
                    <ListItem key={index} disablePadding sx={{ backgroundColor: "white", borderRadius: "8px", marginBottom: "8px" }}>
                        <ListItemButton onClick={() => onTaskClick(task)}>
                            <ListItemText primary={task.primary} secondary={task.secondary} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
