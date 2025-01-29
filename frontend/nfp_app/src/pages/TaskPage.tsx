import React, { useState } from "react";
import {
  Box,
  Container,
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
  AppBar,
  Toolbar,
  Fab,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ArchiveIcon from "@mui/icons-material/Archive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState({
    todo: [
      { primary: "Visit client", secondary: "John Doe" },
      { primary: "Prepare meeting", secondary: "Alice Smith" },
    ],
    inProgress: [
      { primary: "Call client", secondary: "Jane Doe" },
      { primary: "Draft proposal", secondary: "Bob Johnson" },
    ],
    done: [
      { primary: "Send email to client", secondary: "Will Smith" },
      { primary: "Complete report", secondary: "Chris Evans" },
    ],
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ primary: "", secondary: "" });
  const [currentSection, setCurrentSection] =
    useState<keyof typeof tasks>("todo");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleOpenDialog = (section: keyof typeof tasks) => {
    setCurrentSection(section);
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (section: keyof typeof tasks) => {
    setCurrentSection(section);
    setDeleteDialogOpen(true);
    setSelectedTasks([]);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewTask({ primary: "", secondary: "" });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedTasks([]);
  };

  const handleAddTask = () => {
    if (newTask.primary.trim()) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [currentSection]: [...prevTasks[currentSection], newTask],
      }));
      handleCloseDialog();
    }
  };

  const handleDeleteTasks = () => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentSection]: prevTasks[currentSection].filter(
        (task) => !selectedTasks.includes(task.primary)
      ),
    }));
    handleCloseDeleteDialog();
  };

  const handleToggleTask = (taskPrimary: string) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(taskPrimary)
        ? prevSelected.filter((t) => t !== taskPrimary)
        : [...prevSelected, taskPrimary]
    );
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
      {/* Sidebar */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          width: 80,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            paddingTop: 2,
          }}
        >
          <IconButton>
            <MenuIcon sx={{ fontSize: "50px" }} />
          </IconButton>
          <IconButton>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </IconButton>
          <IconButton>
            <HomeIcon sx={{ fontSize: "50px" }} />
          </IconButton>
          <IconButton>
            <ArchiveIcon sx={{ fontSize: "50px" }} />
          </IconButton>
          <IconButton>
            <AssignmentIcon sx={{ fontSize: "50px" }} />
          </IconButton>
          <IconButton>
            <AssessmentIcon sx={{ fontSize: "50px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Header */}
      {/* <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton>
              <NotificationsIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <SettingsIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> */}

      {/* Title and Search */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Tasks
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            label="Search task"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              ml: 3,
              mb: 2,
              width: "300px",
            }}
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

        {/* Task Sections */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <TaskSection
            title="To Do"
            tasks={filteredTasks.todo}
            onAddTask={() => handleOpenDialog("todo")}
            onDeleteTask={() => handleOpenDeleteDialog("todo")}
          />
          <TaskSection
            title="In Progress"
            tasks={filteredTasks.inProgress}
            onAddTask={() => handleOpenDialog("inProgress")}
            onDeleteTask={() => handleOpenDeleteDialog("inProgress")}
          />
          <TaskSection
            title="Done"
            tasks={filteredTasks.done}
            onAddTask={() => handleOpenDialog("done")}
            onDeleteTask={() => handleOpenDeleteDialog("done")}
          />
        </Box>

        {/* Add Task Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
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
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Task Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Tasks</DialogTitle>
          <DialogContent>
            <List>
              {tasks[currentSection].map((task, index) => (
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
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteTasks}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* <Typography
        fontWeight="bold"
        variant="h3"
        component="h2"
        sx={{ padding: 2, mt: 5, mb: 2 }}
      >
        Task Page
      </Typography> */}
    </>
  );
}

interface Task {
  primary: string;
  secondary: string;
}

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: () => void;
}

function TaskSection({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
}: TaskSectionProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        bgcolor: "#F3EAF0",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        ml: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "30px", fontWeight: "bold" }}>
          {title} ({tasks.length})
        </Typography>
        <Box>
          <IconButton aria-label="add" color="primary" onClick={onAddTask}>
            <AddCircleIcon sx={{ fontSize: 36 }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="default"
            onClick={onDeleteTask}
          >
            <DeleteIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </Box>
      </Box>
      <div>
        <hr style={{ border: "1px gray" }} />
      </div>
      <List>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            <ListItemButton>
              <ListItemText primary={task.primary} secondary={task.secondary} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
