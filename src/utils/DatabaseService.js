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
  columns: [
    {
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    {
      name: "time",
      notNull: true,
      dataType: DATA_TYPE.String,
    },
    {
      name: "preview",
      dataType: DATA_TYPE.String,
      default: "",
    },
    {
      name: "filepath",
      notNull: true,
      dataType: DATA_TYPE.String,
    },
  ],
};

const userConversationTableSchema = {
  name: "userConversation",
  columns: [
    {
      name: "id_user",
      dataType: DATA_TYPE.Number,
    },
    {
      name: "id_conversation",
      dataType: DATA_TYPE.Number,
    },
  ],
};

const usersTableSchema = {
  name: "users",
  columns: [
    {
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    {
      name: "avatar",
      notNull: true,
      dataType: DATA_TYPE.String,
    },
    {
      name: "name",
      notNull: true,
      dataType: DATA_TYPE.String,
    },
  ],
};

const DB_NAME = "memory_messenger_db";

const DB_SCHEMA = {
  name: DB_NAME,
  tables: [conversationsTableSchema, usersTableSchema, userConversationTableSchema],
};

/**
 * @class
 * @classdesc A service to handle IndexedDB database queries
 */
class DatabaseService {
  constructor(db_schema = DB_SCHEMA) {
    this.connection = new JsStore.Instance(new Worker(workerPath));
    this.initiated = false;
    this.db_schema = db_schema;
  }

  async connect() {
    console.log(this.connection);

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
}

export default DatabaseService;
