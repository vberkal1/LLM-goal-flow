# GoalFlow — Product Spec

## Суть
Локальный task manager с учётом времени и привязкой к целям.

---

## Сущности

### Goal
- id
- title
- createdAt
- updatedAt

### Task
- id
- goalId
- title
- status: todo | in-progress | done
- deadline: Date
- priority: low | medium | high
- tags: string[]
- timeSpent: number (в минутах)
- timerStartedAt?: Date
- createdAt
- updatedAt

---

## Логика

### Прогресс цели
- % = doneTasks / totalTasks * 100

### Учёт времени
- Таймер:
  - start → сохраняем timerStartedAt
  - stop → считаем diff → добавляем в timeSpent
- Ручной ввод:
  - пользователь вводит минуты → добавляем в timeSpent

Ограничения:
- только один активный таймер
- нет истории сессий

---

## User Flow

### Основной сценарий
1. Создание Goal
2. Добавление Task
3. Работа с задачей:
   - запуск таймера
   - смена статуса
4. Просмотр прогресса Goal

---

### Quick Capture
- глобальный input
- создаёт Task в выбранной Goal
- хоткей

---

### Command Palette
- поиск задач
- переходы
- создание

---

## UI

### Layout
- dashboard
- sidebar (Goals)
- main (Tasks)

### Виды
- List
- Kanban (по статусам)

---

### Компоненты
- GoalList
- TaskList
- TaskCard
- TimerButton
- FiltersBar
- CommandPalette
- QuickCapture

---

## Фильтры

### Presets
- Today
- This week
- Done
- Overdue

### Advanced filter
- status
- priority
- tags
- deadline

---

## Хранение

### localStorage
- key: goalflow_v1
- структура:
  - goals[]
  - tasks[]

---

## Импорт / экспорт

### Export
- JSON файл

### Import
- overwrite
- merge

---

## Синхронизация (опционально)
- ручной sync
- отправка JSON на backend
- получение JSON

---

## UI требования

- MUI
- light / dark theme
- ThemeProvider
- адаптивность
- desktop-first
- минимализм

---

## i18n
- ru / en
- переключение языка

---

## Accessibility
- базовая (aria, focus states)