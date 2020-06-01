<template>
  <v-container fill-height class="messenger" fluid mx-6 py-0>
    <v-row class="fill-height" dense no-gutters>
      <!-- Conversations Bar -->
      <v-col cols="3" class="fill-height messenger-conversations">
        <v-container fill-height>
          <v-row class="fill-height">
            <v-col cols="12" class="fill-height">
              <h3>Conversation</h3>
              <!-- Search Bar -->
              <v-text-field
                outlined
                dense
                full-width
                label="Search Here"
                prepend-inner-icon="search"
              ></v-text-field>
              <v-row dense>
                <v-col cols="12">Conversations list</v-col>
              </v-row>
              <!-- Conversations Lists -->
              <perfect-scrollbar
                :options="{scrollingThreshold: 300}"
                class="messenger-conversations-list"
              >
                <!-- Single Card -->
                <conversation-tile
                  @click="setConversationIndex(i);"
                  @close="removeConversation(item.id)"
                  v-for="(item,i) in conversations"
                  :active="item == currentConversation"
                  :item="item"
                  :key="'conversation-'+i"
                />
              </perfect-scrollbar>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <!-- Messages Bar -->
      <v-col cols="6" class="fill-height messenger-messages">
        <!-- Search Toolbar, appear when button clicked -->
        <v-toolbar
          color="secondary_dark messenger-messages-toolbar"
          dense
          floating
          v-if="Search.showSearch"
        >
          <v-btn icon small @click="nextSearchResult">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn icon small @click="prevSearchResult">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-toolbar-title
            v-if="Search.searching"
            class="title ml-3"
          >Result {{(Search.searchIndex+1)}} of {{Search.foundIndexes.length}}</v-toolbar-title>
          <messenger-search-bar v-if="!Search.searching" class="ml-4" @search="showSearchResult"></messenger-search-bar>
          <v-spacer></v-spacer>
          <v-btn small text v-if="Search.searching" @click="closeSearchBar()">done</v-btn>
        </v-toolbar>
        <v-container fill-height>
          <!-- Messages -->
          <perfect-scrollbar
            ref="messengerScrollbar"
            @ps-y-reach-end="loadMoreMessages"
            class="fill-height"
            v-if="shownConversation.messages.length"
          >
            <message-tile
              v-for="(message, i) in shownConversation.messages"
              :avatarSrc="getAvatar(message.sender_name)"
              :key="'message-' + i"
              :message="message"
              @photoClick="showImageInViewer"
            ></message-tile>
          </perfect-scrollbar>

          <photo-viewer-dialog
            :image="viewerImage"
            v-model="Dialogs.showPhotoViewer"
          ></photo-viewer-dialog>
        </v-container>
      </v-col>
      <!-- Informations Bar -->
      <v-col cols="3" class="fill-height messenger-informations pr-10">
        <v-container fill-height mx-3 fluid>
          <v-row class="fill-height" justify="start">
            <v-col cols="12" class="text-center">
              <!-- Current conversation Information -->
              <v-container class="user-card" fluid>
                <v-row justify="center">
                  <v-avatar size="100" color="grey">
                    <v-img :src="currentConversation.avatar" alt="alt" />
                  </v-avatar>
                </v-row>
                <v-row justify="center" class="mt-3">
                  <h3>{{currentConversation.title || "Conversation Title"}}</h3>
                </v-row>
                <v-row justify="center" class="mt-2">
                  <h5>{{currentConversation.messages.length}} Messages</h5>
                </v-row>
              </v-container>

              <!-- Search Options -->
              <v-expansion-panels class="mt-10" v-model="Panels.searchPanel">
                <v-expansion-panel class="search-options-panel">
                  <v-expansion-panel-header>Advanced search</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- Search Button -->
                    <v-btn
                      small
                      block
                      tile
                      text
                      @click="Search.showSearch = !Search.showSearch; Search.searching=false"
                    >
                      <v-icon left>mdi-magnify</v-icon>Search in conversation
                      <v-spacer></v-spacer>
                    </v-btn>

                    <!-- Start Date Picker  -->
                    <v-menu
                      v-model="Search.startDatePicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="Search.startDate"
                          label="Starting Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="Search.startDate" @input="searchByDate()" />
                    </v-menu>

                    <!-- Photo Gallery Button -->
                    <v-btn small block tile text @click.stop="Dialogs.showPhotoGallery = true">
                      <v-icon left>mdi-folder-multiple-image</v-icon>Show conversation Photos
                      <v-spacer></v-spacer>
                    </v-btn>

                    <photo-gallery-dialog
                      @imageClick="imageClick"
                      :images="currentConversation.photos"
                      v-model="Dialogs.showPhotoGallery"
                    ></photo-gallery-dialog>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

              <!-- Edit Options -->
              <v-expansion-panels class="mt-10" v-model="Panels.editPanel">
                <v-expansion-panel class="search-options-panel">
                  <v-expansion-panel-header>Edit conversations</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- Edit Nicknames -->
                    <v-btn small block tile text>
                      <v-icon left>mdi-pencil</v-icon>Edit Nicknames
                      <v-spacer></v-spacer>
                    </v-btn>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConversationTile from "@/components/ConversationTile";
import MessageTile from "@/components/MessageTile";
import MessengerSearchBar from "@/components/MessengerSearchBar";
import PhotoGalleryDialog from "@/components/PhotoGalleryDialog";
import PhotoViewerDialog from "@/components/PhotoViewerDialog";
import store from "@/store/conversationsStore";
import Vuex from "vuex";

export default {
  store,
  components: {
    PhotoGalleryDialog,
    PhotoViewerDialog,
    ConversationTile,
    MessageTile,
    MessengerSearchBar
  },
  data: () => ({
    Search: {
      showSearch: false,
      startDate: null,
      searching: false,
      startDatePicker: false,
      searchIndex: 0,
      foundIndexes: []
    },
    Dialogs: {
      showPhotoGallery: false,
      showPhotoViewer: false
    },
    Panels: {
      searchPanel: 0,
      editPanel: 0
    },
    viewerImage: "",
    messageStartIndex: 0,
    messagesCount: 30,
    shownConversation: {
      messages: []
    },
    activeConversation: -1
  }),
  computed: {
    ...Vuex.mapGetters({
      currentConversation: "currentConversation",
      conversations: "conversations"
    })
  },
  watch: {
    currentConversation(newVal, oldVal) {
      if (newVal != oldVal) this.closeSearchBar();
    }
  },
  methods: {
    ...Vuex.mapActions({
      addConversation: "addConversation",
      removeConversation: "removeConversation",
      storeSetConversationIndex: "setConversationIndex"
    }),
    /**
     *
     */
    setConversationIndex(i) {
      this.closeSearchBar();
      this.storeSetConversationIndex(i);
      this.resetStartIndex(0);
      this.scrollMessagesToTop();
    },
    scrollMessagesToTop() {
      if (this.$refs.messengerScrollbar)
        this.$refs.messengerScrollbar.$el.scrollTop = 0;
    },
    /**
     *
     */
    refreshShownMessages() {
      this.$set(
        this.shownConversation,
        "messages",
        this.currentConversation.messages.slice(
          this.messageStartIndex,
          this.messageStartIndex + this.messagesCount
        )
      );
    },
    /**
     *
     */
    loadMoreMessages() {
      console.log("load more messages");
      const LOAD_STEP = 10; // how many message to load each time
      let lastMessageIndex = this.messageStartIndex + this.messagesCount;
      if (lastMessageIndex >= this.currentConversation.messages.length) return;

      let newMessages = this.currentConversation.messages.slice(
        lastMessageIndex,
        lastMessageIndex + LOAD_STEP
      );
      this.$set(
        this.shownConversation,
        "messages",
        this.shownConversation.messages.concat(newMessages)
      );
      this.messagesCount += LOAD_STEP;
    },
    /**
     * Get Avatar url from participants object
     */
    getAvatar(name) {
      let participant = this.currentConversation.participants.filter(
        p => p.name == name
      );
      if (participant && participant.length) {
        return participant[0].avatar;
      } else {
        return null;
      }
    },
    showImageInViewer(img) {
      this.Dialogs.showPhotoViewer = true;
      this.viewerImage = img
    },
    imageClick(i) {
      this.Dialogs.showPhotoGallery = false;
      this.showSearchResult([i]);
    },
    /**
     *
     */
    searchByDate() {
      this.Search.startDatePicker = false;
      let startDate_timestamp = Date.parse(this.Search.startDate);
      let index = this.currentConversation.messages.length - 1;
      for (let i in this.currentConversation.messages) {
        if (
          this.currentConversation.messages[i].timestamp >= startDate_timestamp
        ) {
          index = i;
          break;
        }
      }
      console.log(index);

      this.showSearchResult([index]);
    },
    /**
     *
     */
    resetStartIndex(startIndex = 0) {
      this.messagesCount = 30;
      this.messageStartIndex = startIndex;
      this.refreshShownMessages();
      this.$nextTick(() => {
        this.scrollMessagesToTop();
      });
    },
    /**
     *
     */
    showSearchResult(foundIndexes) {
      this.Search.foundIndexes = foundIndexes;
      this.Search.searching = true;
      this.Search.showSearch = true;
      this.Search.searchIndex = -1;
      if (foundIndexes.length) {
        console.log(foundIndexes);
        this.nextSearchResult();
      }
    },
    /**
     *
     */
    closeSearchBar() {
      this.Search.searching = false;
      this.Search.showSearch = false;
      if (this.currentConversation.messages) this.resetStartIndex(0);
    },
    /**
     * Increment the search index and refreshshownMessages
     */
    nextSearchResult() {
      if (this.Search.foundIndexes.length == 0) return;
      this.Search.searchIndex++;
      this.Search.searchIndex %= this.Search.foundIndexes.length; // Back to 0 after last
      this.messageStartIndex = Math.max(
        this.Search.foundIndexes[this.Search.searchIndex] - 1,
        0
      );
      this.resetStartIndex(this.messageStartIndex);
    },
    /**
     * Decrement the search index and refreshShownMessages
     */
    prevSearchResult() {
      if (this.Search.foundIndexes.length == 0) return;
      this.Search.searchIndex--;
      if (this.Search.searchIndex < 0)
        this.Search.searchIndex = this.Search.foundIndexes.length - 1; // Back to last
      this.messageStartIndex = Math.max(
        this.Search.foundIndexes[this.Search.searchIndex] - 1,
        0
      );
      this.resetStartIndex(this.messageStartIndex);
    },
    /**
     *
     */
    getCurrentConversationPhotos() {
      if (this.currentConversation.messages) {
        return this.currentConversation.photos;
      }
      return [];
    }
  },

  mounted() {}
};
</script>

<style lang="scss">
.ps {
  width: 100%;
}
.messenger {
  background-color: var(--v-secondary-base);
  width: 100%;
  overflow: hidden;
  padding: 0;

  &-conversations,
  &-messages {
    border-right: 2px solid var(--v-secondary_dark-base);

    &-toolbar {
      width: 100%;
    }
  }

  &-conversations {
    .ps {
      height: 80%;
    }
  }

  &-informations {
    & .user-card,
    & .search-options-panel {
      background-color: var(--v-secondary_dark-base) !important;
    }
  }
}
</style>
