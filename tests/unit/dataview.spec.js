import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container} from 'element-ui'
import VueRouter from 'vue-router'
require("../__mocks__/console")
import DataView from "@/views/DataView";
describe("DataView.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(DataView,{localVue,router})
    it('render successfully',()=>{
        console.log("render successfully")
    })
})