import React from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Paper, Alert } from '@mui/material';

const EditUserRole = ({ roles, roleId, setRoleId, roleName, setRoleName, datasetAccess, setDatasetAccess, handleSubmit, error }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 800, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom align="center">Edit User Role</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="roleName"
          label="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="datasetAccess"
          label="Dataset Access"
          value={datasetAccess}
          onChange={(e) => setDatasetAccess(e.target.value)}
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
          Update
        </Button>
      </Box>
      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Paper>
  );
};

export default EditUserRole;
