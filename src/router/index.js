import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import StartView from '@/views/StartView.vue'
import DataView from '@/views/DataView.vue'
import Add from '@/views/Add.vue'
import Modify from '@/views/Modify.vue'
import PersonView from '@/views/PersonView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/data',
        name: 'DataView',
        component: DataView,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/person',
        name: 'PersonView',
        component: PersonView,
    },
    {
        path: '/',
        name: 'StartView',
        component: StartView,
    },
    {
        path: '/add',
        name: 'Add',
        component: Add,
    },
    {
        path: '/modify',
        name: 'Modify',
        component: Modify,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router