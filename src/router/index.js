import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'messenger-view',
			component: () =>
				import(/* webpackChunkName: "about" */ '@/views/MessengerView.vue')
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});
