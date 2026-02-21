# Environmental Monitoring Dashboard

Этот проект подготовлен под **GitHub Pages** (Vite + React).

## Локальный запуск

```bash
npm i
npm run dev
```

## Деплой на GitHub Pages (автоматически)

В репозитории уже лежит workflow: `.github/workflows/deploy.yml`.

1. Создай новый репозиторий на GitHub (например `monitoring-dashboard`).
2. Залей в него **все файлы из этого архива**.
3. Открой: **Settings → Pages** и выбери **Source: GitHub Actions**.
4. Сделай push в `main` — деплой запустится сам.

Сайт откроется по адресу:

- `https://<username>.github.io/<repo>/`

## Важно про роуты

Для стабильной работы на GitHub Pages используется `createHashRouter` (без 404 при обновлении страницы).

## Как обновлять сайт

Любые правки делай в `src/…`, затем:

```bash
git add .
git commit -m "Update"
git push
```

После зелёного прогона в **Actions** сайт обновится.
