<template>
  <v-app
    id="app"
    dark
  >
    <v-navigation-drawer
      v-model="drawer"
      class="navigation-drawer"
      fixed
      clipped
      app
    >
      <v-list>
        <v-list-tile v-for="(conversation, i) in conversations" :key="i" avatar @click="setConversationIndex(i)">
          <v-list-tile-avatar>
            <!-- <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt=""> -->
          </v-list-tile-avatar>
          <v-list-tile-title v-text="conversation.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content fill-height>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vuex from 'vuex';
import store from '@/stores/conversationsStore';

export default {
	store: store,
	data: () => ({
		drawer: false
	}),
	computed: {
		...Vuex.mapGetters({
			currentConversation: 'currentConversation',
			conversations: 'conversations'
		})
	},
	methods: {
		...Vuex.mapActions({
			setConversationIndex: 'setConversationIndex'
		})
	},
	props: {
		source: String
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
/* Global CSS */

html,
body,
#app {
	height: 100vh;
	width: 100vw;
	padding: 0;
	margin: 0;
	overflow: hidden;
}

.toolbar,
.navigation-drawer {
	background-color: #333;
}
</style>
