<template>
  <v-app dark id="app">
    <v-app-bar app flat color="secondary_dark">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="loadConversation">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="fill-height">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vuex from "vuex";
import store from "@/store/conversationsStore";
import loadConversationFromFile from "@/api/loadConversationFromFile";

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
      addConversation: "addConversation",
      setConversationIndex: "setConversationIndex"
    }),
    /**
     * calls LoadConversationFromFile method to select a file
     * loads Message objects to conversation data
     * Reverse the order so that older messages are shown first
     * loads Participant objects to conversation data
     */
    loadConversation() {
      loadConversationFromFile((conv, filepath) => {
        console.log(conv);
        if (conv == null) return;
        this.addConversation({ conv, filepath });
      });
    }
  },
  props: {
    source: String
  }
};
</script>

<style >
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
