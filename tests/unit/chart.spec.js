import { getWrapper } from './utils'
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
const passedprop = {
    'chartData': [1,2,3],
    'female_Num': 1,
    'female_Scores':[1,2,3,4,5,6,7,8,9,10],
    'unknown_Num':1,
    'unknown_Scores':[1,2,3,4,5,6,7,8,9,10],
    'male_Num':1,
    'male_Scores':[1,2,3,4,5,6,7,8,9,10],
    'female_Score_Average': 85,
    'male_Score_Average': 100,
    'unknown_Score_Average': 0,
    'played_Num': 0,
    'title': 'title',
    'type_id': 1,
    'dialogVisible': true,
    'Title': 'Title',
};
describe('Chart.vue',()=>{
    const wrapper = getWrapper(Chart,passedprop)
    it('passing props',()=>{
            expect(wrapper.vm.chartData).toStrictEqual([1,2,3]),
            expect(wrapper.vm.female_Num).toBe(1),
            expect(wrapper.vm.female_Scores).toStrictEqual([1,2,3,4,5,6,7,8,9,10]),
            expect(wrapper.vm.unknown_Num).toBe(1),
            expect(wrapper.vm.unknown_Scores).toStrictEqual([1,2,3,4,5,6,7,8,9,10]),
            expect(wrapper.vm.male_Num).toBe(1),
            expect(wrapper.vm.male_Scores).toStrictEqual([1,2,3,4,5,6,7,8,9,10]),
            expect(wrapper.vm.female_Score_Average).toBe(85),
            expect(wrapper.vm.male_Score_Average).toBe(100),
            expect(wrapper.vm.unknown_Score_Average).toBe(0),
            expect(wrapper.vm.played_Num).toBe(0),
            expect(wrapper.vm.title).toBe('title'),
            expect(wrapper.vm.type_id).toBe(1),
            expect(wrapper.vm.dialogVisible).toBe(true),
            expect(wrapper.vm.Title).toBe('Title')
    })
})