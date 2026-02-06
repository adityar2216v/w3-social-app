import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/login');
    };

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{
                bgcolor: 'white',
                color: 'text.primary',
            }}
        >
            <Container maxWidth="md">
                <Toolbar sx={{ px: { xs: 0 } }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Social
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {isAuthenticated ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <IconButton
                                color="primary"
                                onClick={() => navigate('/create-post')}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}
                            >
                                <AddIcon />
                            </IconButton>

                            <Avatar
                                alt={user?.username}
                                src={user?.profilePicture}
                                onClick={handleMenu}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    cursor: 'pointer',
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                }}
                            />

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        minWidth: 150,
                                    },
                                }}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/login')}
                                sx={{ fontWeight: 600 }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/signup')}
                                sx={{ fontWeight: 600 }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
