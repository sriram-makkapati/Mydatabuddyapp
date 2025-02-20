import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Paper, Alert } from '@mui/material';

const AddRoleForm = ({ addUserData }) => {
  const [roleName, setRoleName] = useState('');
  const [datasetAccess, setDatasetAccess] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const datasetAccessValues = ["Full", "Partial", "Read-Only"];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!roleName || !datasetAccess) {
      setError('All fields are required');
      setSuccess(false);
      return;
    }
    setError(null);
    setSuccess(true);
    setRoleName('');
    setDatasetAccess('');
    addUserData({ roleName, datasetAccess });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 600, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom align="center">Add Role to DataBuddy</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="roleName"
          label="Role Name"
          name="roleName"
          autoComplete="roleName"
          autoFocus
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Dataset Access</InputLabel>
          <Select
            value={datasetAccess}
            onChange={(e) => setDatasetAccess(e.target.value)}
            label="Dataset Access"
          >
            {datasetAccessValues.map((access) => (
              <MenuItem key={access} value={access}>{access}</MenuItem>
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
          <Alert severity="success">Role added successfully!</Alert>
        </Box>
      )}
    </Paper>
  );
};

export default AddRoleForm;
