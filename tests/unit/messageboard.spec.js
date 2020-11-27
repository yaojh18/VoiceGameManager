import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container,Main,Footer,Dialog} from 'element-ui'
import VueRouter from 'vue-router'

import Data from "@/components/Data";
describe("Data.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Data,{localVue,router})
    it('render successfully',()=>{
        console.log("render successfully")
    })
    it('has a container',()=>{
        const container = wrapper.findComponent(Container)
        expect(container.exists()).toBe(true)
    })
    it('has main',()=>{
        const main = wrapper.findComponent(Main)
        expect(main.exists()).toBe(true)
    })
    it('has a form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('has a footer',()=>{
        const footer = wrapper.findComponent(Footer)
        expect(footer.exists()).toBe(false)
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(false)
    })
})