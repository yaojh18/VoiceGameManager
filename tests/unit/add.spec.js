import  ElementUI, { Form,Dialog,Button } from 'element-ui'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Add from "@/components/Add"



describe("Add.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)

    const wrapper = mount(Add,{localVue, router})
    it('has a form', () => {
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
    })
    it('test functions',async ()=>{
            expect(wrapper.vm.dialogVisible).toBe(true)
            const button = wrapper.findAll('button')
            expect(button.length).toBe(2);
            for(var r=1;r<button.length;r++){
                button.at(r).trigger('click');
            }
            expect(wrapper.vm.dialogVisible).toBe(false)
    })
    it('test button triggered',async()=>{
             const button = wrapper.findAll('button')
             for (var i = 0; i <button.length; i++) {
                 button.at(i).trigger('click');
             }
             expect(wrapper.emitted().closeAdd).toBeTruthy()
    })
    it('test passing props',async()=>{
           await wrapper.setData({ level: 'level' ,type_id:"type_id",title:'title',content:'content'})
           expect(wrapper.vm.level).toBe('level')
           expect(wrapper.vm.type_id).toBe('type_id')
           expect(wrapper.vm.title).toBe('title')
           expect(wrapper.vm.content).toBe('content')
    })
})
