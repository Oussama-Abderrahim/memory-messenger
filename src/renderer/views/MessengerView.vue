<template>
    <v-layout row wrap class="messenger">
      <v-flex xs8>
        <v-list three-line class="messenger-messages">
          <template v-for="(message, i) in conversation.messages.slice(messagesOffset, messagesOffset+messagesCount)">
            <v-list-tile
              :key="i"
              avatar
              @click="1"
              class="message"
            >
              <!-- <v-list-tile-action>
                <v-icon color="yellow">star</v-icon>
              </v-list-tile-action> -->

              <v-list-tile-avatar>
                <img :src="conversation.participants[0].avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title 
                class="message-sender"
                v-html='((message.sender_name) || DEFAULT.SENDER_NAME) + ` <span class="grey--text text--lighten-1">${message.timestamp}</span>`'></v-list-tile-title>
                <v-list-tile-sub-title class="white--text message-content" v-html='message.content'></v-list-tile-sub-title>
                
              </v-list-tile-content>
            </v-list-tile>
              <v-layout justify-center :key='"photo" + i' v-if='message.photos'>
                <img :src='getImgPath(message.photos[0].uri)' alt="Photo">
              </v-layout>
          </template>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title @click='messagesCount+=10'>Charger la suite</v-list-tile-title>
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
            @click="1"
          >
            <v-list-tile-avatar>
              <img :src="participant.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html='participant.name'></v-list-tile-title>
            </v-list-tile-content>

            <!-- <v-list-tile-action>
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action> -->
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
</template>

<script>
import loadConversationFromFile from '@/api/loadConversationFromFile'

 export default {
   data() {
     return {
       DEFAULT: {
         SENDER_NAME: 'utilisateur',
         AVATAR: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
       },
       filepath: "/",
       messagesOffset: 0,
       messagesCount: 50,
       conversation: {
         messages: [
           {
             content: 'Hello',
             sender_name: 'Ouss',
             timestamp: this.formatDate(1522318931),
             photos: [
             {
                "uri": "messages/402249d082/photos/29663503_1607356376022328_1935282435_n_1607356376022328.png"
             }
             ]
           },
           {
             content: 'Hello',
             sender_name: 'Not Ouss',
             timestamp: this.formatDate(1522318932)
           },
         ],
         participants: [{
           avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
         },
         {
           avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
         }]
       }
     }
   },
   methods: {
    getImgPath(uri) {
      return this.filepath + uri;
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
      * loads Participant objects to conversation data
      */
     loadConversation() {
       loadConversationFromFile((conv, filepath) => {
         if(conv == null) return;
         this.filepath = filepath

          this.conversation.messages = []
          conv.messages.forEach((message)=>{
            this.conversation.messages.push({
              content: message.content,
              sender_name: message.sender_name,
              timestamp: this.formatDate(message.timestamp),
              photos: message.photos
            })
          })
          this.conversation.participants = []
          conv.participants.forEach((name) => {
            this.conversation.participants.push({
              name,
              avatar: this.DEFAULT.AVATAR
            })
          })
          console.log(this.conversation)
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