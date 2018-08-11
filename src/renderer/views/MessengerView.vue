<template>
  <v-layout row wrap class="messenger">
    <v-flex xs8>
      <v-list three-line
              v-scroll:#messages="onMessagesScroll"
              class="messenger-messages" id="messages" ref="messages">
        <template v-for="(message, i) in shownConversation.messages">
          <v-list-tile
            :key="i"
            avatar
            @click="1"
            class="message">
            <v-list-tile-avatar>
              <img :src="conversation.participants[0].avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title 
              class="message-sender"
              v-html='getSenderNameHTML(message.sender_name, message.timestamp)'></v-list-tile-title>
              <v-list-tile-sub-title class="white--text message-content" v-html='message.content'></v-list-tile-sub-title>
              
            </v-list-tile-content>
          </v-list-tile>
          <v-layout justify-center :key='"photo" + i' v-if='message.photos'>
            <img :src='getImgPath(message.photos[0].uri)' alt="Photo">
          </v-layout>
        </template>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title @click='loadMoreMessages'>Charger la suite</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs4 class="messenger-controls">
      <v-btn @click='loadConversation'>load Conversation</v-btn>
      <v-list subheader>
        <v-subheader>Participants</v-subheader>
        <v-list-tile
          v-for="(participant, i) in conversation.participants"
          :key="i"
          avatar
          @click="1">
          <v-list-tile-avatar>
            <img :src="participant.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html='participant.name'></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import loadConversationFromFile from '@/api/loadConversationFromFile'
import store from '@/stores/conversationsStore'
import Vuex from 'vuex'

 export default {
   store,
   data() {
     return {
       DEFAULT: {
         SENDER_NAME: 'utilisateur',
         AVATAR: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
       },
       filepath: "/",
       messagesOffset: 0,
       messagesCount: 30,
       shownConversation: {
         messages: []
       },
     }
   },
   computed: {
      ...Vuex.mapGetters([
        'conversation'
      ]),
   },
   methods: {
     ...Vuex.mapActions([
       'addConversation'
     ]),
    getSenderNameHTML(sender_name, timestamp) {
      return ((sender_name) || this.DEFAULT.SENDER_NAME) + ` <span class="grey--text text--lighten-1">${this.formatDate(timestamp)}</span>`
    },
     /**
      * 
      */
    getImgPath(uri) {
      return this.filepath + uri;
    },
    /**
     * 
     */
    loadMoreMessages() {
      const LOAD_STEP = 10; // how many message to load each time
      let lastMessageIndex = this.messagesOffset+this.messagesCount
      let newMessages = this.conversation.messages.slice(lastMessageIndex, lastMessageIndex+LOAD_STEP)
      this.shownConversation.messages = this.shownConversation.messages.concat(newMessages)
      this.messagesCount += LOAD_STEP;
    },
    /**
     * 
     */
    onMessagesScroll (e) {
        if(e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
          this.loadMoreMessages()
        }
      },
     /**
      * @param timestamp in seconds
      * @return {String} date string in own format
      */
     formatDate(timestamp) {
       const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
       const MONTHS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
       let date = new Date(timestamp*1000)
        
       return `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
     },
     /**
      * calls LoadConversationFromFile method to select a file
      * loads Message objects to conversation data
      * Reverse the order so that older messages are shown first
      * loads Participant objects to conversation data
      */
     loadConversation() {
       this.messagesCount = 30
       this.messagesOffset = 0
       loadConversationFromFile((conv, filepath) => {
         console.log(conv)
         if(conv == null) return;
         this.filepath = filepath
         this.addConversation(conv)
         this.shownConversation.messages = this.conversation.messages.slice(0, this.messagesCount)
         this.loadMoreMessages()
       })
     }
   }
 }
</script>

<style lang="scss">
.messenger {
  color: white;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  &-messages {
    background: #333;
    height: 100vh;
    overflow-y: scroll;
  }
  &-controls {
    background-color: #444;
    height: 100vh;
    overflow-y: scroll;
  }

  .message {
    background: inherit;

    &-sender {
      font-weight: bold;
      color: #2980b9;
    }

    &-content {
      font-weight: normal;
    }
  }
}
</style>