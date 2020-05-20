<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          link
          @click="setConversationIndex(i)"
          v-for="(conversation, i) in conversations"
          :key="i"
        >
          <v-list-item-avatar>
            <v-img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ conversation.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vuex from "vuex";
import store from "@/store/conversationsStore";

export default {
  store: store,
  data: () => ({
    drawer: true,
    Source: ""
  }),
  computed: {
    ...Vuex.mapGetters({
      currentConversation: "currentConversation",
      conversations: "conversations"
    })
  },
  methods: {
    ...Vuex.mapActions({
      setConversationIndex: "setConversationIndex"
    })
  },
  props: {
    source: String
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
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
