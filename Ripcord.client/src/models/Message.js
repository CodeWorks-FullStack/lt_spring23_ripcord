import { Profile } from "./Profile";

export class Message {
  constructor(data) {
    this.id = data.id;
    this.body = data.body;
    this.img = data.img;
    this.createdAt = data.createdAt;
    this.Creator = new Profile(data.creator);
  }
}
