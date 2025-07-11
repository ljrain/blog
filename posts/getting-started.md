# Getting Started with Markdown

Markdown is a lightweight markup language that's perfect for writing blog posts. This post will show you the basics of Markdown syntax and how it renders in this blog.

## Basic Formatting

### Text Formatting

You can make text **bold** or *italic*. You can also combine them for ***bold and italic*** text.

For inline `code`, use backticks around the text.

### Lists

Here's an unordered list:
- First item
- Second item
- Third item
  - Nested item
  - Another nested item

And here's an ordered list:
1. First step
2. Second step
3. Third step

### Links and Images

You can create [links to other websites](https://www.example.com) or reference links within your text.

## Code Blocks

You can include code blocks with syntax highlighting:

```javascript
function greetUser(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome to the blog, ${name}`;
}

greetUser('Developer');
```

```html
<div class="example">
    <h2>HTML Example</h2>
    <p>This is how HTML looks in a code block.</p>
</div>
```

## Quotes

You can include blockquotes to highlight important information:

> "The best way to learn web development is by building projects and experimenting with code."
> 
> — Every experienced developer

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | H1-H6 |
| Lists | ✅ | Ordered and unordered |
| Links | ✅ | Internal and external |
| Images | ✅ | With alt text |
| Code | ✅ | Inline and blocks |

## Horizontal Rules

You can create horizontal rules to separate sections:

---

## Advanced Features

### Nested Lists

1. First level
   1. Second level
   2. Another second level
      - Third level bullet
      - Another third level
2. Back to first level

### Mixed Content

You can mix different types of content:

Here's a paragraph with **bold text** and a [link](https://example.com), followed by a code block:

```css
.markdown-content {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #333;
}
```

And then a quote:

> Markdown makes it easy to write formatted text without getting in the way of your thoughts.

## Conclusion

Markdown is perfect for blog posts because it:

- **Keeps you focused** on writing content
- **Renders beautifully** in browsers
- **Is easy to learn** and remember
- **Works everywhere** - from GitHub to blogs

Try editing this post to see how these formatting options work!