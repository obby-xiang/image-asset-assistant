import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import zhCN from 'element-plus/es/locale/lang/zh-cn';

import App from './App.vue';
import router from './router';

import './assets/index.css';

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus, { locale: zhCN })
  .mount('#app');
