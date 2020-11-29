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
    it('has a button and click',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
        for(var i=0;i<button.length;++i){
            button.at(i).trigger('click');
        }
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('test default',()=>{
        expect(wrapper.vm.id).toBe(0);
        expect(wrapper.vm.dialogVisible).toBe(true);
    })
})
describe("Modify.vue",()=> {
    const wrapper = getWrapper(Modify,{
        dialogVisible: true,
        title: "title",
        content: "content",
        id:1,
        type_id:1,
    })
    it("test passing props",()=>{
        expect(wrapper.vm.dialogVisible).toBe(true);
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
    it('test communication',()=>{
        wrapper.setData({
            "title":"title",
            "content":"content",
            "level":1,
            "id":1,
            formData:1
        })
        const button = wrapper.findAll('button')
        expect(button.length).toBe(5)
        button.at(0).trigger('click')
    })
    it('functions test',()=>{
        wrapper.vm.retreat();
        wrapper.vm.setTypeId(0);
    })
})