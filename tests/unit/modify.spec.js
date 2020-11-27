import { getWrapper } from './utils'
import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Button,Dialog,FormItem} from 'element-ui'
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
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('functions test',()=>{
        wrapper.vm.open();
        wrapper.vm.retreat();
    })
})
describe("Modify.vue",()=> {
    const wrapper = getWrapper(Modify,{
        dialogVisible: true,
        const_level_id:1,
        level_id:1,
        title: "title",
        content: "content",
        id:1,
        type_id:1,
    })
    it("test passing props",()=>{
        expect(wrapper.vm.dialogVisible).toBe(true);
        expect(wrapper.vm.const_level_id).toBe(1);
        expect(wrapper.vm.level_id).toBe(1);
        expect(wrapper.vm.title).toBe('title');
        expect(wrapper.vm.content).toBe('content');
        expect(wrapper.vm.id).toBe(1);
        expect(wrapper.vm.type_id).toBe(1);
    })
    it('test mounting correctly',()=>{
        const form = wrapper.findAll('Form')
        expect(form.length).toBe(1)
        const formitem = wrapper.findAll('FormItem')
        expect(formitem.length).toBe(0)

    })

}
)