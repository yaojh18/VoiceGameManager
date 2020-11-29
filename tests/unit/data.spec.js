import mockAxios from "../__mocks__/axios";
require('../__mocks__/.mockfront.js');
require("../__mocks__/console")
import fetchMock from '../__mocks__/.mockfront.js'
import { getWrapper } from './utils'
import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI, {Form, Container, Table, Card, Collapse, Popover, Button, Menu,Aside,FormItem,TableColumn,Input} from 'element-ui'
import VueRouter from 'vue-router'

import Data from "@/components/Data";
describe("Data.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Data,{localVue,router})
    it('has a Form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('has a Container',()=>{
        const container = wrapper.findComponent(Container)
        expect(container.exists()).toBe(true)
    })
    it('has a Table',()=>{
        const table = wrapper.findComponent(Table)
        expect(table.exists()).toBe(true)
        const tableColumn = wrapper.findComponent(TableColumn)
        //expect(tableColumn.length).toBeGreaterThan(1)
    })
    it('has inputs',()=>{
        const inputs = wrapper.findComponent(Input)
        //expect(inputs.length).toBeGreaterThan(1)
    })
    it('has a Button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
        //expect(button.length).toBeGreaterThan(1)
    })
    it('has subcontrols',()=>{
        var r = wrapper.findAll(Form);
        expect(r.exists()).toBe(true);
        for(var i=0;i<r.length;++i){
            var u = r.at(i).findAll(FormItem)
            expect(u.exists()).toBe(true);
        }
    })
    it('test function audioSearch',()=>{
        wrapper.setData({
            audioGender: 1,
            audioLevelId: 1,
            audioSort: 0
        });
        fetchMock.doMock();
        wrapper.vm.audioSearch();
    })
    it('test function userSearch',()=>{
        wrapper.setData({
            userGender: 1,
            userSort: 1
        });
        fetchMock.doMock();
        wrapper.vm.userSearch();
    })
    it('test function data',()=>{
        wrapper.vm.userGenderChange(1);
        expect(wrapper.vm.userGender).toBe(1);
        wrapper.vm.userSortChange(0);
        wrapper.vm.audioGenderChange(1);
        wrapper.vm.audioSortChange(0);
    })
})
