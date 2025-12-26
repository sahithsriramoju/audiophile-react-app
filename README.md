# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
#My solution:
✅ 1. I store the guest’s cart locally using Zustand with persistence.
 ✅ 2. On login or signup, I merge their local cart with their database cart using:
await mergeLocalCartWithDB();
✅ 3. I use useUserStore.subscribe to detect when a user logs in, then automatically load their cart and wishlist from the database to the app state.
✅ 4. Finally, I clear the local cart state to avoid duplication.
✨ Why this matters:
🔹 Users never lose their products.
 🔹 Seamless guest-to-user transition.
 🔹 Encourages checkout and increases conversion rates.
👨‍💻 Here’s a quick snippet:
useUserStore.subscribe((state) => state.user, (user) => {
 if (user) {
 void Promise.all([loadCart(), loadWishlist()]);
 } else {
 void logOutUser();
 }
});My solution:
✅ 1. I store the guest’s cart locally using Zustand with persistence.
 ✅ 2. On login or signup, I merge their local cart with their database cart using:
await mergeLocalCartWithDB();
✅ 3. I use useUserStore.subscribe to detect when a user logs in, then automatically load their cart and wishlist from the database to the app state.
✅ 4. Finally, I clear the local cart state to avoid duplication.
✨ Why this matters:
🔹 Users never lose their products.
 🔹 Seamless guest-to-user transition.
 🔹 Encourages checkout and increases conversion rates.
👨‍💻 Here’s a quick snippet:
useUserStore.subscribe((state) => state.user, (user) => {
 if (user) {
 void Promise.all([loadCart(), loadWishlist()]);
 } else {
 void logOutUser();
 }
});