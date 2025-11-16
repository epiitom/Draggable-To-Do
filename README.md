# Draggable To-Do App

A fully-featured, accessible to-do application with manual drag & drop implementation, built with React.

## 🚀 Live Demo

[View Live Demo](https://dtodoo.netlify.app/)

## ✨ Features

- ✅ Create, edit, and delete tasks with title and description
- 🎯 Three columns: To Do, In Progress, Done
- 🖱️ Manual drag & drop implementation (no libraries)
- 💾 Persistent state using localStorage
- 📱 Fully responsive design (mobile-first)
- ♿ Accessible with keyboard support and ARIA attributes
- 🎨 Pixel-perfect design matching specifications
- ⚡ Smooth animations and transitions
- 🔔 Toast notifications for user feedback

## 🛠️ Tech Stack

- **React** 18.2.0 (only react and react-dom)
- **Vanilla CSS** (no UI frameworks)
- **localStorage** for data persistence
- **Manual Drag & Drop API** (no drag-drop libraries)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/draggable-todo-app.git
cd draggable-todo-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

## 🏗️ Architecture & Design Decisions

### Component Structure
```
src/
├── components/
│   ├── TaskCard.jsx      # Individual task card with drag handlers
│   ├── Column.jsx         # Column container with drop zones
│   ├── TaskModal.jsx      # Create/Edit modal with form validation
│   └── Toast.jsx          # Toast notification system
├── icons/
│   └── Icons.jsx          # SVG icon components
├── utils/
│   ├── storage.js         # localStorage abstraction layer
│   └── dragDrop.js        # Drag & drop logic utilities
├── App.jsx                # Main application component
└── App.css                # Global styles
```

### Key Design Decisions

1. **Manual Drag & Drop Implementation**
   - Used native HTML5 Drag & Drop API (`dragstart`, `dragover`, `drop`, etc.)
   - Custom logic to calculate drop index based on mouse Y position
   - Visual feedback with placeholder elements and column highlighting

2. **State Management**
   - React's `useState` for all state management (no Redux/Context needed for this scope)
   - Centralized state in `App.jsx` with prop drilling to child components
   - Auto-save to localStorage on every state change

3. **Accessibility**
   - All interactive elements are keyboard focusable
   - ARIA attributes (`aria-grabbed`, `aria-label`, `aria-live`)
   - Live region for screen reader announcements
   - Focus management in modals
   - Minimum 44×44px tap targets on mobile

4. **Responsive Design**
   - Mobile-first CSS approach
   - Breakpoint at 768px (columns stack on mobile)
   - CSS Grid for flexible column layout
   - No horizontal scroll on any screen size

5. **Data Persistence**
   - Stored under key: `draggable-todo-board-v1`
   - Each task includes: id, title, description, column, position, createdAt, updatedAt
   - Error handling for storage quota exceeded and corrupted data

## 🎨 Design Specifications

### Colors
- Background: `#F8FAFB`
- Primary (Indigo): `#4F46E5`
- Success (Green): `#10B981`
- Danger (Red): `#DC2626`
- Text Primary: `#0F172A`
- Text Muted: `#6B7280`

### Typography
- Font Family: Inter
- Title: 20px, weight 600
- Card Title: 14px, weight 500
- Description: 12px, weight 400

### Spacing
- Max container width: 1024px
- Column gap: 16px (desktop), 12px (mobile)
- Card padding: 12px
- Border radius: 12px (columns), 10px (cards)

## 🧪 Testing Checklist

### Core Functionality ✅
- [x] Three columns render correctly
- [x] Create task with required title
- [x] Edit task updates correctly
- [x] Delete task with confirmation
- [x] Drag to reorder within column
- [x] Drag to move between columns
- [x] Visual feedback during drag
- [x] Data persists after refresh
- [x] Responsive on mobile devices
- [x] No external UI/drag-drop libraries

### Accessibility ✅
- [x] Keyboard navigation works
- [x] Screen reader announcements
- [x] Focus management in modals
- [x] ARIA attributes present
- [x] Proper contrast ratios

## 🐛 Known Issues

1. **Browser Compatibility**: Drag & drop may behave slightly differently on Safari/iOS due to native browser limitations
2. **Touch Devices**: Native HTML5 drag & drop has limited touch support; consider adding touch event handlers for production

## 🚀 Future Improvements

- [ ] Add undo/redo functionality
- [ ] Implement subtasks and task dependencies
- [ ] Add due dates and priority levels
- [ ] Dark mode support
- [ ] Export/import tasks (JSON/CSV)
- [ ] Enhanced touch support for mobile devices
- [ ] Unit and integration tests
- [ ] Backend integration for multi-user support
- [ ] Search and filter functionality
- [ ] Task categories/tags

## 📝 License

MIT License - feel free to use this project for learning or personal use.


---

Built with ❤️ as part of Meteoros Sensing Private Limited front-end internship assignment.
