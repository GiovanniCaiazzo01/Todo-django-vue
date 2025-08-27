# 🎯 Django REST Framework + Vue.js 3 - Interview Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Backend Deep Dive - Django REST Framework](#backend-deep-dive---django-rest-framework)
3. [Frontend Deep Dive - Vue.js 3](#frontend-deep-dive---vuejs-3)
4. [Key Technical Decisions](#key-technical-decisions)
5. [Problem-Solving Examples](#problem-solving-examples)
6. [Interview Q&A Preparation](#interview-qa-preparation)
7. [Code Architecture Patterns](#code-architecture-patterns)
8. [Performance Considerations](#performance-considerations)

---

## 🎯 Project Overview

This Todo application demonstrates full-stack development expertise using:
- **Backend**: Django REST Framework with custom serializers and viewsets
- **Frontend**: Vue.js 3 with TypeScript, Composition API, and reactive state management
- **Integration**: RESTful API communication with proper error handling
- **Styling**: Tailwind CSS with dark/light theme support
- **Build Tools**: Vite for fast development and optimized production builds

### Core Features Implemented
✅ **CRUD Operations**: Create, Read, Update, Delete todos  
✅ **Real-time Updates**: Reactive counters and state synchronization  
✅ **Theme Management**: Dark/light mode with localStorage persistence  
✅ **Type Safety**: Full TypeScript implementation  
✅ **Error Handling**: Comprehensive error management  
✅ **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## 🔧 Backend Deep Dive - Django REST Framework

### 1. Models (`backend/todos/models.py`)

```python
from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
```

**Key Design Decisions:**
- **`auto_now_add=True`**: Automatically sets timestamp on creation
- **`auto_now=True`**: Updates timestamp on every save
- **`ordering = ['-created_at']`**: Default ordering by newest first
- **`blank=True`** on description: Allows empty descriptions in forms
- **`__str__` method**: Provides meaningful string representation

### 2. Serializers (`backend/todos/serializers.py`)

```python
from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class TodoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['title', 'description']
```

**Why Two Serializers?**
- **`TodoSerializer`**: Complete representation for read operations
- **`TodoCreateSerializer`**: Limited fields for write operations (security)
- **`read_only_fields`**: Prevents timestamp manipulation from client

### 3. Views (`backend/todos/views.py`)

```python
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer, TodoCreateSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return TodoCreateSerializer
        return TodoSerializer

    def create(self, request, *args, **kwargs):
        # Use create serializer for validation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save the todo
        todo = serializer.save()
        
        # Return full todo object using TodoSerializer
        response_serializer = TodoSerializer(todo)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
```

**Critical Problem Solved:**
The original implementation only returned partial data after creation. The custom `create` method ensures:
1. **Validation** with `TodoCreateSerializer` (limited fields)
2. **Response** with `TodoSerializer` (complete object including ID)
3. **Consistency** between GET and POST responses

### 4. URL Configuration

```python
# backend/todos/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

**ViewSet Benefits:**
- **Automatic CRUD**: Standard HTTP methods mapped automatically
- **URL Generation**: RESTful URLs generated automatically
- **Consistency**: Uniform API structure

---

## 🎨 Frontend Deep Dive - Vue.js 3

### 1. Type Definitions (`frontend/src/types/index.ts`)

```typescript
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

**TypeScript Benefits:**
- **Compile-time Safety**: Catches errors before runtime
- **IDE Support**: Better autocomplete and refactoring
- **Documentation**: Types serve as living documentation

### 2. API Service (`frontend/src/services/api.ts`)

```typescript
import axios from 'axios';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoAPI = {
  // Get all todos
  getAll: (): Promise<{ data: Todo[] }> => api.get('/todos/'),
  
  // Create new todo
  create: (todo: CreateTodoRequest): Promise<{ data: Todo }> => 
    api.post('/todos/', todo),
  
  // Update todo
  update: (id: number, todo: UpdateTodoRequest): Promise<{ data: Todo }> =>
    api.patch(`/todos/${id}/`, todo),
  
  // Delete todo
  delete: (id: number): Promise<void> => api.delete(`/todos/${id}/`),
};
```

**Key Design Patterns:**
- **Axios Instance**: Centralized configuration
- **Type Annotations**: Return types specified for each method
- **RESTful Methods**: GET, POST, PATCH, DELETE
- **Promise-based**: Async/await compatible

### 3. Global State Management (`frontend/src/stores/todoStore.ts`)

```typescript
import { ref, computed } from 'vue';
import { todoAPI } from '../services/api';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types';

// Global state
const todos = ref<Todo[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Computed properties
const completedCount = computed(() => 
  todos.value.filter(todo => todo.completed).length
);

const totalCount = computed(() => todos.value.length);

const activeTodos = computed(() => 
  todos.value.filter(todo => !todo.completed)
);

export const useTodoStore = () => {
  // Load all todos
  const loadTodos = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await todoAPI.getAll();
      todos.value = response.data;
    } catch (err) {
      error.value = 'Failed to load todos';
      console.error('Error loading todos:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // Create new todo
  const createTodo = async (todoData: CreateTodoRequest) => {
    try {
      const response = await todoAPI.create(todoData);
      todos.value.unshift(response.data); // Add to beginning
    } catch (err) {
      error.value = 'Failed to create todo';
      throw err;
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: number) => {
    const todo = todos.value.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await todoAPI.update(id, { 
        completed: !todo.completed 
      });
      
      // Update local state
      const index = todos.value.findIndex(t => t.id === id);
      if (index !== -1) {
        todos.value[index] = response.data;
      }
    } catch (err) {
      error.value = 'Failed to toggle todo';
      throw err;
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      await todoAPI.delete(id);
      todos.value = todos.value.filter(t => t.id !== id);
    } catch (err) {
      error.value = 'Failed to delete todo';
      throw err;
    }
  };

  return {
    // State
    todos: readonly(todos),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    completedCount,
    totalCount,
    activeTodos,
    
    // Methods
    loadTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
  };
};
```

**State Management Pattern:**
- **Singleton Pattern**: Single source of truth
- **Reactive State**: Vue's ref() for reactivity
- **Computed Properties**: Derived state with caching
- **Error Handling**: Centralized error management
- **Readonly Exports**: Prevents external mutation

### 4. Component Implementation (`frontend/src/App.vue`)

```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <Navigation 
      :completed-count="completedCount" 
      :total-count="totalCount" 
    />
    
    <main class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Todo Creation Form -->
        <form @submit.prevent="handleSubmit" class="mb-8">
          <div class="flex flex-col sm:flex-row gap-4">
            <input
              v-model="newTodo.title"
              type="text"
              placeholder="Add a new todo..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              :disabled="isLoading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 disabled:opacity-50
                     transition-colors duration-200"
            >
              {{ isLoading ? 'Adding...' : 'Add Todo' }}
            </button>
          </div>
          
          <textarea
            v-model="newTodo.description"
            placeholder="Description (optional)"
            class="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg
                   dark:border-gray-600 dark:bg-gray-800 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          ></textarea>
        </form>

        <!-- Error Display -->
        <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 
                                 text-red-700 rounded-lg dark:bg-red-900 
                                 dark:border-red-600 dark:text-red-300">
          {{ error }}
        </div>

        <!-- Todo List -->
        <TodoList />
      </div>
    </main>

    <Footer :active-count="totalCount - completedCount" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoStore } from './stores/todoStore';
import type { CreateTodoRequest } from './types';
import Navigation from './components/Navigation.vue';
import TodoList from './components/TodoList.vue';
import Footer from './components/Footer.vue';

// Global store
const { 
  completedCount, 
  totalCount, 
  isLoading, 
  error, 
  loadTodos, 
  createTodo 
} = useTodoStore();

// Local form state
const newTodo = ref<CreateTodoRequest>({
  title: '',
  description: '',
});

// Form submission
const handleSubmit = async () => {
  if (!newTodo.value.title.trim()) return;
  
  try {
    await createTodo({
      title: newTodo.value.title.trim(),
      description: newTodo.value.description.trim(),
    });
    
    // Reset form
    newTodo.value = { title: '', description: '' };
  } catch (error) {
    console.error('Failed to create todo:', error);
  }
};

// Load todos on mount
onMounted(() => {
  loadTodos();
});
</script>
```

**Component Architecture Highlights:**
- **Composition API**: `<script setup>` syntax
- **Reactive Forms**: Two-way binding with v-model
- **Error Handling**: User-friendly error display
- **Loading States**: Disabled buttons during operations
- **Responsive**: Mobile-first design with Tailwind CSS

---

## 🏗️ Code Architecture Patterns

### 1. Repository Pattern (API Service)
```typescript
// Encapsulate data access logic
export const todoAPI = {
  getAll: () => api.get('/todos/'),
  create: (todo) => api.post('/todos/', todo),
  // ... other methods
};
```

### 2. Facade Pattern (Store Composable)
```typescript
// Provide simplified interface to complex subsystem
export const useTodoStore = () => {
  // Hide complex state management details
  return { todos, loadTodos, createTodo, ... };
};
```

### 3. Observer Pattern (Vue Reactivity)
```typescript
// Reactive state updates observers (components) automatically
const todos = ref<Todo[]>([]);
const completedCount = computed(() => 
  todos.value.filter(todo => todo.completed).length
);
```

### 4. MVC Pattern (Django)
```python
# Model: Data structure
class Todo(models.Model): ...

# View: Business logic
class TodoViewSet(viewsets.ModelViewSet): ...

# Controller: URL routing
router.register(r'todos', TodoViewSet)
```

---

## ⚡ Performance Considerations

### Backend Optimizations
1. **Database Indexing**: Add indexes on frequently queried fields
2. **Query Optimization**: Use `select_related()` and `prefetch_related()`
3. **Caching**: Redis for frequently accessed data
4. **Pagination**: Implement pagination for large datasets

### Frontend Optimizations
1. **Bundle Splitting**: Vite automatically splits bundles
2. **Lazy Loading**: Dynamic imports for routes
3. **Computed Caching**: Vue automatically caches computed properties
4. **Virtual Scrolling**: For large lists (not needed in this app)

### Network Optimizations
1. **Compression**: Gzip/Brotli compression
2. **CDN**: Serve static assets from CDN
3. **HTTP/2**: Enable HTTP/2 on server
4. **Request Batching**: Combine multiple API calls when possible

---


This documentation provides a comprehensive foundation for discussing your Django REST Framework and Vue.js 3 expertise in technical interviews. Focus on understanding the "why" behind each decision, not just the "how" of implementation.
