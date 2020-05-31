import * as JsStore from "jsstore";
import { DATA_TYPE } from "jsstore";

const getWorkerPath = () => {
  // return dev build when env is development
  if (process.env.NODE_ENV === "development") {
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
  } else {
    // return prod build when env is production
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
  }
};

const workerPath = getWorkerPath();

const conversationsTableSchema = {
  name: "conversations",
  columns: {
    uid: {
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      dataType: DATA_TYPE.String,
    },
    title: {
      dataType: DATA_TYPE.String,
      default: "",
    },
    time: {
      dataType: DATA_TYPE.String,
    },
    preview: {
      dataType: DATA_TYPE.String,
      default: "",
    },
    filepath: {
      dataType: DATA_TYPE.String,
    },
  },
};

const userConversationTableSchema = {
  name: "userConversation",
  columns: {
    id_user: {
      dataType: DATA_TYPE.Number,
    },
    id_conversation: {
      dataType: DATA_TYPE.Number,
    },
  },
};

const usersTableSchema = {
  name: "users",
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    avatar: {
      notNull: true,
      dataType: DATA_TYPE.String,
    },
    name: {
      notNull: true,
      dataType: DATA_TYPE.String,
    },
  },
};

const DB_NAME = "memory_db";

const DB_SCHEMA = {
  name: DB_NAME,
  tables: [conversationsTableSchema, userConversationTableSchema, usersTableSchema],
};

let instance = null;
/**
 * @class
 * @classdesc A service to handle IndexedDB database queries
 */
class DatabaseService {
  constructor(db_schema = DB_SCHEMA) {
    if (!instance) {
      instance = this;
      this.connection = new JsStore.Connection(new Worker(workerPath));
      this.initiated = false;
      this.db_schema = db_schema;
    }

    return instance;
  }

  async connect() {
    try {
      const isDbCreated = await this.connection.initDb(this.db_schema);
      if (isDbCreated === true) {
        console.log("db created");
      } else {
        console.log("db opened");
      }
      this.initiated = true;
    } catch (ex) {
      console.error(ex);
    }
  }

  async insertConversation(conversation) {
    try {
      return await this.connection.insert({
        into: conversationsTableSchema.name,
        values: [
          {
            id: conversation.id,
            title: conversation.title,
            time: conversation.time,
            preview: conversation.preview,
            filepath: conversation.filepath,
          },
        ],
      });
    } catch (ex) {
      console.error("Inserting ", ex);
    }
  }

  async selectConversations() {
    return await this.connection.select({
      from: conversationsTableSchema.name,
    });
  }
}

export default DatabaseService;
