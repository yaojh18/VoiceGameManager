import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container} from 'element-ui'
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
})