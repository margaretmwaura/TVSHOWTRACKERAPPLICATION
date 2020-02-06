import vue from 'vue'
import { expect } from 'chai'
import Singup from "../../src/components/Signup.vue";
import Login from "../../src/components/Login";
import MovieList from "../../src/components/MovieList";
import Modal from "../../src/components/Modal";
import { mount } from '@vue/test-utils'

import { shallowMount} from '@vue/test-utils'
describe('Signup.vue', () => {
    it(`testing text`, () => {
        // Extend the component to get the constructor, which we can then initialize directly.
        const wrapper = mount(Singup);
        expect(wrapper.find('button').text()).to.equal("Create account")
    });
});



describe('Login.vue', () => {
    it(`testing text`, () => {
        // Extend the component to get the constructor, which we can then initialize directly.
        const wrapper = mount(Login);
        expect(wrapper.find('button').text()).to.equal("Login user")
    });
});


describe('Movielist.vue', () => {
    it(`testing binding`, () => {
        // Extend the component to get the constructor, which we can then initialize directly.
        const wrapper = mount(Login);
        wrapper.find('input').setValue("Maggie");
        expect(wrapper.vm.$data).contains("Maggie")
    });
});


describe('Modal.vue', () => {
    it(`should render receivedValue as its text content`, () => {

        const wrapper = shallowMount(Modal, {
            propsData: 'maggie',
        });
        expect(wrapper.text()).to.include('maggie')
        // expect(comp.props().movies).toBe('maggie')
    });
});
