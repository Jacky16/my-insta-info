import type { InstagramUser } from "./instagram-data.types";

export interface InstagramUserStore {
  followers: InstagramUser[];
  following: InstagramUser[];
}
