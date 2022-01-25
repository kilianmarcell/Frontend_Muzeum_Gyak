import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Paintings from './components/Paintings.vue';
import Statues from './components/Statues.vue';
import Statue from './components/Statue.vue';
import Info from './components/Info.vue';

Vue.use(VueRouter) //ez a plugin

Vue.config.production = false

const routes = [
    {
        path: '/statues',
        components: Statues
    },
    {
        path: '/statues/:id',
        components: Statue
    },
    {
        path: '/paintings',
        components: Paintings
    },
    {
        path: '/info',
        components: Info
    }
];

const router = new VueRouter({
    routes // ugyan az mint a routes: routes
});

new Vue({
    render: h => h(App),
    router
}).mount('#app')