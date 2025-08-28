# 🎯 Django REST Framework + Vue.js 3 - Interview Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Backend Deep Dive - Django REST Framework](#backend-deep-dive---django-rest-framework)
3. [Frontend Deep Dive - Vue.js-3)
4. [Getting Started](#getting-started)
5. [Code Architecture Patterns](#code-architecture-patterns)
6. [Performance Considerations](#performance-considerations)

---

## Project Overview

This Todo application demonstrates full-stack development expertise using:

* **Backend**: Django REST Framework with custom serializers and viewsets  
* **Frontend**: Vue.js 3 with TypeScript, Composition API, and reactive state management  
* **Integration**: RESTful API communication with proper error handling  
* **Styling**: Tailwind CSS with dark/light theme support  
* **Build Tools**: Vite for fast development and optimized production builds  

### Core Features Implemented

- ✅ **CRUD Operations**: Create, Read, Update, Delete todos  
- ✅ **Real-time Updates**: Reactive counters and state synchronization  
- ✅ **Theme Management**: Dark/light mode with localStorage persistence  
- ✅ **Type Safety**: Full TypeScript implementation  
- ✅ **Error Handling**: Comprehensive error management  
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS  

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
````

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

* **`TodoSerializer`**: Complete representation for read operations
* **`TodoCreateSerializer`**: Limited fields for write operations (security)
* **`read_only_fields`**: Prevents timestamp manipulation from client

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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        todo = serializer.save()
        response_serializer = TodoSerializer(todo)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
```

**Critical Problem Solved:**
La `create` personalizzata assicura:

1. Validazione con `TodoCreateSerializer`
2. Risposta completa con `TodoSerializer` (incluso ID)
3. Consistenza tra `GET` e `POST`

### 4. URL Configuration (`backend/todos/urls.py`)

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

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

### 2. API Service (`frontend/src/services/api.ts`)

```typescript
import axios from 'axios';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const todoAPI = {
  getAll: (): Promise<{ data: Todo[] }> => api.get('/todos/'),
  create: (todo: CreateTodoRequest): Promise<{ data: Todo }> =>
    api.post('/todos/', todo),
  update: (id: number, todo: UpdateTodoRequest): Promise<{ data: Todo }> =>
    api.patch(`/todos/${id}/`, todo),
  delete: (id: number): Promise<void> => api.delete(`/todos/${id}/`),
};
```

---

## 🚀 Getting Started

### Backend (Django + DRF)

Requisiti: **Python 3.10+**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\Activate.ps1 # Windows PowerShell

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

API disponibile su: `http://localhost:8000/api/`

### Frontend (Vue 3 + Vite)

Requisiti: **Node.js 18+**

```bash
cd frontend
npm install
npm run dev
```

UI disponibile su: `http://localhost:5173`

---

## 🏗️ Code Architecture Patterns

* **Repository Pattern** – centralizza accesso API
* **Facade Pattern** – Pinia store come interfaccia semplificata
* **Observer Pattern** – Vue reactivity per aggiornare la UI
* **MVC Pattern** – DRF segue lo schema Model, ViewSet, Router

---

## ⚡ Performance Considerations

**Backend**

* Database indexing su campi frequenti
* Uso di `select_related()` / `prefetch_related()`
* Cache con Redis
* Paginazione standard DRF

**Frontend**

* Bundle splitting automatico (Vite)
* Lazy loading routes
* Computed caching
* (Opz.) Virtual scrolling per grandi liste

**Network**

* Compressione (gzip/brotli)
* CDN per asset statici
* HTTP/2
* Request batching dove possibile

---
