import {mount,createLocalVue} from '@vue/test-utils'
import ElementUI from 'element-ui';

const localVue = createLocalVue()
localVue.use(ElementUI)

export function getWrapper(component,propsData) {
    return mount(component, {
        localVue,
        propsData:propsData
    })
}

export default getWrapper