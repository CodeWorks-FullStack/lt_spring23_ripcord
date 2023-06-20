import { Schema } from "mongoose";

export const ChannelSchema = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 55},
  description: {type: String, required: true, minLength: 3, maxLength: 550},
  img: {type: String, maxLength: 1000},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"}
}, { timestamps: true, toJSON: { virtuals: true }})


ChannelSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true
})
