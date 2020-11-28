import {shallowMount,createLocalVue,mount} from '@vue/test-utils'
import ElementUI,{Button,Card,Dialog} from 'element-ui'
import VueRouter from 'vue-router'

import Login from "@/components/Login"
describe("Login.vue",()=>{
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    localVue.use(ElementUI)
    const wrapper = mount(Login,{localVue,router})
    it('renders',()=>{
        expect(wrapper.vm.dialogVisible).toBe(true)
        wrapper.setData({
            dialogVisible: false
        })
        expect(wrapper.vm.dialogVisible).toBe(false)
    })
    it('has a dialog',()=>{
        const dialog = wrapper.findComponent(Dialog)
        expect(dialog.exists()).toBe(true)
    })
    it('has a card',()=>{
        const card = wrapper.findComponent(Card)
        expect(card.exists()).toBe(false)
    })
    it('has a button',()=>{
        const button = wrapper.findComponent(Button)
        expect(button.exists()).toBe(true)
    })
    it('button clicks',()=>{
        const buttons = wrapper.findAll(Button)
        for(var i = 0;i<buttons.length;++i){
            buttons.at(i).trigger("click")
        }
        expect(wrapper.emitted().closeLogout).toBe(undefined)
        expect(wrapper.emitted().logoutfunc).toBe(undefined)
    })
})