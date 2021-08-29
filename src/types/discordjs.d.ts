import {Client, Collection, CommandInteractionOptionResolver, MessagePayload, ReplyMessageOptions,} from "discord.js";

import {Command} from "./command";
import {IConfig} from "../../config";

declare module "discord.js" {
  export interface Client {
    /* VARIABLES */
    prefix: string;
    commands: Collection<string, Command>;
    // settings: Collection<string, ISettings>;
    aliases: Collection<string, string>;
    config: IConfig;

    /* FUNCTIONS */
    log(type: string, msg: any, title?: string): void;

    loadCommand(
      category: string,
      commandName: string,
      dontLog: boolean
    ): { err: string; res?: undefined } | { res: boolean; err?: undefined };
  }

  export interface Base {
    client: Client;
  }

  export interface Interaction {
    reply: (options: string | MessagePayload | ReplyMessageOptions) => Promise<void>;
    options: CommandInteractionOptionResolver;
  }
}
