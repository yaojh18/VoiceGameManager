import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container} from 'element-ui'
import VueRouter from 'vue-router'

import Person from "@/components/Person";
describe("Person.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Person,{localVue,router})
    it('render successfully',()=>{
        console.log("render successfully")
    })
    it('test functions',()=>{
        wrapper.vm.handleModify()
    })
})