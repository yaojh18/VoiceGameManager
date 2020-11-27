import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Button,Card,Dialog} from 'element-ui'
import VueRouter from 'vue-router'

import Login from "@/components/Login"
describe("Login.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Login,{localVue,router})
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('has a card',()=>{
        const card = wrapper.findComponent(Card)
        expect(card.exists()).toBe(false)
    })
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
    })
})