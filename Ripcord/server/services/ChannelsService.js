import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import {roomsService} from "../services/RoomsService"
import { socketProvider } from "../SocketProvider.js";

class ChannelsService{
  messageMods(channelId) {
    let mods = [...]
    socketProvider.messageUser(mods, )
  }

  async getAll() {
    let channels = await dbContext.Channels.find().populate("creator", 'name picture')
    return channels
  }

  // GET BY ID
  async getOne(channelId) {
    let channel = await dbContext.Channels.findById(channelId).populate("creator", 'name picture')
    if(channel == null) {
      throw new BadRequest('There is no channel with that Id.')
    }
    return channel
  }

  // CREATE
  async create(channelBody) {
    let channel = await dbContext.Channels.create(channelBody)
    await channel.populate("creator", 'name, picture')
    let roomData = {}
    roomData.channelId = channel.id
    roomData.creatorId = channelBody.creatorId
    roomData.title = `Welcome to ${channel.name}`
    await roomsService.create(roomData)
    return channel
  }

  // EDIT
  async edit(channelBody) {
    let originalChannel = await this.getOne(channelBody.id)
    if(channelBody.creatorId != originalChannel.creatorId) {
      throw new Forbidden('Sorry, something went wrong.')
    }
    originalChannel.name = channelBody.name || originalChannel.name,
    originalChannel.description = channelBody.description || originalChannel.description,
    originalChannel.img = channelBody.img || originalChannel.img
    await originalChannel.save();
    return originalChannel
  }

  // DELETE
  async delete(channelId, creatorId) {
    let channel = await this.getOne(channelId)
    if(channel.creatorId != creatorId) {
      throw new Forbidden('Sorry, something went wrong...')
    }
    await channel.remove()
    return `Channel: ${channel.name} has been successfully removed.`
  }


  // SECTION MESSAGES
  async getMessages(channelId) {
    let messages = await dbContext.Messages.find({channelId})
    .populate("creator", 'name picture')
    return messages
  }

  // SECTION ROOMS

  async getRooms(channelId) {
   let rooms = await dbContext.Rooms.find({channelId}).populate("creator", 'name picture').populate("channel", 'name description creatorId')
   return rooms
  }

}

export const channelsService = new ChannelsService()
