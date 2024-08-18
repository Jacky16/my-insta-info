import {
  type InstagramUser,
  type RawDataFollowers,
  type RawDataFollowing,
} from "@/types/instagram-data.types";

export const getInstagramUsersFromFile = async (
  file: File,
): Promise<InstagramUser[]> => {
  const rawData = await file.text();

  switch (file.name) {
    case "following.json":
      const rawFollowingUsersData = JSON.parse(rawData) as RawDataFollowing;

      return rawFollowingUsersData.relationships_following
        .map((rawUser) => rawUser.string_list_data[0])
        .flat();

    case "followers_1.json":
      const rawFollowersData = JSON.parse(rawData) as RawDataFollowers[];

      return rawFollowersData.map((rawUser) => rawUser.string_list_data[0]);

    default:
      return [];
  }
};
