# Tech Blog

A custom blog site built with HTML, CSS, JavaScript, and marked.js for markdown parsing.

## Features

- **Static Blog System**: No backend required, runs entirely in the browser
- **Markdown Support**: Write posts in markdown with frontmatter metadata
- **Search & Filtering**: Search posts by title/content and filter by categories/tags
- **Responsive Design**: Mobile-friendly, tech-focused design
- **Comments System**: Front-end comment functionality using local storage
- **Clean URLs**: Individual post pages with query parameters

## File Structure

```
├── index.html              # Homepage with post list and search
├── post.html               # Individual post view with comments
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   └── js/
│       ├── main.js         # Main application logic
│       ├── comments.js     # Comments functionality
│       └── marked.esm.js   # Markdown parser library
└── posts/
    └── example-post.md     # Example blog post
```

## How to Add New Posts

1. Create a new markdown file in the `/posts/` directory
2. Use the following frontmatter structure at the top of your markdown file:

```markdown
---
title: "Your Post Title"
date: YYYY-MM-DD
categories: ["Category1", "Category2"]
tags: ["Tag1", "Tag2", "Tag3"]
---

Your markdown content goes here...
```

### Frontmatter Fields

- **title**: The post title (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **categories**: Array of category names (optional)
- **tags**: Array of tag names (optional)

### Example Post

```markdown
---
title: "Understanding JavaScript Closures"
date: 2024-01-20
categories: ["JavaScript", "Programming"]
tags: ["closures", "functions", "scope"]
---

# Understanding JavaScript Closures

Closures are one of the most important concepts in JavaScript...

## What is a Closure?

A closure is...
```

## Adding Categories and Tags

Categories and tags are automatically extracted from your post frontmatter and added to the filter dropdowns on the homepage.

### Categories
Use categories for broad topics:
- "Web Development"
- "JavaScript"
- "CSS"
- "HTML"
- "Programming"

### Tags
Use tags for specific topics:
- "react"
- "nodejs"
- "frontend"
- "backend"
- "tutorial"

## Content Guidelines

### Markdown Support

The blog supports standard markdown features:

- Headers (`# ## ###`)
- Bold and italic text (`**bold** *italic*`)
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Blockquotes
- Links and images

### Code Blocks

Use fenced code blocks for syntax highlighting:

```javascript
const example = () => {
    console.log('Hello, World!');
};
```

## Running the Blog

1. **Local Development**: 
   - Use a local web server (e.g., `python -m http.server` or `npx serve`)
   - Open `index.html` in your browser

2. **Production**: 
   - Deploy to any static hosting service (GitHub Pages, Netlify, Vercel)
   - No server-side processing required

## Customization

### Styling
Edit `/assets/css/styles.css` to customize the appearance:
- Colors and fonts
- Layout and spacing
- Responsive breakpoints

### Functionality
Edit `/assets/js/main.js` to modify:
- Post loading logic
- Search and filtering
- Post parsing

### Comments
Edit `/assets/js/comments.js` to:
- Change comment storage (currently uses localStorage)
- Add comment validation
- Integrate with external comment services

## Limitations

- **Static Only**: No backend integration (comments use localStorage)
- **Manual Post Index**: You need to manually add new post filenames to the `postFiles` array in `main.js`
- **No Post Management**: No admin interface for managing posts

## Future Enhancements

- Automatic post discovery
- RSS feed generation
- Social sharing buttons
- Archive page by date
- Related posts suggestions
- Comment moderation system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.