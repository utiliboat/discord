<p align="center">
  <img src="https://img.c2g.space/f/rQYBJSlN.png">
  <br>
  <a href="https://github.com/utiliboat/discord/blob/master/LICENSE"><img src="https://img.shields.io/github/license/utiliboat/discord.svg"></a>
  <a href="https://david-dm.org/utiliboat/discord"><img src="https://img.shields.io/david/utiliboat/discord.svg"></a>
</p>
<h1 align="center">utiliboat-discord</h1>
<p align="center">Multi-purpose Discord bot, built thinking in modularity and ease of use</p>
<br><br><br>
<h2>How do I add it to my Discord server?</h1>
<p>You can add Utiliboat to your Discord server by clicking <a href="https://discordapp.com/oauth2/authorize?client_id=490952235027529739&scope=bot&permissions=2145908991">here</a>.<br>
You do need to have the <b>Manage Server</b> permission on the server you're going to add Utiliboat.</p>
<br><br><br>
<h2>How can I contribute to Utiliboat's development?</h1>
<p>You can contribute in several ways:<br>
• by opening a <a href="https://github.com/utiliboat/discord/pulls">pull request</a> <i>(make sure to follow <a href="">standard.js</a> rules)</i><br>
• by <a href="https://github.com/utiliboat/discord/issues">reporting issues</a><br>
• by <a href="https://ko-fi.com/pillgp">buying developers a coffee</a> <i>($3 each)</i></p>
<br><br><br>
<h2>How can I selfhost Utiliboat?</h1>
<p>I don't recommend that you selfhost Utiliboat, as it's very work in progress, and there are mainly some functions that are proprietary. 
While I don't recommend selfhosting it yourself, <b>I also don't take any responsibility for what happens within the process of running the bot itself</b>.</p>
<br>
> For this guide, we're assuming that you already have npm, Node.js and Windows Build Tools installed.

**0. Fork the repository** (You don't have to do this if you're part of our organization)


**1. Clone your fork**
```bash
git clone https://github.com/<your username>/discord utiliboat-discord
cd utiliboat-discord
```

**2. Install all the dependencies with npm**
```bash
npm install
```

**3. Create a file named `auth.js` inside of the bot's folder and add all of the [required authentication variables](https://github.com/utiliboat/discord/blob/master/auth.js.example) to it.**

In the end, your file should look like this:
```js
module.exports = {
  // Discord Token, you can get one at https://discordapp.com/developers/applications/
  DISCORD_TOKEN: 'totally-real-discord-token-here',

  // List of users that'll have bot owner permissions
  OWNER: '216901800899510272',

  // Bot prefix
  PREFIX: 'u!'
}
```

**4. Run the bot!**
```
npm start
```

Happy hacking!
