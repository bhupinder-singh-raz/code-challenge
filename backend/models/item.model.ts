import mongoose, { Schema } from "mongoose";

export type itemType = { 
  name: string;
  description?: string;
  status: "New" | "Complete" |  "In Progress";
};


const ITEM_MONGOOSE_SCHEMA = new Schema<itemType>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["New", "Complete", "In Progress"]
    }
  },
  {
    versionKey: false,
    timestamps: true
  },
);

const MONGOOSE_MODEL_NAME = "Item";
const MONGODB_COLLECTION_NAME = "Items";


/* Index */
ITEM_MONGOOSE_SCHEMA.index(
  {
    name: 1,
    status: 1
  },
);


const ItemModel = mongoose.model<itemType>(
  MONGOOSE_MODEL_NAME,
  ITEM_MONGOOSE_SCHEMA,
  MONGODB_COLLECTION_NAME
);

export default ItemModel;
