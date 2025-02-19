import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  InputAdornment,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import EmailView from "../components/EmailView";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Category } from "../category";

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const refreshCategories = () => {
    axios
      .get(BASE_URL + "api/categories/")
      .then((res) => {
        const data = res.data;
        const oldCategories = structuredClone(categories);
        setCategories(
          data.map((category: { id: number; name: string }) => ({
            ...category,
            count:
              oldCategories.find((cat) => cat.id === category.id)?.count ?? 0,
            subCategories: [],
          }))
        );
      })
      .catch((er) => {
        setError(er.message);
      });
  };

  useEffect(() => {
    // Load categories
    refreshCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;

    axios
      .post(BASE_URL + "api/categories/", { name: newCategoryName })
      .then((res) => {
        refreshCategories();
        setNewCategoryName("");
      })
      .catch((er) => setError(er.message));
  };

  const handleDeleteCategory = (id: number) => {
    axios
      .delete(BASE_URL + "api/categories/" + id + "/")
      .then((res) => refreshCategories())
      .catch((er) => setError(er.message));
  };

  const updateCategoryCount = (categoryName: string, count: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.name === categoryName ? { ...category, count } : category
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Categories
      </Typography>

      <TextField
        fullWidth
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
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

      <Box sx={{ display: "flex", mb: 3 }}>
        <TextField
          fullWidth
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
          startIcon={<AddIcon />}
          sx={{ ml: 2 }}
        >
          Add
        </Button>
      </Box>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {error && <Alert severity="error">{error}</Alert>}
        {filteredCategories.map((category) => (
          <Accordion key={category.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${category.id}-content`}
              id={`panel-${category.id}-header`}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.light" }}>
                    {category.name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={category.name}
                  secondary={`${category.count} emails`}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <EmailView
                category={category.name}
                onEmailCountChange={(count) =>
                  updateCategoryCount(category.name, count)
                }
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
}
