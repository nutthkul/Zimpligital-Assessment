// import en from './locale/en.js'
import en from '../src/assets/i18n/en.json'
import th from '../src/assets/i18n/th.json'

import VueI18n from 'vue-i18n'
// import i18n from './i18n'
import Vue from 'vue'


Vue.use(VueI18n)
export default new VueI18n({
    locale: localStorage.getItem('lang') || en,
    messages: {
        en: en,
        th: th
    }
}) 