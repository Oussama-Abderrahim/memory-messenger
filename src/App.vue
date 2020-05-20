<template>
  <v-app id="app">
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
          <!-- <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>-->
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
      <!-- <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container> -->
    </v-content>

    <!-- <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>-->
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
