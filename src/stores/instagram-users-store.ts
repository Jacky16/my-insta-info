import type { InstagramUser } from "@/types/instagram-data.types";
import type { InstagramUserStore } from "@/types/instagram-users.store.types";
import { map } from "nanostores";

export const $instagramUsers = map<InstagramUserStore>({
  followers: [],
  following: [],
});

export const loadFollowingUsers = (users: InstagramUser[]) => {
  $instagramUsers.set({
    ...$instagramUsers.get(),
    following: [...users],
  });
};

export const loadFollowersUsers = (users: InstagramUser[]) => {
  $instagramUsers.set({
    ...$instagramUsers.get(),
    followers: [...users],
  });
};

export const removeFollowersUsers = () => {
  $instagramUsers.set({
    ...$instagramUsers.get(),
    followers: [],
  });
};

export const removeFollowingUsers = () => {
  $instagramUsers.set({
    ...$instagramUsers.get(),
    following: [],
  });
};
