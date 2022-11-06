import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';

import App from './App.vue';
import router from './router';

import './assets/index.css';

const app = createApp(App);

app.use(createPinia()).use(router).use(ElementPlus).mount('#app');
