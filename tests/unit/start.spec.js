import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI, {Container, Header} from 'element-ui'
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
    it('has a header',()=>{
        const form = wrapper.findComponent(Header)
        expect(form.exists()).toBe(true)
    })
    it('test function',()=>{
        wrapper.vm.handlelogin();
        expect(wrapper.vm.Login.dialogVisible).toBe(true)
        wrapper.vm.handleregister();
        expect(wrapper.vm.Register.dialogVisible).toBe(true)
        wrapper.vm.registerCalled();
        wrapper.vm.loginCalled();
    })
})