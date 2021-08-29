import {Client, Message,} from "discord.js";
//
// export interface CommandData {
//   name: string;
//   author: User;
//   member: GuildMember | APIInteractionGuildMember | null;
//   guild: Guild | null;
//   channel: TextBasedChannels | null;
//   values:
//     {
//       name: string;
//       value: string | number | boolean | undefined;
//     }[];
//   raw: Message | Interaction | undefined;
// }

export interface Command {
  config: {
    information: {
      name: string;
      description: string;
      category?: string;
    };
    aliases: string[];
    // neededValues: [{ valueName: string, index: number | 0, joinTogether: boolean | false}];
  };
  run: (client: Client, message: Message, args: string[]) => Promise<any>;
  init?: (client: Client) => any;
}
