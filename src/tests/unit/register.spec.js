import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Dialog} from 'element-ui'
import VueRouter from 'vue-router'

import Register from "@/components/Register"
describe("Register.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Register,{localVue,router})
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('has a form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('functions test name',()=>{
        wrapper.vm.changeRegisterName();
        expect(wrapper.vm.state.username_valid).toBe(true)
    })
    it('functions test pwd',()=>{
        wrapper.vm.changeRegisterPassword();
        expect(wrapper.vm.state.username_valid).toBe(true)
    })
    it('functions test pwd2',()=>{
        wrapper.vm.changeRegisterPassword2();
        expect(wrapper.vm.state.username_valid).toBe(true)
    })
})