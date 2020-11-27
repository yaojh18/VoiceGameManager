import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import  ElementUI, { Table,Collapse } from 'element-ui'
import VueRouter from 'vue-router'
import Chart from "@/components/Chart";

describe('Chart.vue', () => {

    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Chart,{localVue, router})
    it('has a table', () => {
        const table = wrapper.findComponent(Table)
        expect(table.exists()).toBe(false)
    })
    it('has a collapse',() => {
        const collapse = wrapper.findComponent(Collapse)
        expect(collapse.exists()).toBe(false)
    })

})