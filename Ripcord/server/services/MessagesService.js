import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class MessagesService{
  async getOne(messageId) {
    let message = await dbContext.Messages.findById(messageId).populate("creator", 'name picture')
    if(message == null) {
      throw new BadRequest('Sorry, that message does not exist.')
    }
    return message
  }
  async create(messageBody) {
    let message = await dbContext.Messages.create(messageBody)
    await message.populate("creator", 'name picture')
    await message.populate('channel')
    return message
  }
  async edit(messageBody) {
    let originalMessage = await this.getOne(messageBody.id)
    if(originalMessage.creatorId != messageBody.creatorId) {
      throw new Forbidden('Sorry, you do not have permission to do that.')
    }
    originalMessage.body = messageBody.body || originalMessage.body
    originalMessage.img = messageBody.img || originalMessage.img

    await originalMessage.save()
    return originalMessage
  }
  async delete(messageId, userId) {
    let message = await this.getOne(messageId)
    if(message.creatorId != userId) {
      throw new Forbidden('Sorry, you do not have permission to do that.')
    }
    await message.remove()
    return 'You have successfully deleted your message.'
  }

}

export const messagesService = new MessagesService()
