import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Button} from 'element-ui'
import VueRouter from 'vue-router'

import Login from "@/components/Login"
describe("Login.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Login,{localVue,router})
    it('has a form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
    })
    it('functions test name',()=>{
        wrapper.vm.changeName();
        // expect(wrapper.vm.state.username_valid).toBe(true);
    })
    it('functions test pwd',()=>{
        wrapper.vm.changePwd();
        // expect(wrapper.vm.state.username_valid).toBe(true);
    })
})