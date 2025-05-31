# Vue Todo PWA

A modern, offline-capable Todo application built with Vue 3 and PWA capabilities.

## Features

- ✅ Create, edit, and delete todos
- 🔄 Filter todos (All, Active, Completed)
- 💾 Offline storage using IndexedDB
- 📱 Progressive Web App (PWA) with install prompt
- 🎨 Modern, responsive design
- 🔧 Debug mode for PWA testing

## Tech Stack

- **Vue 3** - Modern Vue.js with Composition API
- **Vite** - Fast build tool and dev server
- **IndexedDB** - Browser database for offline storage
- **PWA** - Service Worker for offline functionality
- **CSS3** - Modern styling with gradients and animations

## Project Structure

```
src/
├── components/           # Vue components
│   ├── AddTodo.vue      # Todo input form
│   ├── AppHeader.vue    # App header with install button
│   ├── DebugButton.vue  # Debug toggle button
│   ├── DebugInfo.vue    # PWA debug information
│   ├── EmptyState.vue   # Empty todos display
│   ├── TodoFilters.vue  # Filter buttons
│   ├── TodoItem.vue     # Individual todo item
│   ├── TodoList.vue     # Todo items container
│   └── TodoStats.vue    # Completion statistics
├── composables/         # Vue composables
│   ├── TodoDB.js        # IndexedDB wrapper
│   └── usePWA.js        # PWA functionality
├── App.vue             # Main app component
├── main.js             # App entry point
└── style.css           # Global styles
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vue-todo-pwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## PWA Features

### Service Worker
- Caches app resources for offline use
- Automatically updates when new version is available

### Install Prompt
- Shows install banner on supported browsers
- Manual install instructions for browsers without automatic prompt
- Debug mode to test PWA functionality

### Offline Storage
- Uses IndexedDB for persistent, offline-capable storage
- Automatically syncs when connection is restored

## Development

### Components

Each component is self-contained with its own template, script, and styles (if needed). The app uses Vue 3's Composition API for better code organization and reusability.

### Composables

- **TodoDB.js**: Handles all IndexedDB operations (CRUD)
- **usePWA.js**: Manages PWA installation prompts and debug info

### Styling

The app uses a modern design with:
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- Responsive design for mobile and desktop
- Smooth animations and transitions

## Browser Support

- Chrome/Edge: Full PWA support
- Firefox: PWA support with manual installation
- Safari: Limited PWA support, can add to home screen
- Must be served over HTTPS (except localhost)

## Debugging

Click the "Debug" button in the top-left to see PWA installation status and browser compatibility information.

## License

MIT License