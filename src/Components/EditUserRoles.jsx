import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Paper, Alert, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const EditUserRoles = ({ submittedData }) => {
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const datasetAccessValues = ["Full", "Partial", "Read-Only"];

  const handleFetchRoles = () => {
    if (!email.endsWith('@zensar.com')) {
      setError('Please enter a valid zensar.com email');
      return;
    }
    // Fetch roles based on the provided email
    const fetchedRoles = submittedData.filter(data => data.email === email).map(data => ({
      id: data.roleId,
      name: data.roleName,
      datasetAccess: data.datasetAccess
    }));

    if (fetchedRoles.length > 0) {
      setRoles(fetchedRoles);
      setIsFetching(true);
      setError(null);
    } else {
      setError('No roles found for this email');
    }
  };

  const handleEditRole = (index) => {
    setEditIndex(index);
  };

  const handleDeleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleUpdateRole = (index, field, value) => {
    const updatedRoles = roles.map((role, i) => 
      i === index ? { ...role, [field]: value } : role
    );
    setRoles(updatedRoles);
  };

  const handleSaveRole = () => {
    setEditIndex(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 800, mx: 'auto' }}>
      <Box component="form" noValidate>
        <Typography variant="h5" gutterBottom align="center">Edit User Roles</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="User Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isFetching}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleFetchRoles}
          disabled={isFetching}
        >
          Fetch Roles
        </Button>
        {roles.length > 0 && (
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Role Name"
              value={roles[0].name}
              disabled={true}
            />
            <FormControl fullWidth margin="normal" disabled={true}>
              <InputLabel>Dataset Access</InputLabel>
              <Select value={roles[0].datasetAccess}>
                {datasetAccessValues.map((access) => (
                  <MenuItem key={access} value={access}>{access}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" disabled={true}>
              <InputLabel>Role ID</InputLabel>
              <Select value={roles[0].id}>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>{role.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Typography variant="h6" sx={{ mt: 4 }}>User Roles</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Dataset Access</TableCell>
            <TableCell>Role ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow key={index}>
              <TableCell>
                {editIndex === index ? (
                  <TextField
                    value={role.name}
                    onChange={(e) => handleUpdateRole(index, 'name', e.target.value)}
                    fullWidth
                  />
                ) : (
                  role.name
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <FormControl fullWidth>
                    <Select
                      value={role.datasetAccess}
                      onChange={(e) => handleUpdateRole(index, 'datasetAccess', e.target.value)}
                    >
                      {datasetAccessValues.map((access) => (
                        <MenuItem key={access} value={access}>{access}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  role.datasetAccess
                )}
              </TableCell>
              <TableCell>{role.id}</TableCell>
              <TableCell>
                {editIndex === index ? (
                  <IconButton onClick={handleSaveRole}><SaveIcon /></IconButton>
                ) : (
                  <IconButton onClick={() => handleEditRole(index)}><EditIcon /></IconButton>
                )}
                <IconButton onClick={() => handleDeleteRole(index)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default EditUserRoles;
