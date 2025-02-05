import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from "@mui/material";
import {
  Home as HomeIcon,
  Download as DownloadIcon,
  CheckBox as CheckBoxIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ArchiveIcon from "@mui/icons-material/Archive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { BASE_URL } from "../constants";

const drawerWidth = 80; // Sidebar width

export default function Navbar({
  handleSession,
}: {
  handleSession: (session: string | null) => void;
}) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [formType, setFormType] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormType("");
  }
  const handleFormSelection = () => {
    handleCloseDialog();
    if(formType === "phonecall") {
      navigate("/phonecallform");
    }
    else if (formType === "inperson"){
      navigate("/inpersonform");
    }
  };

  const handleLogout = () => {
    axios
      .post(BASE_URL + "logout/", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        localStorage.removeItem("expiry");
        localStorage.removeItem("token");
        handleSession(null);
      });
  };
  return (
    <>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#f9f5ff", // Sidebar background color
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        },
      }}
    >
      {/* Add Button at the top */}
      <Box sx={{ mb: 2 }}>
        <Tooltip title="New Form" placement="right">
          <ListItemButton
            onClick={handleOpenDialog}
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              justifyContent: "center",
              bgcolor: "primary.light",
              "&:hover": {
                bgcolor: "primary.main",
              },
            }}
          >
            <AddIcon sx={{ color: "white" }} />
          </ListItemButton>
        </Tooltip>
      </Box>

      <Divider sx={{ width: "80%", my: 2 }} />

      {/* Navigation Items */}
      <List sx={{ width: "100%" }}>
        <ListItem disablePadding>
          <Tooltip title="Dashboard" placement="right">
            <ListItemButton
              component={Link}
              to="/"
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <HomeIcon sx={{ fontSize: "50px" }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Reports" placement="right">
            <ListItemButton
              component={Link}
              to="/reports"
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <ArchiveIcon sx={{ fontSize: "50px" }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Tasks" placement="right">
            <ListItemButton
              component={Link}
              to="/tasks"
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <AssignmentIcon sx={{ fontSize: "50px" }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Categories" placement="right">
            <ListItemButton
              component={Link}
              to="/categories"
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <AssessmentIcon sx={{ fontSize: "50px" }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding style={{ top: 50 }}>
          <Tooltip title="Disconnect" placement="right">
            <ListItemButton
              sx={{ justifyContent: "center" }}
              onClick={handleLogout}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <LogoutIcon sx={{ fontSize: "50px" }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Drawer>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle sx={{textAlign: "center", fontWeight: "bold"}} >
         Form Type
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center"}}>
        <Typography variant="body2" color="textSecondary"> 
          Choose which form to fill
        </Typography>
        <RadioGroup value={formType} onChange={(e) => setFormType(e.target.value)}
          sx={{display: "flex", alignItems: "center", mt: 2}}>
            <FormControlLabel value="phonecall" control={<Radio/>} label= "Phone Call"
            sx={{bgcolor: "#f9f5ff", px:2, py:1, borderRadius:"10px", mb:1,
              width: "100%", "& .MuiTypography-root": { fontWeight: "bold" }}}/>
            <FormControlLabel value="inperson" control={<Radio/>} label= "In-Person visit"
            sx={{bgcolor: "#f9f5ff", px:2, py:1, borderRadius:"10px", mb:1,
              width: "100%", "& .MuiTypography-root": { fontWeight: "bold" }}}/>
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center"}}>
        <Button onClick={handleFormSelection} color="primary" disabled={!formType}>Submit</Button>
        <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
