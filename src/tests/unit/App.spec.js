import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI, {Form, Button, Container} from 'element-ui'
import VueRouter from 'vue-router'



import Home from '@/views/Home.vue'



describe('Home.vue', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Home,{localVue,router})
    it("home renders",()=>{
       console.log("home already renders")
    })
})
