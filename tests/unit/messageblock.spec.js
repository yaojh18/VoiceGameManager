import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Menu} from 'element-ui'
import VueRouter from 'vue-router'

import MessageBlock from "@/components/MessageBlock";
describe("MessageBlock.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(MessageBlock,{localVue,router})
    it('render successfully',()=>{
        console.log("render successfully")
    })
    it('has a menu',()=>{
        const menu = wrapper.findComponent(Menu)
        expect(menu.exists()).toBe(true)
    })
})