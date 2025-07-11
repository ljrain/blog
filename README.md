# Simple Blog

A minimal blog website built from scratch using vanilla JavaScript and the marked.esm.js library for Markdown rendering.

## Features

- **Vanilla JavaScript**: No frameworks or complex build processes
- **Markdown Support**: Write posts in Markdown format
- **Responsive Design**: Works on desktop and mobile devices
- **Static Files**: No server-side processing required
- **URL Navigation**: Direct links to posts with browser history support

## File Structure

```
/
├── index.html          # Main HTML file with blog layout
├── app.js              # JavaScript application logic
├── assets/
│   └── js/
│       └── marked.esm.js # Markdown parsing library
├── posts/              # Directory containing blog posts
│   ├── welcome.md
│   ├── getting-started.md
│   └── javascript-tips.md
└── README.md           # This file
```

## Setup Instructions

### Option 1: Using Python (Recommended)

1. **Clone or download** this repository
2. **Open terminal** in the project directory
3. **Start a local server** using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
4. **Open your browser** and navigate to `http://localhost:8000`

### Option 2: Using Node.js

1. **Install Node.js** if you haven't already
2. **Install http-server** globally:
   ```bash
   npm install -g http-server
   ```
3. **Navigate to project directory** and run:
   ```bash
   http-server
   ```
4. **Open your browser** and navigate to the provided URL (usually `http://localhost:8080`)

### Option 3: Using PHP

1. **Make sure PHP is installed** on your system
2. **Navigate to project directory** and run:
   ```bash
   php -S localhost:8000
   ```
3. **Open your browser** and navigate to `http://localhost:8000`

### Option 4: Using VS Code Live Server

1. **Install the "Live Server" extension** in VS Code
2. **Open the project folder** in VS Code
3. **Right-click on index.html** and select "Open with Live Server"

## Adding New Posts

To add a new blog post:

1. **Create a new Markdown file** in the `posts/` directory
2. **Write your content** using Markdown syntax
3. **Update the `blogPosts` array** in `app.js` with your new post information:
   ```javascript
   {
       id: 'your-post-id',
       title: 'Your Post Title',
       filename: 'your-post-file.md'
   }
   ```

### Example Post Configuration

```javascript
const blogPosts = [
    {
        id: 'welcome',
        title: 'Welcome to My Blog',
        filename: 'welcome.md'
    },
    {
        id: 'new-post',
        title: 'My New Post',
        filename: 'new-post.md'
    }
];
```

## Markdown Support

The blog supports all standard Markdown features:

- **Headers** (H1-H6)
- **Text formatting** (bold, italic, code)
- **Lists** (ordered and unordered)
- **Links** and images
- **Code blocks** with syntax highlighting
- **Blockquotes**
- **Tables**
- **Horizontal rules**

## Customization

### Styling

Edit the `<style>` section in `index.html` to customize the appearance:

- **Colors**: Change the color scheme by modifying CSS variables
- **Fonts**: Update the `font-family` properties
- **Layout**: Modify the grid layout and spacing
- **Responsive**: Adjust breakpoints and mobile styles

### Functionality

Edit `app.js` to customize behavior:

- **Post loading**: Modify the `loadPost()` function
- **Navigation**: Update URL handling and routing
- **Markdown rendering**: Configure marked.js options
- **Error handling**: Customize error messages and behavior

## Browser Compatibility

This blog works in all modern browsers that support:

- ES6 modules (import/export)
- Fetch API
- CSS Grid
- Modern JavaScript features

Supported browsers:
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

## Troubleshooting

### Common Issues

1. **Posts not loading**: Make sure you're serving the files through a web server (not opening index.html directly)
2. **CORS errors**: Use one of the local server options above
3. **404 errors**: Check that post filenames match exactly in the `blogPosts` array
4. **Styling issues**: Clear browser cache and ensure CSS is loading properly

### Development Tips

- **Use browser developer tools** to debug JavaScript issues
- **Check the console** for error messages
- **Test in multiple browsers** to ensure compatibility
- **Validate your Markdown** before adding new posts

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests! This is a simple educational project, perfect for learning vanilla JavaScript and Markdown rendering.

---

*Built with ❤️ using vanilla JavaScript and marked.esm.js*