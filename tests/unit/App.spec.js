

import getWrapper from "./utils"

import App from '@/App.vue'
import Data from '@/components/Data.vue'
import Login from '@/components/Login.vue'


describe('App.vue', () => {

  const wrapper = getWrapper(App,{})
  it('simple coverage', () => {
    console.log(wrapper.findAll("MessageBlock").length)
  })
})
describe('Login.vue',()=>{
  const wrapper = getWrapper(Login,{})
  it('Login coverage',()=>{
    console.log(wrapper.findAll('el-form').length);
  })
})
describe('Data.vue',()=>{
  const wrapper = getWrapper(Data,{})
  it('data coverage',()=>{
    console.log(wrapper.findAll("div").length);
  })
})

