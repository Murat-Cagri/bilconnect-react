import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Container, Paper, Rating, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

// StyledButton component with custom styling
const StyledButton = styled(Button)({
    margin: '8px 0',
    padding: '10px 20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
    fontFamily: '"PT Sans", Calibri, Tahoma, sans-serif', // Custom modern font
    '&:hover': {
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#0D47A1', // Darker blue on hover
    },
});

const UserProfilePage = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        // Any additional logic you want to run on component mount
    }, []);

    const userName = localStorage.getItem('email');

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // You can handle the file as needed, for example, upload it to a server or display it
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleOpenChangePasswordDialog = () => {
        setChangePasswordDialogOpen(true);
    };

    const handleCloseChangePasswordDialog = () => {
        setChangePasswordDialogOpen(false);
    };

    const handleChangePassword = () => {
        // Implement your logic to handle password change
        console.log('New Password:', newPassword);
        // Reset the form
        setNewPassword('');
        // Close the dialog
        handleCloseChangePasswordDialog();
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <label htmlFor="profile-picture-input">
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            margin: 'auto',
                            cursor: 'pointer',
                        }}
                        alt="Profile Picture"
                        src={profilePicture || undefined}
                    >
                        <PersonIcon fontSize="large" />
                    </Avatar>
                </label>
                <input
                    type="file"
                    id="profile-picture-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                />
                <Typography variant="h5" sx={{ marginTop: 2, color: '#0D47A1', fontFamily: 'Montserrat, sans-serif' }}>
                    {userName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <Rating
                        name="user-rating"
                        value={4.3}
                        precision={0.1} // Assuming half-star ratings are allowed
                        readOnly
                    />
                    <Typography variant="body2" sx={{ marginLeft: 1, color: '#757575' }}>
                        ({4.3})
                    </Typography>
                </Box>
                <StyledButton variant="contained" color="primary" onClick={handleOpenChangePasswordDialog}>
                    Change Password
                </StyledButton>

                {/* Change Password Dialog */}
                <Dialog open={isChangePasswordDialogOpen} onClose={handleCloseChangePasswordDialog}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChangePasswordDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleChangePassword} color="primary">
                            Change Password
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default UserProfilePage;
