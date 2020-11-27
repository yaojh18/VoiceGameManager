import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Dialog,Form} from 'element-ui'
import VueRouter from 'vue-router'

import ModifyPerson from "@/components/ModifyPerson"
describe("ModifyPerson.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(ModifyPerson,{localVue,router})
    it('has a form',()=>{
        const form = wrapper.findComponent(Dialog)
        expect(form.exists()).toBe(true)
    })
    it('functions test',()=>{
        console.log("there are no functions");
    })
})