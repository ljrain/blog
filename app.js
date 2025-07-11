import { marked } from './assets/js/marked.esm.js';

// Configure marked options
marked.setOptions({
    breaks: true,
    gfm: true
});

// Blog post configuration
const blogPosts = [
    {
        id: 'welcome',
        title: 'Welcome to My Blog',
        filename: 'welcome.md'
    },
    {
        id: 'getting-started',
        title: 'Getting Started with Markdown',
        filename: 'getting-started.md'
    },
    {
        id: 'javascript-tips',
        title: 'JavaScript Tips and Tricks',
        filename: 'javascript-tips.md'
    }
];

// DOM elements
const postList = document.getElementById('postList');
const postContent = document.getElementById('postContent');

// Current state
let currentPost = null;

// Initialize the blog
function initBlog() {
    renderPostList();
    // Load first post by default
    if (blogPosts.length > 0) {
        loadPost(blogPosts[0]);
    }
}

// Render the post list in the sidebar
function renderPostList() {
    postList.innerHTML = '';
    
    blogPosts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'post-link';
        link.textContent = post.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPost(post);
        });
        
        listItem.appendChild(link);
        postList.appendChild(listItem);
    });
}

// Load and display a post
async function loadPost(post) {
    try {
        // Update active state
        updateActivePost(post);
        
        // Show loading state
        postContent.innerHTML = '<div class="loading">Loading post...</div>';
        
        // Fetch the markdown file
        const response = await fetch(`posts/${post.filename}`);
        
        if (!response.ok) {
            throw new Error(`Failed to load post: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // Parse markdown to HTML
        const html = marked.parse(markdown);
        
        // Display the content
        postContent.innerHTML = `<div class="post-content">${html}</div>`;
        
        // Update current post
        currentPost = post;
        
    } catch (error) {
        console.error('Error loading post:', error);
        postContent.innerHTML = `
            <div class="error">
                <h3>Error Loading Post</h3>
                <p>Sorry, we couldn't load the post "${post.title}". Please try again later.</p>
                <p><small>Error: ${error.message}</small></p>
            </div>
        `;
    }
}

// Update the active post in the sidebar
function updateActivePost(post) {
    // Remove active class from all links
    const allLinks = postList.querySelectorAll('.post-link');
    allLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current link
    const currentLink = Array.from(allLinks).find(link => 
        link.textContent === post.title
    );
    
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

// Handle browser navigation
function handleNavigation() {
    const hash = window.location.hash.slice(1);
    
    if (hash) {
        const post = blogPosts.find(p => p.id === hash);
        if (post) {
            loadPost(post);
        }
    }
}

// Update URL when post is loaded
function updateURL(post) {
    window.history.pushState(null, null, `#${post.id}`);
}

// Enhanced loadPost function with URL update
async function loadPostWithURL(post) {
    await loadPost(post);
    updateURL(post);
}

// Add event listeners
window.addEventListener('hashchange', handleNavigation);
window.addEventListener('load', () => {
    initBlog();
    handleNavigation();
});

// Update the post links to use the enhanced function
function renderPostListWithURL() {
    postList.innerHTML = '';
    
    blogPosts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        
        const link = document.createElement('a');
        link.href = `#${post.id}`;
        link.className = 'post-link';
        link.textContent = post.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPostWithURL(post);
        });
        
        listItem.appendChild(link);
        postList.appendChild(listItem);
    });
}

// Update the init function
function initBlogWithURL() {
    renderPostListWithURL();
    
    // Check if there's a hash in the URL
    const hash = window.location.hash.slice(1);
    const initialPost = hash ? blogPosts.find(p => p.id === hash) : blogPosts[0];
    
    if (initialPost) {
        loadPost(initialPost);
    }
}

// Replace the window load event listener
window.addEventListener('load', () => {
    initBlogWithURL();
});

// Export functions for potential external use
window.blogAPI = {
    loadPost,
    blogPosts,
    getCurrentPost: () => currentPost
};