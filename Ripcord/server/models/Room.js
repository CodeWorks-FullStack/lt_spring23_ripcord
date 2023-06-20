import { Schema } from "mongoose";

export const RoomsSchema = new Schema({
  title: {type: String, required: true, maxLength: 50},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
  channelId: {type: Schema.Types.ObjectId, required: true, ref: "Channel"}
}, { timestamps: true, toJSON: { virtuals: true }})

RoomsSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true
}),

RoomsSchema.virtual('channel', {
  localField: "channelId",
  foreignField: "_id",
  justOne: true,
  ref: "Channel"
})
