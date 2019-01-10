import Vue from 'vue';
import SvgIcon from '../components/SvgIcon/index.vue';

// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon);

const requireAll = (requireContext: any) => requireContext.keys().forEach(requireContext);
requireAll(require.context('./svg', false, /\.svg$/));
