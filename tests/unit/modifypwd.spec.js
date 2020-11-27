import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form} from 'element-ui'
import VueRouter from 'vue-router'

import ModifyPwd from "@/components/ModifyPwd"
describe("ModifyPwd.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(ModifyPwd,{localVue,router})
    it('has a form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('functions test',()=>{
        console.log("there are no functions");
    })
})