import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Collapse,
    Box,
    Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import CommentBox from './CommentBox';
import { formatDistanceToNow } from '../utils/dateUtils';

const PostCard = ({ post, onLike, onComment, onDelete }) => {
    const { user } = useAuth();
    const [showComments, setShowComments] = useState(false);

    const isLiked = post.likes?.includes(user?.id);
    const isOwner = post.user?._id === user?.id;

    const handleLike = () => {
        onLike(post._id);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete(post._id);
        }
    };

    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                },
                transition: 'box-shadow 0.2s',
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        src={post.user?.profilePicture}
                        alt={post.user?.username}
                        sx={{ width: 44, height: 44 }}
                    >
                        {post.user?.username?.[0]?.toUpperCase()}
                    </Avatar>
                }
                action={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {!isOwner && (
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    py: 0.5,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                Follow
                            </Button>
                        )}
                        {isOwner && (
                            <IconButton onClick={handleDelete} size="small" color="error">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                }
                title={
                    <Typography variant="subtitle1" fontWeight={600}>
                        {post.user?.username}
                    </Typography>
                }
                subheader={
                    <Typography variant="body2" color="text.secondary">
                        @{post.user?.username?.toLowerCase()} • {formatDistanceToNow(post.createdAt)}
                    </Typography>
                }
                sx={{ pb: 1 }}
            />

            <CardContent sx={{ pt: 0, pb: 1 }}>
                <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6 }}>
                    {post.content}
                </Typography>
            </CardContent>

            {post.image && (
                <CardMedia
                    component="img"
                    image={post.image}
                    alt="Post image"
                    sx={{
                        maxHeight: 400,
                        objectFit: 'cover',
                        borderRadius: 0,
                    }}
                />
            )}

            <CardActions
                sx={{
                    px: 2,
                    py: 1.5,
                    justifyContent: 'space-between',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            cursor: 'pointer',
                        }}
                        onClick={handleLike}
                    >
                        <IconButton size="small" color={isLiked ? 'error' : 'default'}>
                            {isLiked ? (
                                <FavoriteIcon fontSize="small" />
                            ) : (
                                <FavoriteBorderIcon fontSize="small" />
                            )}
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {post.likes?.length || 0}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowComments(!showComments)}
                    >
                        <IconButton size="small">
                            <ChatBubbleOutlineIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {post.comments?.length || 0}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <IconButton size="small">
                            <ShareIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            0
                        </Typography>
                    </Box>
                </Box>
            </CardActions>

            <Collapse in={showComments} timeout="auto" unmountOnExit>
                <CommentBox
                    postId={post._id}
                    comments={post.comments || []}
                    onAddComment={onComment}
                />
            </Collapse>
        </Card>
    );
};

export default PostCard;
