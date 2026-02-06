const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
const createPost = async (req, res) => {
    try {
        const { content, image } = req.body;

        // Validation
        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Post content is required',
            });
        }

        // Create post
        const post = await Post.create({
            user: req.user.id,
            content,
            image: image || null,
        });

        // Populate user details
        await post.populate('user', 'username profilePicture');

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post,
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating post',
        });
    }
};

/**
 * @route   GET /api/posts
 * @desc    Get all posts (public feed)
 * @access  Public
 */
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'username profilePicture bio')
            .populate('comments.user', 'username profilePicture')
            .sort({ createdAt: -1 }) // Most recent first
            .limit(50); // Limit to 50 posts for performance

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching posts',
        });
    }
};

/**
 * @route   GET /api/posts/:id
 * @desc    Get single post by ID
 * @access  Public
 */
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('user', 'username profilePicture bio')
            .populate('comments.user', 'username profilePicture');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        console.error('Get post error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching post',
        });
    }
};

/**
 * @route   PUT /api/posts/:id/like
 * @desc    Like/Unlike a post
 * @access  Private
 */
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        // Check if user already liked the post
        const likeIndex = post.likes.indexOf(req.user.id);

        if (likeIndex > -1) {
            // Unlike: Remove user from likes array
            post.likes.splice(likeIndex, 1);
        } else {
            // Like: Add user to likes array
            post.likes.push(req.user.id);
        }

        await post.save();

        // Populate user details
        await post.populate('user', 'username profilePicture bio');
        await post.populate('comments.user', 'username profilePicture');

        res.status(200).json({
            success: true,
            message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
            data: post,
        });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error liking post',
        });
    }
};

/**
 * @route   POST /api/posts/:id/comment
 * @desc    Add a comment to a post
 * @access  Private
 */
const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        // Validation
        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required',
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        // Add comment
        post.comments.push({
            user: req.user.id,
            text,
        });

        await post.save();

        // Populate user details
        await post.populate('user', 'username profilePicture bio');
        await post.populate('comments.user', 'username profilePicture');

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            data: post,
        });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error adding comment',
        });
    }
};

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post
 * @access  Private (only post owner)
 */
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        // Check if user is the post owner
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this post',
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting post',
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    likePost,
    addComment,
    deletePost,
};
