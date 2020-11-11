import getWrapper from "./utils"
//import "@/mock/index"
<<<<<<< HEAD
import MessageBlock from '@/components/MessageBlock.vue'
import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"

describe('Login.vue',()=>{
  var passedProps = {
    username: "testusername",
    password: "testpassword",
    dialogVisible: false,
  }
  const wrapper = getWrapper(Login,passedProps)
  it('renders props when passrd',()=>{
    expect(wrapper.vm.$props.username).toBe(passedProps.username);
    expect(wrapper.vm.$props.password).toBe(passedProps.password);
    expect(wrapper.vm.$props.dialogVisible).toBe(passedProps.dialogVisible);
  })

}),

    describe('Register.vue',()=>{
      var passedProps = {
        username: "testusername",
        password: "testpassword",
        password2 : "testpassword",
        dialogVisible: false,
      }
      const wrapper = getWrapper(Register,passedProps)
      it('renders props when passed',()=>{
        expect(wrapper.vm.$props.username).toBe(passedProps.username);
        expect(wrapper.vm.$props.password).toBe(passedProps.password);
        expect(wrapper.vm.$props.password2).toBe(passedProps.password2);
        expect(wrapper.vm.$props.dialogVisible).toBe(passedProps.dialogVisible);
      })
    }),
    


describe('MessageBox.vue', () => {
=======

import MessageBlock from '@/components/MessageBlock.vue'

describe('MessageBox.vue', () => {

>>>>>>> 0b9e2c374cf3a2f095f99321e87fc551f7772e7e
  var passedProps = {
    title:"title1",
    content:"content",
    user:"user"
  }
  const wrapper = getWrapper(MessageBlock,passedProps)
  it('renders props when passed', () => {

<<<<<<< HEAD
    //expect(wrapper.vm.$props.title).toBe(passedProps.title)
=======
    expect(wrapper.vm.$props.title).toBe(passedProps.title)
>>>>>>> 0b9e2c374cf3a2f095f99321e87fc551f7772e7e
    expect(wrapper.findAll(".messageblock-datetime").length).toBe(1)
    expect(wrapper.findAll(".messageblock-user").length).toBe(1)
   // expect(wrapper.findAll(".messageblock-user").at(0).text()).toBe(passedProps.user)
    expect(wrapper.findAll(".messageblock-content").length).toBe(1)
    //expect(wrapper.findAll(".messageblock-content").at(0).text()).toBe(passedProps.content)
    console.log(wrapper.text())
  })
})
