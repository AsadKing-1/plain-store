# plain-store-js

plain-store-js — простой и предсказуемый глобальный store состояния  
для vanilla JavaScript без фреймворков, сборщиков и зависимостей.

Библиотека предназначена для подключения напрямую в браузере через CDN
и использования через глобальный объект `PlainStore`.

---

## Назначение

plain-store-js используется для управления состоянием в небольших проектах,
где не нужны React, Vue и сложные state-менеджеры.

Библиотека сознательно минималистична и не скрывает поведение JavaScript.

Особенности:

- без фреймворков
- без зависимостей
- без middleware
- минимальный и явный API
- глобальный API через `window`
- предсказуемое поведение

Подходит для:

- HTML / CSS / JS проектов
- небольших сайтов
- виджетов
- браузерных расширений
- учебных целей

---

## Установка (CDN / jsDelivr)

Подключите библиотеку напрямую в HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/AsadKing-1/plain-store-js/dist/plain-store.js"></script>
```

После подключения библиотека доступна глобально:

```js
PlainStore.createStore
```

---

## Быстрый старт

```html
<script src="https://cdn.jsdelivr.net/gh/AsadKing-1/plain-store-js/dist/plain-store.js"></script>
<script>
  const store = PlainStore.createStore({ count: 0 });

  store.subscribe((state) => {
    console.log(state.count);
  });

  store.set({ count: 1 });
</script>
```

---

## Основная идея

Состояние — это обычный объект JavaScript.

```js
{
  count: 0,
  theme: "dark"
}
```

Каждое обновление:

- создаёт новый объект состояния
- не мутирует старое состояние
- уведомляет всех подписчиков

Важно:

- состояние должно обновляться иммутабельно
- мутация вложенных объектов может привести к ошибкам

---

## API

---

## PlainStore.createStore(initialState)

Создаёт новое глобальное хранилище состояния.

```js
const store = PlainStore.createStore({ count: 0 });
```

`initialState` — объект с начальным состоянием.

Метод возвращает объект `store`.

---

## store.getState()

Возвращает текущее состояние.

```js
const state = store.getState();
console.log(state.count);
```

Используется, когда нужно:

- получить актуальное состояние
- прочитать данные вне подписки
- подготовить новое состояние перед обновлением

Не рекомендуется мутировать объект,
возвращаемый `getState()`.

---

## store.set(partialState)

Частично обновляет состояние.

```js
store.set({ count: 5 });
```

Если текущее состояние:

```js
{ count: 0, theme: "dark" }
```

После обновления:

```js
{ count: 5, theme: "dark" }
```

Правила:

- обновляются только переданные поля
- остальные поля сохраняются
- создаётся новый объект состояния
- вызываются все подписчики

---

## store.subscribe(listener)

Подписывает функцию на изменения состояния.

```js
const unsubscribe = store.subscribe((state) => {
  console.log("Новое состояние:", state);
});
```

`listener`:

- вызывается при каждом изменении состояния
- получает новое состояние аргументом

Метод возвращает функцию отписки.

---

## Отписка от изменений

```js
unsubscribe();
```

После вызова:

- listener больше не вызывается
- store продолжает работать

---

## store.select(selector)

Позволяет выбрать часть состояния без подписки.

```js
const count = store.select((state) => state.count);
```

`selector`:

- функция, принимающая состояние
- возвращает выбранное значение
- не создаёт подписку
- используется для удобного чтения данных

---

## Пример с UI (кликер)

```html
<div>
  <button id="dec">-</button>
  <span id="count">0</span>
  <button id="inc">+</button>
</div>

<script src="https://cdn.jsdelivr.net/gh/AsadKing-1/plain-store-js/dist/plain-store.js"></script>
<script>
  const store = PlainStore.createStore({ count: 0 });

  const countEl = document.getElementById("count");
  const incBtn = document.getElementById("inc");
  const decBtn = document.getElementById("dec");

  store.subscribe((state) => {
    countEl.textContent = state.count;
  });

  incBtn.onclick = () => {
    store.set({ count: store.getState().count + 1 });
  };

  decBtn.onclick = () => {
    store.set({ count: store.getState().count - 1 });
  };
</script>
```

---

## Ограничения и осознанные упрощения

plain-store-js не содержит:

- middleware
- async логики
- persistence (localStorage и т.п.)
- devtools
- оптимизации подписчиков

Также важно учитывать:

- все подписчики вызываются при каждом обновлении
- нет защиты от мутаций вложенных объектов
- библиотека не предназначена для больших SPA

---

## Статус проекта

Версия: v0.1.1  
API минимальный и стабильный.

---

## Лицензия

MIT
