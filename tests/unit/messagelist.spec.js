import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container} from 'element-ui'
import VueRouter from 'vue-router'
require("../__mocks__/console")
import MessageList from "@/components/MessageList";
import MessageBlock from "@/components/MessageBlock";

describe("MessageList.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(MessageList, { localVue, router })
    it('test function', ()=>{
        wrapper.vm.uploadMsgtoBoard('close');
        wrapper.vm.modifySuccess();
    })
    it('contains messageblock',()=>{
        const wrapper = mount(MessageList);
        expect(wrapper.contains(MessageBlock)).toBe(true);
    })
    it('contains ul and div',()=>{
        const wrapper = mount(MessageList);
        expect(wrapper.contains('ul')).toBe(true);
        expect(wrapper.contains('div')).toBe(true);
    })
    it('renders data correctly',()=>{
        const wrapper = mount(MessageList);
        const r = [{
            'title':"title",
            "level_id":0,
            "id":0,
            "type_id":0,
            "content": "123",
            "timestamp":"123",
        }*5];
        wrapper.setProps({
            messageList:r
        });
        expect(wrapper.vm.messageList).toStrictEqual(r);
    })
})