const dotenv = require('dotenv')
dotenv.config({ path: '../.env' });
const mongoose = require("mongoose");

const chalk = require("chalk");
const success = (message) => console.log(`   ${chalk.green("✓")} ${message}`);
const error = (message, howToFix) => console.log(`   ${chalk.red("✗")} ${message}${howToFix ? ` : ${howToFix}` : ""}`);
const ignore = (message) => console.log(`   ${chalk.yellow("~")} ${message}`);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const exec = require('child_process').exec

const checks = [
	() => {
		console.log("\n\nEnvironnement..");
		return new Promise((res) => {
			if(parseInt(process.version.split(".")[0].split("v")[1]) >= 16){
				success("Node.js version IS equal to or higher than v16!");
			} else {
				error("Node.js version should be equal to or higher than v16!");
				process.exit(1);
			}
			res();
		});
	},
	() => {
		console.log("\n\nDiscord Bot..");
		return new Promise((res) => {
			const { Client, Intents } = require('discord.js');
			const client = new Client({
				intents: [
						Intents.FLAGS.GUILDS,
						Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
						Intents.FLAGS.GUILD_BANS,
						Intents.FLAGS.GUILD_INTEGRATIONS,
						Intents.FLAGS.GUILD_INVITES,
						Intents.FLAGS.GUILD_MESSAGES,
						Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
						Intents.FLAGS.GUILD_MEMBERS
				] });
			let readyResolve;
			new Promise((resolve) => readyResolve = resolve);
			client.login(process.env.TOKEN).then(async () => {
				success("Is a valid bot token");
				await readyResolve();
				if(!client.guilds.cache.has("795012392240021515")){
					error("Bot needs be added to the emojis server", "please contact Codeize#4140 to get the bot added to the emoji server.");
				} else {
					success("Is in the emojis server");
				}
				res();
			}).catch(() => {
				error("Is NOT a valid bot token", "Make sure you grabbed the correct token (https://discord.dev), if all else fails regenerate the token, **let the team know if you regenerate a token for any of the bots immediately!**");
				res();
				process.exit(1);
			});
			client.on("ready", readyResolve);
		});
	},
	() => {
		console.log("\n\nMongoDB..");
		return new Promise((res) => {
			mongoose.connect(process.env.MONGO_URI, {
				useUnifiedTopology: true
			}).then(async () => {
				success("Is connected to the Mongo database");
				res();
			}).catch(() => {
				error("Is NOT a valid MongoDB URI", "This is most likely due to the fact you left a \"< or >\" in the URI, or that it's just.. wrong..");
				res();
				process.exit(1);
			});
		});
	}
];

(async () => {
	console.log(chalk.yellow("This script will check if your config is configured (heh pun intended) correctly, and some other important things such as whether the database is connected, if you're using a valid token etc..."));
	for(const check of checks){
		await check();
	}
	console.log(chalk.yellow("\n\nThank you for developing Tentro. If you need more help, contact the core devs."));
	console.log(chalk.blue("\n\nIf you got to this point, grats, no errors were detected by the system. We now advise you to run `node .` to start the bot"));
})();