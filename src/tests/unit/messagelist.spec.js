import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container} from 'element-ui'
import VueRouter from 'vue-router'

import MessageList from "@/components/MessageList"

describe("MessageList.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(MessageList, { localVue, router })
    it('test function', ()=>{
        wrapper.vm.uploadMsgtoBoard('close');
        wrapper.vm.modifySuccess();
    })
})