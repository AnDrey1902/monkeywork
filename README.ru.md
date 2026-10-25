<div align="center">

<img src="./logo.png" alt="Monkeywork" width="100" height="100">

# Monkeywork

### *Матрица Эйзенхауэра · Календарь · Список задач — всё в одном.*

**Мультяшный планировщик задач (PWA) на React 19 + SQLite WASM — полностью офлайн.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![SQLite WASM](https://img.shields.io/badge/SQLite_WASM-3-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org)
[![PWA](https://img.shields.io/badge/PWA-✓-5A0FC8?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License](https://img.shields.io/badge/license-MIT-aa66ff?style=flat-square)](#лицензия)

[English](README.md) &nbsp;|&nbsp; **Русский**

</div>

---

## Возможности

| Возможность | Описание |
|---|---|
| Календарь | Виды: месяц / неделя / день / год, боковая панель расписания |
| Матрица | Квадранты Эйзенхауэра с drag-and-drop распределением задач |
| Теги | Готовые теги + собственные цветные метки |
| AI-канал | Встроенный JSON-RPC 2.0 API через `window.__MonkeyworkAI` и `postMessage` |
| Уведомления | Внутренние + системные push + напоминания о сроках + Webhook |
| Excel | Импорт / экспорт CSV / Excel, шаблон |
| Статистика | Диаграммы распределения и выполнения |
| Офлайн | Данные в браузере (OPFS, SQLite WASM), без сервера |
| Языки | Русский (по умолчанию) и английский, переключатель в шапке |

## Быстрый старт

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

## Команды

| Команда | Описание |
|---|---|
| `pnpm dev` | локальная разработка |
| `pnpm build` | проверка TypeScript + сборка |
| `pnpm preview` | предпросмотр сборки |
| `pnpm lint` | Biome проверка |
| `pnpm icons` | перегенерация иконок PWA из логотипа (`scripts/generate-icons.mjs`) |

## Деплой

Чисто статическая сборка — работает на любом статическом хостинге.

| Хостинг | Как |
|---|---|
| **GitHub Pages** | push в `main` — workflow `.github/workflows/deploy.yml` (базовый путь `/monkeywork/`) |
| **Cloudflare Pages** | workflow `deploy-cf.yml` (нужен secret `CLOUDFLARE_API_TOKEN`) или `wrangler pages deploy dist` |
| **Vercel** | Framework: **Vite**, build `pnpm build`, output `dist` |
| **Docker** | `docker build -t monkeywork -f docs/deploy/Dockerfile . && docker run -d -p 8080:80 monkeywork` |

## AI API

Встроенный JSON-RPC 2.0 интерфейс для AI-агентов: чтение и запись задач через
`window.__MonkeyworkAI` или `postMessage`. Права делятся на `readonly` и `readwrite`.
Полное описание — [docs/ai-api.md](docs/ai-api.md).

```js
const api = window.__MonkeyworkAI;
const tasks = await api.queryTasks({ status: "todo" });
await api.createTask({ title: "Новая задача", priority: "urgent-important" });
```

## Технологии

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · Zustand 5 · SQLite WASM (OPFS) · date-fns · Biome

## Лицензия

[MIT](LICENSE) — форк [duckly](https://github.com/niyongsheng/duckly) от niyongsheng.
