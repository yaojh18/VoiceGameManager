
<<<<<<< HEAD
import getWrapper from "./utils"

import App from '@/App.vue'

describe('App.vue', () => {

  const wrapper = getWrapper(App,{})
  it('simple coverage', () => {
    console.log(wrapper.findAll("MessageBlock").length)
=======
//import getWrapper from "./utils"

//import App from '@/App.vue'

describe('App.vue', () => {

  //const wrapper = getWrapper(App,{})
  it('simple coverage', () => {
  //  console.log(wrapper.findAll("MessageBlock").length)
>>>>>>> 0b9e2c374cf3a2f095f99321e87fc551f7772e7e
  })
})
