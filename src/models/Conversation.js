import DateFormatter from "@/utils/DateFormatter";
/**
 * @class
 * @classdesc A class representing a conversation loaded from a single file of the original data
 */
class Conversation {
  /**
   *
   * @param {Object} conv - conversation loaded from the original data
   * @param {string} conv.title - Title conversation from the original data
   * @param {Object[]} conv.participants - participants list from the original data
   * @param {Object[]} conv.messages - original messages array from the original data
   * @param {string} conv.filepath - absolute path of the loaded folder (containing .json file and media attachements)
   */
  constructor({ title, filepath, messages, participants }) {
    /** @type {string} avatar - Url of the conversation picture (usually the friend's avatar) */
    this.avatar = "";

    /** @type {string} title - Title of the conversation (usually the friend's or group name) */
    this.title = title;

    /** @type {string} filepath - Path of the folder with original conversation data */
    this.filepath = filepath;

    /** @type {string} preview - A short message preview of the conversation (usually last message) */
    this.preview = messages[0].content;

    /** @type {Timestamp} time - A timestamp (in ms) defined for the conversation (usually last message's timestap) */
    this.time = DateFormatter.formatDate(messages[0].timestamp_ms);

    /** @type {Object[]} messages - An array of messages */
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
  _setParticipants(participants) {
    this.participants = participants.map((participant) => {
      return {
        name: participant.name,
        avatar: participant.avatar, // || state.DEFAULT.AVATAR,
      };
    });

    this.avatar = this.participants[0].avatar; ///TODO
  }

  /**
   * Process the messages in 3 steps :
   * - Reverse the order so that the oldest appears first
   * - Concatenate successive messages sent by the same user
   * - create a Message Object for each message
   * @param {Object[]} messages - original messages array from the original data
   */
  _setMessages(messages) {
    // Reverse the conversation to start from the first
    let reversedMsg = messages.reverse();

    let prevMsg = null;

    for (let message of reversedMsg) {
      let newMessage = {};

      // if same sender_name, just concat
      if (prevMsg && message.sender_name == prevMsg.sender_name) {
        prevMsg.content += "\n" + (message.content || "");
        prevMsg.photos = prevMsg.photos ? prevMsg.photos.concat(message.photos) : message.photos;
      }
      // Else add a new message
      else {
        newMessage = {
          content: message.content || "",
          sender_name: message.sender_name || "User",
          timestamp: message.timestamp_ms,
          photos: message.photos,
        };
        this.addMessage(newMessage);
        prevMsg = newMessage;
      }
    }
  }

  /**
   * push a new message to the conversation's messages list
   * @param {Object} message
   */
  addMessage(message) {
    this.messages.push(message);
  }
}

export default Conversation;
