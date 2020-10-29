import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Stage1 from '@/views/Stage1.vue'
import Stage2 from '@/views/Stage2.vue'
import Stage3 from '@/views/Stage3.vue'
import Data from '@/views/Data.vue'
import Add from '@/views/Add.vue'
import Person from '@/views/Person.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
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
        name: 'Data',
        component: Data,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/stage1',
        name: 'Stage1',
        component: Stage1,
    },
    {
        path: '/stage2',
        name: 'Stage2',
        component: Stage2,
    },
    {
        path: '/stage3',
        name: 'Stage3',
        component: Stage3,
    },
    {
        path: '/person',
        name: 'Person',
        component: Person,
    },
    {
        path: '/add',
        name: 'Add',
        component: Add,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router