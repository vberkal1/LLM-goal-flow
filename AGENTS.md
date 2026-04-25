# GoalFlow — правила проекта

## Стек
- React + TypeScript + Vite
- Zustand (state)
- Material UI (MUI)
- localStorage (основное хранилище)
- Node.js + Express (опционально для sync)

## Архитектура
- MVP: frontend-first (local-first)
- FSD (features-slices design)
- Слои:
  - app
  - pages
  - widgets
  - features
  - entities
  - shared

## Основные сущности
- Goal
- Task
- TimeEntry (встроено в Task)

## Ограничения
- Single-user
- Offline-first
- Без AI в MVP
- Минимум сущностей (Goal → Task)
- Нет подзадач
- Нет проектов

## Coding rules
- strict TypeScript
- no any
- feature isolation (FSD)
- бизнес-логика вне UI
- Zustand slices per domain
- UI только через MUI
- без сложных анимаций
- функции < 50 строк
- компоненты < 150 строк

## UX принципы
- минимализм
- быстрые действия
- keyboard-friendly
- zero-friction time tracking

## Storage
- localStorage как source of truth
- сериализация через schema
- versioning данных (v1)

## Sync (опционально)
- JSON sync через backend
- pull/push модель