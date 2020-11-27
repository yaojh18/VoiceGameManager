import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
// import Register from '@/views/Register.vue'
import StartView from '@/views/StartView.vue'
import DataView from '@/views/DataView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/data',
        name: 'DataView',
        component: DataView,
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: Register,
    // },
    // {
    //     path: '/person',
    //     name: 'PersonView',
    //     component: PersonView,
    // },
    {
        path: '/',
        name: 'StartView',
        component: StartView,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router