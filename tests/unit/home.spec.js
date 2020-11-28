import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container} from 'element-ui'
import VueRouter from 'vue-router'

import Home from "@/views/Home";
describe("Home.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Home,{localVue,router})
    it('has a container',()=>{
        const form = wrapper.findComponent(Container)
        expect(form.exists()).toBe(true)
    })
})