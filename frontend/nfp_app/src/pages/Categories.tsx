import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { categories } from '../category';

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Categories
      </Typography>

      {/* Search Input */}
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

      {/* Categories List */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {filteredCategories.map((category) => (
          <ListItem
            key={category.id}
            disablePadding
            secondaryAction={
              <IconButton edge="end">
                <ChevronRightIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  {category.code}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={category.name}
                secondary={category.count ? `${category.count} items` : null}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}