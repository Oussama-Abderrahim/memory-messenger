<template>
  <v-app dark id="app">
    <v-app-bar app flat color="secondary_dark">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Memories Messenger</v-toolbar-title>
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
import FileSystemService from "@/api/FileSystemService";
export default {
  store: store,
  data: () => ({
    drawer: true
  }),
  computed: {
    ...Vuex.mapGetters({
      currentConversation: "currentConversation",
      conversations: "conversations"
    })
  },
  beforeMount() {
    this.loadPreviousConversations().then(result => {
      for (let res of result) {
        let filepath = `${res.filepath}\\message.json`;

        FileSystemService.readJsonFile(filepath, (conv, filepath) => {
          this.openConversation({ conv, filepath }).then(conversation => {
            console.log(conversation);
          });
        });
      }
    });
  },
  methods: {
    ...Vuex.mapActions({
      addConversation: "addConversation",
      openConversation: "openConversation",
      loadPreviousConversations: "loadPreviousConversations",
      setConversationIndex: "setConversationIndex"
    }),
    /**
     * calls LoadConversationFromFile method to select a file
     * loads Message objects to conversation data
     * Reverse the order so that older messages are shown first
     * loads Participant objects to conversation data
     */
    loadConversation() {
      FileSystemService.loadJsonFile((conv, filepath) => {
        if (conv == null) return;
        this.addConversation({ conv, filepath }).then(conversation => {
          console.log(conversation);
        });
      });
    }
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
  overflow: hidden !important;
  background-color: var(--v-secondary-base);
}
</style>
