import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form} from 'element-ui'
import VueRouter from 'vue-router'

import Modify from "@/components/Modify"
describe("Modify.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Modify,{localVue,router})
    it('has a form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('functions test',()=>{
        wrapper.vm.open();
        //wrapper.vm.getFile();
        //wrapper.vm.submittt();
        wrapper.vm.retreat();
    })
})