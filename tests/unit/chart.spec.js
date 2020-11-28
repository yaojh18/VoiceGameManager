require("../__mocks__/console")
import { getWrapper } from './utils'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import  ElementUI, { Table,Collapse,Button,Dialog } from 'element-ui'
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
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(false)
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(false)
    })
})
const passedprop = {
    'female_num': 1,
    'female_scores':[1,2,3,4,5,6,7,8,9,10],
    'unknown_num':1,
    'unknown_scores':[1,2,3,4,5,6,7,8,9,10],
    'male_num':1,
    'male_scores':[1,2,3,4,5,6,7,8,9,10],
    'female_score_average': 85,
    'male_score_average': 100,
    'unknown_score_average': 0,
    'played_num': 0,
    'dialogVisible': true,
};
describe('Chart.vue',()=>{
    const wrapper = getWrapper(Chart,passedprop)
    it('passing props',()=>{
            expect(wrapper.vm.female_num).toBe(1),
            expect(wrapper.vm.female_scores).toStrictEqual([1,2,3,4,5,6,7,8,9,10]),
            expect(wrapper.vm.unknown_num).toBe(1),
            expect(wrapper.vm.unknown_scores).toStrictEqual([1,2,3,4,5,6,7,8,9,10]),
            expect(wrapper.vm.male_num).toBe(1),
            expect(wrapper.vm.male_scores).toStrictEqual([1,2,3,4,5,6,7,8,9,10]),
            expect(wrapper.vm.female_score_average).toBe(85),
            expect(wrapper.vm.male_score_average).toBe(100),
            expect(wrapper.vm.unknown_score_average).toBe(0),
            expect(wrapper.vm.played_num).toBe(0),
            expect(wrapper.vm.dialogVisible).toBe(true)
    })
    it('el-dialog close',()=>{
        const r = wrapper.find(Button)
        r.trigger('click')
        expect(wrapper.emitted().cancelChart).toStrictEqual([[""]])
    })
})