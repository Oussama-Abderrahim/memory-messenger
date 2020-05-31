import DateFormatter from "@/utils/DateFormatter";
import Message from "@/models/Message";

/**
 * @class
 * @classdesc A class representing a conversation loaded from a single file of the original data
 */
class Conversation {
  /**
   *
   * @param {Object} conv - conversation loaded from the original data
   * @param {string} conv.title - Title conversation from the original data
   * @param {string} conv.thread_path - Thread path will be considered as an ID
   * @param {Object[]} conv.participants - participants list from the original data
   * @param {Object[]} conv.messages - original messages array from the original data
   * @param {string} conv.filepath - absolute path of the loaded folder (containing .json file and media attachements)
   */
  constructor({ title = "", filepath = ".", thread_path = "", messages = [], participants = [] } = {}) {
    /** @type {string} avatar - Url of the conversation picture (usually the friend's avatar) */
    this.avatar = "";

    /** @type {string} id - A unique id to identify this conversation from file path */
    this.id = thread_path;

    /** @type {string} title - Title of the conversation (usually the friend's or group name) */
    this.title = title;

    /** @type {string} filepath - Path of the folder with original conversation data */
    this.filepath = filepath;

    /** @type {string} preview - A short message preview of the conversation (usually last message) */
    this.preview = messages.length ? messages[0].content : "";

    /** @type {Timestamp} time - A timestamp (in ms) defined for the conversation (usually last message's timestap) */
    this.time = messages.length ? DateFormatter.formatDate(messages[0].timestamp_ms) : Date.parse(new Date());

    /** @type {Message[]} messages - An array of messages */
    this.messages = [];

    /** @type {Object[]} participant - An array of participants */
    this.participants = [];

    this._setParticipants(participants);
    this._setMessages(messages);
  }

  /**
   * Load the participants list into the Object
   * take the name and the avatar of the participants
   * If the avatar is not found, assign the default
   * @param {Object[]} participants participants list from the original data
   */
  _setParticipants(participants = []) {
    if (!participants.length) return;

    this.participants = participants.map((participant) => {
      return {
        name: participant.name,
        avatar: participant.avatar, // || state.DEFAULT.AVATAR,
      };
    });

    this.avatar = this.participants[0].avatar; ///TODO
  }

  /**
   * Return a list of conversation photos with their indexes
   */
  get photos() {
    if (!this.conversationPhotos) {
      this.conversationPhotos = this.messages
        .map((message, i) => {
          if (message.photos) {
            return {
              index: i,
              src: this.filepath + message.photos[0].uri,
            };
          }
          return null;
        })
        .filter((m) => m != null);
    }

    return this.conversationPhotos;
  }

  /**
   * Process the messages in 3 steps :
   * - Reverse the order so that the oldest appears first
   * - Concatenate successive messages sent by the same user
   * - create a Message Object for each message
   * @param {Object[]} messages - original messages array from the original data
   */
  _setMessages(messages) {
    if (!messages) return;

    // Reverse the conversation to start from the first
    let reversedMsg = messages.reverse();

    let prevMsg = null;

    for (let message of reversedMsg) {
      // if same sender_name, just concat
      if (prevMsg && message.sender_name == prevMsg.sender_name) {
        prevMsg.concatMessage(message);
      } else {
        const newMessage = new Message(message);
        this.addMessage(newMessage);
        prevMsg = newMessage;
      }
    }
  }

  /**
   * push a new message to the conversation's messages list
   * @param {Message} message
   */
  addMessage(message) {
    this.messages.push(message);
  }
}

export default Conversation;
