import { Channel } from "./Channel";
import { Profile } from "./Profile";

export class User {
  constructor(data) {
    this.id = data.id;
    this.Profile = new Profile(data.creator);
    this.Channel = new Channel(data.channel);
  }
}
