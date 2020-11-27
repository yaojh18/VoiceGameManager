import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Dialog,Form} from 'element-ui'
import VueRouter from 'vue-router'

import ModifyPerson from "@/components/ModifyPerson"
describe("ModifyPerson.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(ModifyPerson,{localVue,router})
    it('has a form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(false)
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('functions test',()=>{
        wrapper.vm.changeName();
        wrapper.vm.changeemail();
        wrapper.vm.changename();
        wrapper.vm.changePersonModify("a","b","c");
        expect(wrapper.vm.name).toBe("a");
        expect(wrapper.vm.email).toBe("b");
        expect(wrapper.vm.username).toBe("c");
        wrapper.vm.editUser();
    })
})