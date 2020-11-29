import { getWrapper } from './utils'
import mockAxios from '../__mocks__/axios.js';
import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
require('../__mocks__/.mockfront.js');
import fetchMock from '../__mocks__/.mockfront.js'
import ElementUI,{Menu,Button} from 'element-ui'
import VueRouter from 'vue-router'
import Chart from '@/components/Chart'
import Modify from '@/components/Modify'
require("../__mocks__/console")
import MessageBlock from "@/components/MessageBlock";
describe("MessageBlock.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(MessageBlock,{localVue,router})
    it('render successfully',()=>{
        console.log("render successfully")
    })
    it('has a menu',()=>{
        const menu = wrapper.findComponent(Menu)
        expect(menu.exists()).toBe(true)
    })
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
    })
    it('test functions',()=>{
        expect(wrapper.vm.dialogVisible).toBe(true);
        wrapper.vm.closeBlock();
        expect(wrapper.vm.dialogVisible).toBe(false);
        expect(wrapper.vm.Modify.dialogVisible).toBe(false);
        wrapper.vm.editBlock();
        expect(wrapper.vm.Modify.dialogVisible).toBe(true);
        wrapper.setData({"id":1});
        fetchMock.doMock();
        wrapper.vm.detailBlock();
    })
    it('test buttons clicked',()=>{
        const button = wrapper.findAll(Button);
        for(var i=0;i< button.length;++i){
            button.at(i).trigger('click');
        }
        expect(wrapper.emitted().editclicked).toBeTruthy();
        expect(wrapper.emitted().detailclicked).toBeTruthy();
    })
    it('test props passing',async()=>{
        await wrapper.setData({'type_id': 0, 'title':'unknown title', 'content': 'unknown content'})
        expect(wrapper.vm.type_id).toBe(0);
        expect(wrapper.vm.title).toBe('unknown title');
        expect(wrapper.vm.content).toBe('unknown content');
    })
})
describe("MessageBlock.vue",()=>{
    const wrapper = getWrapper(MessageBlock,{
        title: "title",
        dialogVisible: true,
        content: "content",
        level_id: 1,
        id: 1,
        type_id: 1,
    })
    it('pass prop correctly',()=>{
        expect(wrapper.vm.dialogVisible).toBe(true)
        expect(wrapper.vm.level_id).toBe(1)
        expect(wrapper.vm.id).toBe(1)
        expect(wrapper.vm.type_id).toBe(1)
        expect(wrapper.findAll('messageblock-title').length).toBe(0)
        expect(wrapper.findAll('messageblock-content').length).toBe(0)
    })
    it('test function editblock others',()=>{
        wrapper.setData({"id":1});
        wrapper.vm.editBlock();
    })
    it('test function handleopen others',()=>{
        wrapper.setData({"id":1});
        fetchMock.doMock();
        wrapper.vm.handleOpen();
        expect(wrapper.vm.type_id).toBe(1);
        expect(wrapper.vm.title).toBe("title");
        expect(wrapper.vm.content).toBe("content");
        mockAxios.post.mockImplementationOnce(()=>Promise.resolve({data:{status:201,
                type_id:1,
                title:"title",
                content:'content',
                audio_path:"audio_path",
                video_path:"video_path"}}))
        wrapper.vm.handleOpen();
        mockAxios.post.mockImplementationOnce(()=>Promise.resolve({data:{status:404,
                type_id:1,
                title:"title",
                content:'content',
                audio_path:"audio_path",
                video_path:"video_path"}}))
        wrapper.vm.handleOpen();
    })
    it('contains detailBlock',()=>{
        wrapper.setData({
            Modify:{
                "level_id":1,
            },
            'level_id':1,
        })
        mockAxios.get.mockImplementationOnce(()=>Promise.resolve({data:{status:200}}))
        wrapper.vm.detailBlock();
        mockAxios.get.mockImplementationOnce(()=>Promise.resolve(
            {data:
                    {
                        status:201,
                        female_num: 1,
                        female_scores: [1,2,3],
                        unknown_num: 1,
                        unknown_scores: [1,2,3],
                        male_num: 1,
                        male_scores:[1,2,3],
                        female_score_average: 90,
                        male_score_average: 90,
                        unknown_score_average: 90,
                        played_num: 5,
                        title: "title",
                        type_id: 8,
                        scores: [1,2,3],
                        score_average: 90,
                    }}))
        wrapper.vm.detailBlock();
        expect(wrapper.vm.Chart.dialogVisible).toBe(false)
        expect(wrapper.vm.Chart.dialogVisible).toBe(false)
        expect(wrapper.vm.Chart.title).toBe("title")
        expect(wrapper.vm.Chart.type_id).toBe(1)
        mockAxios.get.mockImplementationOnce(()=>Promise.resolve(
            {data:
                    {
                        status:404,
                        female_num: 1,
                        female_scores: [1,2,3],
                        unknown_num: 1,
                        unknown_scores: [1,2,3],
                        male_num: 1,
                        male_scores:[1,2,3],
                        female_score_average: 90,
                        male_score_average: 90,
                        unknown_score_average: 90,
                        played_num: 5,
                        title: "title",
                        type_id: 1,
                        scores: [1,2,3],
                        score_average: 90,
                    },
                status:404,
                female_num: 1,
                female_scores: [1,2,3],
                unknown_num: 1,
                unknown_scores: [1,2,3],
                male_num: 1,
                male_scores:[1,2,3],
                female_score_average: 90,
                male_score_average: 90,
                unknown_score_average: 90,
                played_num: 5,
                title: "title",
                type_id: 1,
                scores: [1,2,3],
                score_average: 90}))
        wrapper.vm.detailBlock();
        expect(wrapper.vm.Chart.dialogVisible).toBe(false)
        expect(wrapper.vm.Chart.dialogVisible).toBe(false)
        expect(wrapper.vm.Chart.title).toBe("title")
        expect(wrapper.vm.Chart.type_id).toBe(1)
        expect(wrapper.vm.Chart.scores).toStrictEqual(undefined)
        expect(wrapper.vm.Chart.score_average).toBe(undefined)
        expect(wrapper.vm.Chart.male_score_average).toBe(undefined)
        expect(wrapper.vm.Chart.female_score_average).toBe(undefined)
        expect(wrapper.vm.Chart.unknown_score_average).toBe(undefined)
        expect(wrapper.vm.Chart.male_scores).toStrictEqual(undefined)
        expect(wrapper.vm.Chart.male_num).toBe(undefined)
        expect(wrapper.vm.Chart.female_scores).toStrictEqual(undefined)
        expect(wrapper.vm.Chart.female_num).toBe(undefined)
        expect(wrapper.vm.Chart.unknown_scores).toStrictEqual(undefined)
        expect(wrapper.vm.Chart.unknown_num).toBe(undefined)
    })
    it('contains other kits',()=>{
        const wrapper = mount(MessageBlock);
        expect(wrapper.contains(Modify)).toBe(true);
        expect(wrapper.contains(Chart)).toBe(true);
        wrapper.setData({
            Chart:{
                scores: [1,2,3,4],
                score_average: 0,
                dialogVisible: false,
                female_num: 3,
                female_scores: [1,2,3,4],
                unknown_num: 2,
                unknown_scores: [1,2,3,4],
                male_num: 2,
                male_scores: [1,2,3,4],
                female_score_average: 85,
                male_score_average: 95,
                unknown_score_average: 0,
                played_num: 10,
                title: "title",
                type_id: 1,
            },
            Modify:{
                dialogVisible: false,
                form: {
                    title: "title",
                    content: "content",
                    level_id: 1,
                    id: 1,
                    audio_path: "audio",
                    video_path: "video",
                },
                formData: new FormData(),
            },
        })
    })
})