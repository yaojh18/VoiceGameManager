import  ElementUI, { Form,Dialog } from 'element-ui'
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
    it('test functions',()=>{
        const r = {"target":{"files":[0,0,0]}};
        //wrapper.vm.getFile("inputFileName",r);
        //wrapper.vm.submitForm();
    })
})
