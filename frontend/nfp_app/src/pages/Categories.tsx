import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { categories as initialCategories, Category } from '../category';
import EmailView from '../components/EmailView';

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    console.log("Categories component mounted");
    return () => {
      console.log("Categories component unmounted");
    };
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;

    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      name: newCategoryName,
      code: newCategoryName.charAt(0).toUpperCase(),
      count: 0,
      subCategories: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const updateCategoryCount = (categoryName: string, count: number) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
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
              <IconButton onClick={() => setSearchTerm('')} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', mb: 3 }}>
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

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {filteredCategories.map((category) => (
          <Accordion key={category.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${category.id}-content`}
              id={`panel-${category.id}-header`}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    {category.code}
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
                onEmailCountChange={(count) => updateCategoryCount(category.name, count)} 
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
}