import { getWrapper } from './utils'
import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI, {Form, Container, Table, Card, Collapse, Popover, Button, Menu} from 'element-ui'
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
    })
    it('has a Card',()=>{
        const card = wrapper.findComponent(Card)
        expect(card.exists()).toBe(true)
    })
    it('has a Collapse',()=>{
        const collapse = wrapper.findComponent(Collapse)
        expect(collapse.exists()).toBe(true)
    })
    it('has a Popover',()=>{
        const popover = wrapper.findComponent(Popover)
        expect(popover.exists()).toBe(true)
    })
    it('has a Button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
    })
    it('test functions',()=>{
        wrapper.vm.dataAudioSearch();
        wrapper.vm.dataVideoSearch();
        wrapper.vm.dataUserSearch();
    })
    it('test function data',()=>{
        wrapper.vm.SearchAll();
    })
})
describe("Data.vue",()=> {
    const wrapper = getWrapper(Data,{
        playernum: [1,2,3],
        player: [1,2,3],
        username: 'name',
        userlevel:[1,2,3],
        mgender:0,
        fgender:0,
        ugender:0,
        videoCnt: [1,2,3],
        isCollapse: false,
        labelPosition: '',
        activeName: '1',
        usercnt: [1,2,3],
        activetabName:'first',
        videoavScores:[1,2,3],
        videomScores:[1,2,3],
        videofScores:[1,2,3],
        videouScores:[1,2,3],
        videoNum:[1,2,3],
        videofNum:[1,2,3],
        videouNum:[1,2,3],
        videomNum:[1,2,3],
        mediaData:[1,2,3],
    })
    it('test function userData',async ()=>{
        await wrapper.setData({
            playernum: [],
            player: [],
            username: 'name',
            mgender:0,
            fgender:0,
            ugender:0,
            videoCnt: [1,2,3],
            isCollapse: false,
            labelPosition: '',
            activeName: '1',
            usercnt: [1,2,3],
            activetabName: 'first',
            videoavScores: [1,2,3],
            videomScores: [1,2,3],
            videofScores: [1,2,3],
            videouScores: [1,2,3],
            videoNum: [1,2,3],
            videofNum: [1,2,3],
            videouNum: [1,2,3],
            videomNum: [1,2,3],
            mediaData: [1,2,3],
        })
       expect(wrapper.vm.playernum).toStrictEqual([]);
       expect(wrapper.vm.player).toStrictEqual([]);
       expect(wrapper.vm.username).toBe('name');
           expect(wrapper.vm.mgender).toBe(0);
            expect(wrapper.vm.fgender).toBe(0);
            expect(wrapper.vm.ugender).toBe(0);
            expect(wrapper.vm.videoCnt).toStrictEqual([1,2,3]);
            expect(wrapper.vm.isCollapse).toBe(false);
            expect(wrapper.vm.labelPosition).toBe('');
            expect(wrapper.vm.activeName).toBe('1');
            expect(wrapper.vm.usercnt).toStrictEqual([1,2,3]);
            expect(wrapper.vm.activetabName).toBe('first');
            expect(wrapper.vm.videoavScores).toStrictEqual([1,2,3]);
            expect(wrapper.vm.videomScores).toStrictEqual([1,2,3]);
            expect(wrapper.vm.videofScores).toStrictEqual([1,2,3]);
            expect(wrapper.vm.videouScores).toStrictEqual([1,2,3]);
            expect(wrapper.vm.videoNum).toStrictEqual([1,2,3]);
            expect(wrapper.vm.videofNum).toStrictEqual([1,2,3]);
            expect(wrapper.vm.videouNum).toStrictEqual([1,2,3]);
            expect(wrapper.vm.videomNum).toStrictEqual([1,2,3]);
            expect(wrapper.vm.mediaData).toStrictEqual([1,2,3])
    })
})
