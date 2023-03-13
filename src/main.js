import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import Clipboard from 'v-clipboard';
import BaseBtn from './components/UI/BaseBtn.vue';
import BaseWrapper from './components/UI/BaseWrapper.vue';
import AddDesign from './components/AddDesign.vue';
import TheShowcase from './components/TheShowcase.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        { path: '/show', component: TheShowcase, alias: '/'},
        { path: '/add', component: AddDesign },
        { path: '/add/:designId', component: AddDesign, props: true },
        { path: '/:notFound(.*)', redirect: '/show' },
        
    ]
});

const app = createApp(App);

app.component('base-btn', BaseBtn);
app.component('base-wrapper', BaseWrapper);
app.use(router);
app.use(Clipboard);

app.mount('#app');