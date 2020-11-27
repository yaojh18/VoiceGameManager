import  ElementUI, { Form } from 'element-ui'
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
        const table = wrapper.findComponent(Form)
        expect(table.exists()).toBe(true)
    })
})
