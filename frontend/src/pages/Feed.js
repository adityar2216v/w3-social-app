import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Alert,
    Fab,
    Skeleton,
    Card,
    Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../services/api';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import { samplePosts } from '../data/samplePosts';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Fetch all posts
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await postAPI.getAllPosts();
            // If backend returns posts, use them; otherwise use sample posts
            if (response.data.data && response.data.data.length > 0) {
                setPosts(response.data.data);
            } else {
                // Show sample posts for demo purposes
                setPosts(samplePosts);
            }
            setError('');
        } catch (err) {
            // If backend is not available, show sample posts for demo
            console.log('Backend not available, showing sample posts for demo');
            setPosts(samplePosts);
            setError('');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Handle like/unlike
    const handleLike = async (postId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const response = await postAPI.likePost(postId);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? response.data.data : post
                )
            );
        } catch (err) {
            console.error('Error liking post:', err);
        }
    };

    // Handle add comment
    const handleComment = async (postId, text) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const response = await postAPI.addComment(postId, { text });
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? response.data.data : post
                )
            );
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    // Handle delete post
    const handleDelete = async (postId) => {
        try {
            await postAPI.deletePost(postId);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Failed to delete post');
        }
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <Card sx={{ mb: 2, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={44} height={44} />
                <Box sx={{ ml: 2, flex: 1 }}>
                    <Skeleton variant="text" width="30%" height={24} />
                    <Skeleton variant="text" width="40%" height={20} />
                </Box>
            </Box>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
            <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
            </Box>
        </Card>
    );

    if (loading) {
        return (
            <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh', pt: 2 }}>
                <Container maxWidth="md">
                    {[1, 2, 3].map((i) => (
                        <LoadingSkeleton key={i} />
                    ))}
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh', pb: 8 }}>
            <Container maxWidth="md" sx={{ pt: 2 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Demo Banner */}
                {posts.length > 0 && posts[0]._id?.startsWith('sample-') && (
                    <Alert
                        severity="info"
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            bgcolor: '#E3F2FD',
                            '& .MuiAlert-icon': {
                                color: '#2196F3',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight={600}>
                                📱 Demo Mode
                            </Typography>
                            <Chip
                                label="Sample Posts"
                                size="small"
                                sx={{
                                    bgcolor: '#2196F3',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                }}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                            You're viewing sample posts to showcase the UI. Sign up and create your own posts!
                        </Typography>
                    </Alert>
                )}

                {posts.length === 0 ? (
                    <Card sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            No posts yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Be the first to share something!
                        </Typography>
                        {isAuthenticated && (
                            <Fab
                                variant="extended"
                                color="primary"
                                onClick={() => navigate('/create-post')}
                                sx={{ px: 4 }}
                            >
                                <AddIcon sx={{ mr: 1 }} />
                                Create Post
                            </Fab>
                        )}
                    </Card>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onLike={handleLike}
                            onComment={handleComment}
                            onDelete={handleDelete}
                        />
                    ))
                )}

                {/* Floating Action Button */}
                {isAuthenticated && (
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: 'fixed',
                            bottom: 24,
                            right: 24,
                            width: 56,
                            height: 56,
                        }}
                        onClick={() => navigate('/create-post')}
                    >
                        <AddIcon />
                    </Fab>
                )}
            </Container>
        </Box>
    );
};

export default Feed;
