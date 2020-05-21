<template>
  <v-app dark>
    <v-app-bar app flat color='secondary'>
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

<style scoped>
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
  background-color: var(--v-secondary-base);
}

</style>
