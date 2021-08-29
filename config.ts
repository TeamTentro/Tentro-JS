import {User} from "discord.js";

const isOwner = (user: User): boolean => {
  return ["403668506287144981", "188988455554908160"].includes(user.id);
};

export interface IConfig {
  isOwner: (user: User) => boolean;
}

export const config: IConfig = {
  isOwner,
};
