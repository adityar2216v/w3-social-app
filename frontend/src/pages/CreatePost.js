import React, { useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../services/api';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        content: '',
        image: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.content.trim()) {
            setError('Post content cannot be empty');
            return;
        }

        setLoading(true);
        try {
            await postAPI.createPost({
                content: formData.content,
                image: formData.image || null,
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
            setLoading(false);
        }
    };

    const characterCount = formData.content.length;
    const maxCharacters = 1000;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#F5F5F5',
                py: 4,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={2}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h1" gutterBottom fontWeight={700}>
                            Create New Post
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Share your thoughts with the community
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="What's on your mind?"
                            name="content"
                            multiline
                            rows={6}
                            value={formData.content}
                            onChange={handleChange}
                            required
                            placeholder="Share your thoughts..."
                            autoFocus
                            sx={{ mb: 1 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                            <Chip
                                label={`${characterCount} / ${maxCharacters}`}
                                size="small"
                                color={
                                    characterCount > maxCharacters
                                        ? 'error'
                                        : characterCount > maxCharacters * 0.8
                                            ? 'warning'
                                            : 'default'
                                }
                                sx={{ fontWeight: 600 }}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            label="Image URL (Optional)"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            InputProps={{
                                startAdornment: (
                                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                        <ImageIcon color="action" />
                                    </Box>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        {formData.image && (
                            <Paper
                                elevation={0}
                                sx={{
                                    mb: 3,
                                    p: 2,
                                    bgcolor: '#FAFAFA',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                    Image Preview:
                                </Typography>
                                <Box
                                    component="img"
                                    src={formData.image}
                                    alt="Preview"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: 300,
                                        borderRadius: 2,
                                        mt: 1,
                                    }}
                                />
                            </Paper>
                        )}

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading || characterCount > maxCharacters}
                                endIcon={<SendIcon />}
                                sx={{
                                    flex: 1,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                }}
                            >
                                {loading ? 'Posting...' : 'Publish Post'}
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/')}
                                disabled={loading}
                                endIcon={<CancelIcon />}
                                sx={{
                                    py: 1.5,
                                    px: 3,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreatePost;
