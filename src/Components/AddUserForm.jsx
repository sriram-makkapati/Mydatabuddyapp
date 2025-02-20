import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddUserForm = ({ addUserData }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userName.endsWith('@zensar.com')) {
      setError('Please enter a valid zensar.com email');
      setSuccess(false);
      return;
    }
    setError(null);
    setSuccess(true);
    addUserData({ email: userName, password, roleId, roleName: roles.find(role => role.id === roleId).name, datasetAccess: roles.find(role => role.id === roleId).datasetAccess });
    // Navigate to Add Role page after submission
    navigate('/add-role');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 600, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom align="center">Add User to DataBuddy</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="User Name"
          name="userName"
          autoComplete="userName"
          autoFocus
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-id-label">Role ID</InputLabel>
          <Select
            labelId="role-id-label"
            id="roleId"
            value={roleId}
            label="Role ID"
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>{role.id}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      {success && !error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="success">User added successfully!</Alert>
        </Box>
      )}
    </Paper>
  );
};

export default AddUserForm;
