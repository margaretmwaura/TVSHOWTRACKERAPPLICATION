import vue from 'vue'
import { expect } from 'chai'
import Singup from "../../src/components/Signup.vue";
import Login from "../../src/components/Login";
import MovieList from "../../src/components/MovieList";
import Modal from "../../src/components/Modal";
import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'

import store from '../../src/store/store'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

// describe('Login.vue', () => {
//     it(`testing text`, () => {
//         // Extend the component to get the constructor, which we can then initialize directly.
//         const wrapper = mount(Login);
//         expect(wrapper.find('button').text()).to.equal("Login user")
//     });
// });

// This will work if there are no axios calls

//This function will work for the tests with no axios calls
// describe('Login.vue', () => {
//     it('button click triggers submit event',async() => {
//         const wrapper = shallowMount(Login)
//         wrapper.setData({
//                 form:
//                     {
//                         email: "mag@gmail.com",
//                         password: "Aswift07"
//                     }
//             }
//         );
//         wrapper.find('form').trigger('submit')
//         await vue.nextTick();
//         console.log(wrapper.vm.form.password);
//         expect(wrapper.vm.form.password).to.equal(" ")
//
//     })
// });


// This will work if there is no state
// describe('Login.vue', () => {
//     it('button click triggers submit event another',(done)=> {
//         const wrapper = shallowMount(Login)
//         wrapper.setData({
//                 form:
//                     {
//                         email: "mag@gmail.com",
//                         password: "Aswift07"
//                     }
//             }
//         );
//         wrapper.vm.create().then(()=>
//         {
//             console.log(wrapper.vm.form.password);
//             expect(wrapper.vm.form.password).to.equal(" ")
//             done()
//         })
//     })
// });


// This will work if there is state
// describe('Login.vue', () => {
//     it('button click triggers submit event another',(done)=> {
//         const wrapper = shallowMount(Login,{store})
//         wrapper.setData({
//                 form:
//                     {
//                         email: "mag@gmail.com",
//                         password: "Aswift07"
//                     }
//             }
//         );
//         wrapper.vm.create().then(()=>
//         {
//             console.log("Logging form test " , wrapper.vm.form.password);
//             expect(wrapper.vm.form.password).to.equal(" ")
//             done()
//         })
// })
//
// });

describe('MovieList.vue', () => {

    it('Movies are displayed', done =>
    {
        const wrapper = shallowMount(MovieList,{store})

        wrapper.vm.$nextTick(() => {
            console.log("Test log " , store.state.movies);
            expect(store.state.movies).to.equal(5)
            done();
        });
    })

});
