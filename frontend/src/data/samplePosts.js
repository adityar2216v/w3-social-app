// Sample posts for demonstration purposes
export const samplePosts = [
    {
        _id: 'sample-1',
        user: {
            _id: 'user-1',
            username: 'Sarah Johnson',
            profilePicture: 'https://i.pravatar.cc/150?img=1',
        },
        content: '🎉 Just launched my new portfolio website! It took me 3 weeks of hard work, but I\'m so proud of the result. Check it out and let me know what you think! #WebDevelopment #Portfolio',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        likes: ['user-2', 'user-3', 'user-4'],
        comments: [
            {
                _id: 'comment-1',
                user: {
                    _id: 'user-2',
                    username: 'Mike Chen',
                    profilePicture: 'https://i.pravatar.cc/150?img=12',
                },
                text: 'Looks amazing! Great work! 🔥',
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            },
            {
                _id: 'comment-2',
                user: {
                    _id: 'user-3',
                    username: 'Emma Davis',
                    profilePicture: 'https://i.pravatar.cc/150?img=5',
                },
                text: 'Love the design! Very clean and modern.',
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            },
        ],
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'sample-2',
        user: {
            _id: 'user-2',
            username: 'Mike Chen',
            profilePicture: 'https://i.pravatar.cc/150?img=12',
        },
        content: 'Morning coffee and coding session ☕💻 Working on a new React project today. What are you all working on?',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
        likes: ['user-1', 'user-4'],
        comments: [
            {
                _id: 'comment-3',
                user: {
                    _id: 'user-4',
                    username: 'Alex Kumar',
                    profilePicture: 'https://i.pravatar.cc/150?img=13',
                },
                text: 'Same here! Building a social media app 🚀',
                createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            },
        ],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'sample-3',
        user: {
            _id: 'user-3',
            username: 'Emma Davis',
            profilePicture: 'https://i.pravatar.cc/150?img=5',
        },
        content: '📚 Just finished reading "Clean Code" by Robert C. Martin. Highly recommend it to all developers! It completely changed how I think about writing code. #BookRecommendation #CleanCode',
        likes: ['user-1', 'user-2', 'user-4', 'user-5'],
        comments: [],
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'sample-4',
        user: {
            _id: 'user-4',
            username: 'Alex Kumar',
            profilePicture: 'https://i.pravatar.cc/150?img=13',
        },
        content: '🎨 Design tip of the day: Always maintain consistent spacing in your UI. It makes a huge difference in the overall look and feel of your application!',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        likes: ['user-1', 'user-3'],
        comments: [
            {
                _id: 'comment-4',
                user: {
                    _id: 'user-1',
                    username: 'Sarah Johnson',
                    profilePicture: 'https://i.pravatar.cc/150?img=1',
                },
                text: 'So true! Consistency is key 🎯',
                createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            },
        ],
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'sample-5',
        user: {
            _id: 'user-5',
            username: 'Lisa Anderson',
            profilePicture: 'https://i.pravatar.cc/150?img=9',
        },
        content: 'Finally deployed my first full-stack application to production! 🚀 It\'s been an incredible learning journey. Thank you to everyone who helped me along the way! #FullStack #Deployment',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        likes: ['user-1', 'user-2', 'user-3', 'user-4'],
        comments: [
            {
                _id: 'comment-5',
                user: {
                    _id: 'user-2',
                    username: 'Mike Chen',
                    profilePicture: 'https://i.pravatar.cc/150?img=12',
                },
                text: 'Congratulations! 🎉',
                createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
            },
            {
                _id: 'comment-6',
                user: {
                    _id: 'user-3',
                    username: 'Emma Davis',
                    profilePicture: 'https://i.pravatar.cc/150?img=5',
                },
                text: 'That\'s awesome! Well done! 👏',
                createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            },
        ],
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
];
