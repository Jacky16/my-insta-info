export type InstagramUser = {
  href: string;
  value: string;
  timestamp: number;
};

export type RawDataFollowers = {
  title: string;
  string_list_data: InstagramUser[];
};

export type RawDataFollowing = {
  relationships_following: RawDataFollowers[];
};

export const instagramFileNames = ["following.json", "followers_1.json"];
