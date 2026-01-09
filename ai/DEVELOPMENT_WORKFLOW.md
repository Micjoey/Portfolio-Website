# Portfolio Website Development Workflow

## Iterative Development Process

This portfolio website uses an iterative development approach. Complete one improvement at a time, test it, then move to the next.

## Current Structure

```
Portfolio-Website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   │   ├── animations.js  # GSAP animation controller
│   │   └── main.js        # Core functionality
│   └── images/           # Images and SVG icons
│       └── svg-icons/     # Animated SVG icons
└── ai/                    # Development workflow files
    ├── knowledge/         # Patterns, solutions, snippets
    └── improvements.md    # Improvement tracking
```

## Workflow Steps

### 1. Identify Improvement
- Check `ai/improvements.md` for planned items
- Or identify a new enhancement needed

### 2. Check Existing Patterns
- Review `ai/knowledge/patterns.json` for reusable patterns
- Check `ai/knowledge/solutions.json` for similar solved problems
- Look at `ai/knowledge/snippets.json` for code snippets

### 3. Implement Iteratively
- Make one change at a time
- Test in browser (http://127.0.0.1:5500/index.html)
- Verify accessibility and performance
- Ensure animations respect prefers-reduced-motion

### 4. Document
- Add solution to `ai/knowledge/solutions.json` if new pattern
- Update `ai/knowledge/patterns.json` if reusable pattern
- Mark completed in `ai/improvements.md`

## Animation Guidelines

### GSAP Usage
- Use GSAP for complex animations
- Use CSS animations for simple, continuous effects
- Always check prefers-reduced-motion

### Performance
- Use `will-change` strategically
- Remove `will-change` after animations complete
- Use transform and opacity for GPU acceleration

### Accessibility
- All animations respect `prefers-reduced-motion`
- Provide alternative static states
- Ensure keyboard navigation works

## File Organization

### JavaScript
- `animations.js`: All GSAP animations
- `main.js`: Core site functionality

### CSS
- Inline styles in `index.html` for component-specific styles
- External CSS in `assets/css/main.css` for global styles

### SVG Icons
- All icons in `assets/images/svg-icons/`
- Each icon has built-in CSS animations
- Use `.svg-icon` class for styling

## Testing Checklist

Before marking an improvement complete:
- [ ] Works in Chrome/Firefox/Safari
- [ ] Mobile responsive
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Performance acceptable (60fps animations)
- [ ] Reduced motion preference respected
- [ ] No console errors

## Next Steps

1. Review `ai/improvements.md` for next item
2. Check knowledge base for patterns
3. Implement one improvement
4. Test thoroughly
5. Document and move to next
