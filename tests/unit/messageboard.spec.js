import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Form,Container,Main,Footer,Dialog,Button,TabPane} from 'element-ui'
import VueRouter from 'vue-router'

import MessageBoard from "@/components/MessageBoard";
import MessageBlock from "@/components/MessageBlock";
import MessageList from "@/components/MessageList";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import ModifyPwd from "@/components/ModifyPwd";
import ModifyPerson from "@/components/ModifyPerson";
import Add from "@/components/Add";
describe("MessageBoard.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(MessageBoard,{localVue,router})
    it('render successfully',()=>{
        console.log("render successfully")
    })
    it('has a container',()=>{
        const container = wrapper.findComponent(Container)
        expect(container.exists()).toBe(true)
    })
    it('has main',()=>{
        const main = wrapper.findComponent(Main)
        expect(main.exists()).toBe(true)
    })
    it('has a form',()=>{
        const form = wrapper.findComponent(Form)
        expect(form.exists()).toBe(true)
    })
    it('has a footer',()=>{
        const footer = wrapper.findComponent(Footer)
        expect(footer.exists()).toBe(true)
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
        const buttons = wrapper.findComponent(Button)
        for(var i=1;i<=buttons.length;++i){
            buttons.at(i).trigger('click');
        }
    })
    it('test function initData',()=>{
        wrapper.vm.initData();
        expect(wrapper.vm.listMaleCnt).toBe(0);
        expect(wrapper.vm.listFemaleCnt).toBe(0);
        expect(wrapper.vm.listUnknownCnt).toBe(0);
        expect(wrapper.vm.messageListMalePart).toStrictEqual([]),
            expect(wrapper.vm.messageListFemalePart).toStrictEqual( []),
                expect(wrapper.vm.messageListUnknownPart).toStrictEqual([]),
                    expect(wrapper.vm.messageListMale).toStrictEqual([]),
                        expect(wrapper.vm.messageListFemale).toStrictEqual([]),
                            expect(wrapper.vm.messageListUnknown).toStrictEqual([]);
    })
    it('test other function',()=>{
        wrapper.vm.loginCalled();
        wrapper.vm.refreshList();
        wrapper.vm.registerCalled();
    })
    it('test function logout',()=>{
        wrapper.vm.logoutFuncCalled();
        expect(wrapper.vm.usernameLogged).toBe("unknown");
        expect(wrapper.vm.dialogVisible).toBe(false);
    })
    it('test function modify',()=>{
        wrapper.vm.PwdModify();
        expect(wrapper.vm.ModifyPwd.dialogVisible).toBe(true);
        wrapper.vm.PersonModify();
        expect(wrapper.vm.ModifyPerson.dialogVisible).toBe(true);
    })
    it('test function pagination',()=>{
        wrapper.setData({
            messageListMale:[1,2,3,4,5,6,7,8,9,10],
            messageListFemale:[1,2,3,4,5,6,7,8,9,10],
            messageListUnknown:[1,2,3,4,5,6,7,8,9,10],
        })
        wrapper.vm.handleCurrentChangepag1(1);
        expect(wrapper.vm.messageListMalePart).toStrictEqual([1,2,3,4]);
        wrapper.vm.handleCurrentChangepag2(1);
        expect(wrapper.vm.messageListFemalePart).toStrictEqual([1,2,3,4]);
        wrapper.vm.handleCurrentChangepag3(1);
        expect(wrapper.vm.messageListUnknownPart).toStrictEqual([1,2,3,4]);
    })
    it('test function changeadd',()=>{
        wrapper.vm.changeAdd();
        expect(wrapper.vm.Add.dialogVisible).toBe(true);
    })
    it('test function changeLogin',()=>{
        wrapper.vm.changeLogin();
        expect(wrapper.vm.Login.dialogVisible).toBe(true);
    })
    it('test function changeRegister',()=>{
        wrapper.vm.changeRegister();
        expect(wrapper.vm.Register.dialogVisible).toBe(true);
    })
    it('test tab',async ()=>{
        const options = wrapper.findAll(TabPane)
        expect(options.exists()).toBe(true)
        expect(options.length).toBeGreaterThan(1)
    })
    it('contains other kits',()=>{
        const wrapper = mount(MessageBoard);
        expect(wrapper.contains(MessageList)).toBe(true);
        expect(wrapper.contains(Register)).toBe(true);
        expect(wrapper.contains(Login)).toBe(true);
        expect(wrapper.contains(Logout)).toBe(true);
        expect(wrapper.contains(ModifyPwd)).toBe(true);
        expect(wrapper.contains(ModifyPerson)).toBe(true);
        expect(wrapper.contains(Add)).toBe(true);
    })
})