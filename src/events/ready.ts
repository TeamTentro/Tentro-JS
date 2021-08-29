import {Client} from "discord.js";
// import {REST} from "@discordjs/rest";
// import {Routes} from "discord-api-types/v9";

export default async (client: Client): Promise<void> => {
  client.log(
    `READY`,
    `${client.user?.username} READY!`
  );
  //
  // const rest = new REST({ version: "9" }).setToken(process.env.token || "");
  //
  // try {
  //   client.log("SLASH", "Started refreshing application (/) commands.");
  //
  //   await rest.put(Routes.applicationCommands(client.user?.id || "0"), {
  //     body: SlashCommandExporter,
  //   });
  //   client.log("SLASH", "Successfully reloaded application (/) commands.");
  // } catch (error) {
  //   console.error(error);
  // }
};
