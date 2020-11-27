import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI, {Container, Header,Button} from 'element-ui'
import VueRouter from 'vue-router'

import Start from "@/components/Start";
import Register from "@/components/Register";
import Login from "@/components/Login";
describe("Start.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Start,{localVue,router})
    it('has a container',()=>{
        const form = wrapper.findComponent(Container)
        expect(form.exists()).toBe(true)
    })
    it('has a header',()=>{
        const form = wrapper.findComponent(Header)
        expect(form.exists()).toBe(true)
    })
    it('test function',()=>{
        wrapper.vm.handlelogin();
        expect(wrapper.vm.Login.dialogVisible).toBe(true)
        wrapper.vm.handleregister();
        expect(wrapper.vm.Register.dialogVisible).toBe(true)
        wrapper.vm.registerCalled(
            'usernameregister',
            'password',
            'password'
        );
        expect(localStorage.getItem('name')).toBe(wrapper.vm.usernameLogged);
        expect(wrapper.vm.usernameLogged).toBe('usernameregister');
        wrapper.vm.loginCalled(
            'usernamelogin',
            'password'
        );
        expect(wrapper.vm.usernameLogged).toBe('usernamelogin');
        expect(localStorage.getItem('name')).toBe(wrapper.vm.usernameLogged);
    })
    it('test button',()=>{
        const buttons = wrapper.findAll(Button);
        expect(buttons.length).toBe(6);
        for(var f = 1; f<buttons.length;f++){
            buttons.at(f).trigger('click');
        }
    })
    it("test functions",()=> {
        wrapper.vm.loginCalled('12345','1234567');
        expect(wrapper.vm.usernameLogin).toBe(undefined);
        expect(wrapper.vm.password).toBe(undefined);
    })
    it('contains other kits',()=>{
        const wrapper = mount(Start);
        expect(wrapper.contains(Login)).toBe(true);
        expect(wrapper.contains(Register)).toBe(true);
    })
})
