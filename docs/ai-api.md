# Monkeywork AI API

Monkeywork exposes a JSON-RPC 2.0 interface for AI agents to read and write task data. This document describes how AI agents can interact with Monkeywork programmatically.

---

## Quick Start

```js
// In browser console (when Monkeywork is open):
const monkeywork = window.__MonkeyworkAI;

// Read all tasks
const tasks = await monkeywork.queryTasks({});
console.log(tasks);

// Create a task
const newTask = await monkeywork.createTask({
  title: "Review pull request",
  priority: "urgent-important",
  tags: ["Разработка"],
});
```

---

## 1. `window.__MonkeyworkAI` Global API

When Monkeywork is running in the browser, all AI methods are available through `window.__MonkeyworkAI`. This is the easiest way for in-browser AI agents (extensions, devtools, bookmarklets) to interact.

### Methods

#### `queryTasks(params)`

Query tasks with optional filters.

```js
await window.__MonkeyworkAI.queryTasks({})
await window.__MonkeyworkAI.queryTasks({ status: "todo" })
await window.__MonkeyworkAI.queryTasks({ priority: "urgent-important" })
await window.__MonkeyworkAI.queryTasks({ status: "done", priority: "not-urgent-important" })
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `string` | No | Filter by status: `"todo"`, `"in-progress"`, `"done"` |
| `priority` | `string` | No | Filter by priority: `"urgent-important"`, `"not-urgent-important"`, `"urgent-not-important"`, `"not-urgent-not-important"` |

**Returns:** `Task[]`

---

#### `createTask(params)`

Create a new task.

```js
await window.__MonkeyworkAI.createTask({
  title: "Prepare quarterly report",
  description: "Gather Q2 data and create slides",
  priority: "urgent-important",
  tags: ["Продукт"],
  startDate: "2026-07-29T09:00",
  dueDate: "2026-07-30T18:00",
  repeat: "none",
})
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | **Yes** | Task title (1-200 chars) |
| `description` | `string` | No | Task description |
| `priority` | `string` | **Yes** | Must be one of the four priority values |
| `tags` | `string[]` | No | Tag names |
| `startDate` | `string` | No | ISO datetime string |
| `dueDate` | `string` | No | ISO datetime string |
| `repeat` | `string` | No | `"none"`, `"daily"`, `"weekly"`, `"monthly"` |

**Priority values:**

| Value | Meaning |
|-------|---------|
| `"urgent-important"` | Do First — Urgent & Important |
| `"not-urgent-important"` | Schedule — Important & Not Urgent |
| `"urgent-not-important"` | Delegate — Urgent & Not Important |
| `"not-urgent-not-important"` | Eliminate — Not Urgent & Not Important |

**Returns:** `Task`

---

#### `updateTask(params)`

Update an existing task. Only include fields you want to change.

```js
await window.__MonkeyworkAI.updateTask({
  id: "task-uuid-here",
  title: "Updated title",
  status: "done",
  priority: "not-urgent-important",
})
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | Task ID (UUID) |
| Any `Task` field | varies | No | Fields to update |

**Returns:** `Task`

---

#### `deleteTask(params)`

Delete a task by ID.

```js
await window.__MonkeyworkAI.deleteTask({ id: "task-uuid-here" })
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | Task ID (UUID) |

---

#### `getTags()`

Get all tags.

```js
await window.__MonkeyworkAI.getTags()
```

**Returns:** `{ id: string, name: string }[]`

---

## 2. `window.postMessage` JSON-RPC Channel

Monkeywork also listens for JSON-RPC 2.0 messages via `window.postMessage`. This is useful for cross-origin AI agents (extensions, iframes, or other browser automation).

### Request Format

```json
{
  "jsonrpc": "2.0",
  "id": "request-1",
  "method": "queryTasks",
  "params": { "status": "todo" }
}
```

### Response Format

```json
{
  "jsonrpc": "2.0",
  "id": "request-1",
  "result": [ /* Task objects */ ]
}
```

Error response:

```json
{
  "jsonrpc": "2.0",
  "id": "request-1",
  "error": {
    "code": -32001,
    "message": "Method 'createTask' requires readwrite permission, current: readonly"
  }
}
```

### Example (from browser extension or iframe)

```js
// Send request
window.postMessage({
  jsonrpc: "2.0",
  id: crypto.randomUUID(),
  method: "queryTasks",
  params: {},
}, "*");

// Listen for response
window.addEventListener("message", (event) => {
  if (event.data?.jsonrpc === "2.0") {
    console.log("Monkeywork AI response:", event.data);
  }
});
```

---

## 3. Available Methods

| Method | Permission | Description |
|--------|-----------|-------------|
| `queryTasks` | `readonly` | Query tasks with optional status/priority filters |
| `getTags` | `readonly` | List all tags |
| `createTask` | `readwrite` | Create a new task |
| `updateTask` | `readwrite` | Update an existing task |
| `deleteTask` | `readwrite` | Delete a task |

---

## 4. Permission Model

Monkeywork has two permission levels:

| Level | Allowed Methods |
|-------|----------------|
| `readonly` | `queryTasks`, `getTags` |
| `readwrite` | All methods |

The user controls permission in Monkeywork's Settings → AI Channel. When the AI channel is off, all methods return permission errors.

---

## 5. Data Types

### Task

```typescript
interface Task {
  id: string;            // UUID
  title: string;         // 1-200 chars
  description: string;   // optional, max 1000 chars
  priority: Priority;    // "urgent-important" | "not-urgent-important" | "urgent-not-important" | "not-urgent-not-important"
  status: TaskStatus;    // "todo" | "in-progress" | "done"
  tags: string[];        // tag names
  startDate?: string;    // ISO datetime
  dueDate?: string;      // ISO datetime
  repeat: RepeatType;    // "none" | "daily" | "weekly" | "monthly"
  createdAt: string;     // ISO datetime
  updatedAt: string;     // ISO datetime
}
```

### Tag

```typescript
interface Tag {
  id: string;            // UUID
  name: string;          // 1-50 chars
}
```

---

## 6. Preset Tags

Russian: `Разработка, Срочное, Развитие, Рутина`
English: `Tech, Product, Growth, Routine`

When creating a task, you can use any string as a tag. These presets are shown in the UI for convenience.
