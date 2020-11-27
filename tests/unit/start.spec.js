import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI, {Container, Form} from 'element-ui'
import VueRouter from 'vue-router'

import Start from "@/components/Start";
describe("Register.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Start,{localVue,router})
    it('has a container',()=>{
        const form = wrapper.findComponent(Container)
        expect(form.exists()).toBe(true)
    })
})