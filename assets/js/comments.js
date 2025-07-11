// Comments functionality - Front-end placeholder
// In a real implementation, this would integrate with a backend service

// Global comments storage (in-memory for demo)
let comments = [];

// Initialize comments when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('post.html')) {
        initComments();
    }
});

// Initialize comments functionality
function initComments() {
    loadComments();
    setupCommentForm();
}

// Load comments for the current post
function loadComments() {
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post');
    
    if (!postFile) return;
    
    // In a real implementation, you'd load comments from a backend
    // For now, we'll use local storage to persist comments
    const storedComments = localStorage.getItem(`comments_${postFile}`);
    if (storedComments) {
        comments = JSON.parse(storedComments);
    }
    
    displayComments();
}

// Display comments
function displayComments() {
    const container = document.getElementById('comments-list');
    if (!container) return;
    
    if (comments.length === 0) {
        container.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        return;
    }
    
    const html = comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${escapeHtml(comment.author)}</span>
                <span class="comment-date">${formatCommentDate(comment.date)}</span>
            </div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Setup comment form
function setupCommentForm() {
    const form = document.getElementById('comment-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitComment();
    });
}

// Submit a new comment
function submitComment() {
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');
    
    if (!nameInput || !textInput) return;
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    if (!name || !text) {
        alert('Please fill in both name and comment fields.');
        return;
    }
    
    // Create new comment
    const comment = {
        id: Date.now(),
        author: name,
        text: text,
        date: new Date().toISOString()
    };
    
    // Add to comments array
    comments.push(comment);
    
    // Save to local storage
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post');
    if (postFile) {
        localStorage.setItem(`comments_${postFile}`, JSON.stringify(comments));
    }
    
    // Clear form
    nameInput.value = '';
    textInput.value = '';
    
    // Refresh display
    displayComments();
    
    // Show success message
    showMessage('Comment added successfully!', 'success');
}

// Format comment date
function formatCommentDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
        }
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show temporary message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// Export for external use
window.CommentsApp = {
    comments,
    loadComments,
    displayComments,
    submitComment
};