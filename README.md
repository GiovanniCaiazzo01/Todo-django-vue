# Django Vue TodoList Application

A modern, full-stack TodoList application built with Django REST Framework and Vue.js 3 with TypeScript. Features a clean, responsive design with dark/light mode support.

## 🚀 Features

- ✅ **Django REST API backend** with full CRUD operations
- ✅ **Vue.js 3 + TypeScript frontend** with Composition API
- ✅ **Dark/Light mode toggle** with system preference detection
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Modern development setup** with Vite, ESLint, and TypeScript
- ✅ **Shared layout components** (Navigation, Footer)
- ✅ **Error handling** and loading states
- ✅ **Type-safe API integration** with Axios
- ✅ **Vue Composables** for state management
- ✅ **Professional UI/UX** with consistent styling

## 📁 Project Structure

```
django-vue-todo/
├── backend/                    # Django REST API
│   ├── manage.py              # Django management script
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment variables template
│   ├── todo_project/          # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py        # Django configuration
│   │   ├── urls.py           # URL routing
│   │   ├── wsgi.py           # WSGI application
│   │   └── asgi.py           # ASGI application
│   └── todos/                 # Todo Django app
│       ├── __init__.py
│       ├── models.py         # Todo data model
│       ├── serializers.py    # DRF serializers
│       ├── views.py          # API views
│       ├── urls.py           # App URL routing
│       ├── admin.py          # Django admin
│       └── apps.py           # App configuration
├── frontend/                   # Vue.js TypeScript app
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── index.html             # HTML template
│   ├── src/
│   │   ├── main.ts           # Application entry point
│   │   ├── App.vue           # Root Vue component
│   │   ├── style.css         # Global styles with Tailwind
│   │   ├── components/       # Vue components
│   │   │   ├── Navigation.vue
│   │   │   ├── Footer.vue
│   │   │   └── TodoList.vue
│   │   ├── composables/      # Vue composables
│   │   │   ├── useTheme.ts
│   │   │   └── useTodos.ts
│   │   ├── services/         # API services
│   │   │   └── api.ts
│   │   └── types/           # TypeScript interfaces
│   │       └── index.ts
│   └── public/              # Static assets
└── README.md               # Project documentation
```

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+ (for Django backend)
- Node.js 16+ (for Vue.js frontend)
- Git

### Backend Setup (Django)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env
   # Edit .env file with your settings
   ```

5. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start Django development server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (Vue.js)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start Vite development server:**
   ```bash
   npm run dev
   ```

## 🌐 Development URLs

- **Frontend Application:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **Django Admin:** http://localhost:8000/admin
- **API Endpoints:** http://localhost:8000/api/todos/

## 🔧 Available Scripts

### Backend (Django)
```bash
python manage.py runserver     # Start development server
python manage.py migrate       # Run database migrations
python manage.py createsuperuser # Create admin user
python manage.py collectstatic  # Collect static files
```

### Frontend (Vue.js)
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run type-check # Run TypeScript type checking
npm run lint       # Run ESLint
```

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos/` | List all todos |
| POST | `/api/todos/` | Create new todo |
| GET | `/api/todos/{id}/` | Get specific todo |
| PUT | `/api/todos/{id}/` | Update todo (full) |
| PATCH | `/api/todos/{id}/` | Update todo (partial) |
| DELETE | `/api/todos/{id}/` | Delete todo |

## 🎨 Features Overview

### Frontend Features
- **Modern Vue.js 3** with Composition API and `<script setup>`
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for utility-first styling
- **Dark/Light theme** with system preference detection
- **Responsive design** that works on all devices
- **Lucide Vue** icons for consistent iconography
- **Vite** for fast development and optimized builds

### Backend Features
- **Django REST Framework** for robust API development
- **CORS handling** for cross-origin requests
- **Serializers** for data validation and transformation
- **ViewSets** for consistent CRUD operations
- **Admin interface** for easy data management
- **Environment configuration** with python-decouple

## 🚀 Production Deployment

For production deployment, consider:

1. **Backend:**
   - Use PostgreSQL or MySQL instead of SQLite
   - Configure proper environment variables
   - Set `DEBUG=False`
   - Use a WSGI server like Gunicorn
   - Serve static files with nginx

2. **Frontend:**
   - Build the production bundle: `npm run build`
   - Serve the `dist` folder with a web server
   - Configure proper API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
