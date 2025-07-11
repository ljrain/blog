import { marked } from './marked.esm.js';

// Global state
let posts = [];
let allCategories = new Set();
let allTags = new Set();

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('post.html')) {
        initPostPage();
    } else {
        initHomePage();
    }
});

// Initialize home page
function initHomePage() {
    loadPosts();
    setupEventListeners();
}

// Initialize individual post page
function initPostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post');
    
    if (postFile) {
        loadPost(postFile);
    } else {
        document.getElementById('post-content').innerHTML = '<p>No post specified.</p>';
    }
}

// Load all posts from the posts directory
async function loadPosts() {
    try {
        // In a real implementation, you'd have a posts index file or API
        // For now, we'll try to load known posts
        const postFiles = ['example-post.md']; // This would be dynamic in a real app
        
        posts = [];
        
        for (const file of postFiles) {
            try {
                const response = await fetch(`posts/${file}`);
                if (response.ok) {
                    const content = await response.text();
                    const post = parsePost(content, file);
                    posts.push(post);
                }
            } catch (error) {
                console.error(`Error loading post ${file}:`, error);
            }
        }
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Extract categories and tags
        posts.forEach(post => {
            post.categories.forEach(cat => allCategories.add(cat));
            post.tags.forEach(tag => allTags.add(tag));
        });
        
        displayPosts(posts);
        populateFilters();
        
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('posts-container').innerHTML = '<p>Error loading posts.</p>';
    }
}

// Load individual post
async function loadPost(filename) {
    try {
        const response = await fetch(`posts/${filename}`);
        if (!response.ok) {
            throw new Error(`Post not found: ${filename}`);
        }
        
        const content = await response.text();
        const post = parsePost(content, filename);
        
        displayPost(post);
        
    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-content').innerHTML = '<p>Error loading post.</p>';
    }
}

// Parse frontmatter and content from markdown
function parsePost(content, filename) {
    const lines = content.split('\n');
    let frontmatterEnd = -1;
    let frontmatter = {};
    
    // Check if content starts with frontmatter
    if (lines[0].trim() === '---') {
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                frontmatterEnd = i;
                break;
            }
        }
        
        if (frontmatterEnd > 0) {
            const frontmatterContent = lines.slice(1, frontmatterEnd).join('\n');
            frontmatter = parseFrontmatter(frontmatterContent);
        }
    }
    
    // Extract content after frontmatter
    const contentLines = frontmatterEnd > 0 ? lines.slice(frontmatterEnd + 1) : lines;
    const markdownContent = contentLines.join('\n').trim();
    
    return {
        filename,
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        categories: frontmatter.categories || [],
        tags: frontmatter.tags || [],
        content: markdownContent,
        htmlContent: marked(markdownContent)
    };
}

// Simple frontmatter parser
function parseFrontmatter(content) {
    const frontmatter = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;
        
        const key = trimmed.substring(0, colonIndex).trim();
        let value = trimmed.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        
        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(item => 
                item.trim().replace(/['"]/g, '')
            ).filter(item => item);
        }
        
        frontmatter[key] = value;
    }
    
    return frontmatter;
}

// Display posts on home page
function displayPosts(postsToShow) {
    const container = document.getElementById('posts-container');
    
    if (postsToShow.length === 0) {
        container.innerHTML = '<p>No posts found.</p>';
        return;
    }
    
    const html = postsToShow.map(post => `
        <article class="post-card">
            <h2><a href="post.html?post=${post.filename}">${post.title}</a></h2>
            <div class="post-meta">
                <span>${formatDate(post.date)}</span>
                <div class="post-categories">
                    ${post.categories.map(cat => `<span class="category">${cat}</span>`).join('')}
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <div class="post-excerpt">
                ${getExcerpt(post.content)}
            </div>
        </article>
    `).join('');
    
    container.innerHTML = html;
}

// Display individual post
function displayPost(post) {
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = formatDate(post.date);
    document.getElementById('post-categories').innerHTML = 
        post.categories.map(cat => `<span class="category">${cat}</span>`).join('');
    document.getElementById('post-tags').innerHTML = 
        post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
    document.getElementById('post-content').innerHTML = post.htmlContent;
    
    // Update page title
    document.title = `${post.title} - Tech Blog`;
}

// Get excerpt from content
function getExcerpt(content, maxLength = 200) {
    const text = content.replace(/[#*`]/g, '').trim();
    if (text.length <= maxLength) return text;
    
    const words = text.split(' ');
    let excerpt = '';
    
    for (const word of words) {
        if (excerpt.length + word.length + 1 > maxLength) break;
        excerpt += (excerpt ? ' ' : '') + word;
    }
    
    return excerpt + '...';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Populate filter dropdowns
function populateFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const tagFilter = document.getElementById('tag-filter');
    
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        Array.from(allCategories).sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
    
    if (tagFilter) {
        tagFilter.innerHTML = '<option value="">All Tags</option>';
        Array.from(allTags).sort().forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });
    }
}

// Setup event listeners for search and filters
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const tagFilter = document.getElementById('tag-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterPosts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterPosts);
    }
    
    if (tagFilter) {
        tagFilter.addEventListener('change', filterPosts);
    }
}

// Filter posts based on search and filters
function filterPosts() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('category-filter')?.value || '';
    const selectedTag = document.getElementById('tag-filter')?.value || '';
    
    let filteredPosts = posts.filter(post => {
        // Search filter
        const matchesSearch = !searchTerm || 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = !selectedCategory || 
            post.categories.includes(selectedCategory);
        
        // Tag filter
        const matchesTag = !selectedTag || 
            post.tags.includes(selectedTag);
        
        return matchesSearch && matchesCategory && matchesTag;
    });
    
    displayPosts(filteredPosts);
}

// Export functions for use in other modules
window.BlogApp = {
    posts,
    loadPosts,
    loadPost,
    parsePost,
    displayPosts,
    displayPost
};