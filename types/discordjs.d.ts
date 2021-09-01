import {Client, Message} from "discord.js";
declare module "discord.js" {


    export interface Command {
        name: string
        aliases: string[]
        category: string
        description: string
        usage: string
        permissions: string
        exec: (client: Client, message: Message, args: string[]) => void
    }
}
