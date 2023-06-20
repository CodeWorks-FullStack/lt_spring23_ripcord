import { Profile } from "./Profile";

export class Channel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.img =
      data.img ||
      "https://external-preview.redd.it/ZuElAifUXkduBrTSwRcwzZaLWRTTyd_EVma3pCKf8WI.jpg?auto=webp&s=ecc5612ca31cec7311eb12158622950fa6f44a9a";
    this.creatorId = data.creatorId;
    if (data.creator) {
      this.Profile = new Profile(data.creator);
    }
  }
}
