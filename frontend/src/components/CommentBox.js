import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { formatDistanceToNow } from '../utils/dateUtils';

const CommentBox = ({ postId, comments, onAddComment }) => {
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setLoading(true);
        await onAddComment(postId, commentText);
        setCommentText('');
        setLoading(false);
    };

    return (
        <Box
            sx={{
                bgcolor: '#FAFAFA',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            {/* Comment Form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: 2,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={loading}
                    sx={{
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        },
                    }}
                />
                <Button
                    type="submit"
                    disabled={!commentText.trim() || loading}
                    variant="contained"
                    size="small"
                    endIcon={<SendIcon />}
                    sx={{
                        borderRadius: 2,
                        px: 2,
                        fontWeight: 600,
                    }}
                >
                    Post
                </Button>
            </Box>

            {/* Comments List */}
            {comments.length > 0 && (
                <List sx={{ px: 2, pb: 2, pt: 0 }}>
                    {comments.map((comment, index) => (
                        <React.Fragment key={comment._id || index}>
                            <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={comment.user?.profilePicture}
                                        alt={comment.user?.username}
                                        sx={{ width: 36, height: 36 }}
                                    >
                                        {comment.user?.username?.[0]?.toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {comment.user?.username}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {formatDistanceToNow(comment.createdAt)}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                                            {comment.text}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {index < comments.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default CommentBox;
