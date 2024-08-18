import type { InstagramUser } from "@/types/instagram-data.types";

export const checkFollowersIsFollowing = (
  followers: InstagramUser[],
  following: InstagramUser[],
) => {
  const newFollowers = following.filter((user) => {
    return !followers.some((follower) => follower.value === user.value);
  });

  return newFollowers;
};
