const DEFAULT_USER_NAME = "User";

/**
 * @class
 * @classdesc A single Message from a user
 */
class Message {
  /**
   *
   * @param {Object} Msg
   * @param {string} Msg.content
   * @param {string} Msg.sender_name
   * @param {Number} Msg.timestamp_ms
   * @param {Object[]} Msg.photos
   */
  constructor({ content, sender_name, timestamp_ms, photos = undefined } = {}) {
    /** @type {string} content - Message text */
    this.content = content || "";

    /** @type {string} sender_name - Name of sender */
    this.sender_name = sender_name || DEFAULT_USER_NAME;

    /** @type {Number} timestamp - Timestamp of the message in ms */
    this.timestamp = timestamp_ms || Date.parse(new Date());

    /** @type {Object[]} [photos] - Array of photos attached to the file */
    this.photos = photos;
  }

  /**
   * Concat a given message to this one
   * @param {Object} message
   * @param {string} message.content
   * @param {Object[]} message.photos
   */
  concatMessage(message) {
    this.content += "\n" + (message.content || "");
    this.photos = this.photos ? this.photos.concat(message.photos) : message.photos;
  }
}

export default Message;
