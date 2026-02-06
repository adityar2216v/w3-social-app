import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2196F3', // Bright blue like in the images
            light: '#64B5F6',
            dark: '#1976D2',
            contrastText: '#fff',
        },
        secondary: {
            main: '#FF9800',
            light: '#FFB74D',
            dark: '#F57C00',
        },
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
        divider: '#E0E0E0',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        subtitle1: {
            fontWeight: 500,
            fontSize: '0.95rem',
        },
        subtitle2: {
            fontWeight: 400,
            fontSize: '0.875rem',
            color: '#757575',
        },
        body1: {
            fontSize: '0.95rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            color: '#757575',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 1px 3px rgba(0,0,0,0.12)',
        '0 1px 5px rgba(0,0,0,0.12)',
        '0 2px 8px rgba(0,0,0,0.12)',
        '0 3px 12px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
        '0 4px 16px rgba(0,0,0,0.12)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;
