import express from "express";
import TelegramBot from "node-telegram-bot-api";

const app = express();
const PORT = process.env.PORT || 3000;

// 🌐 Web server (Render ke liye MUST)
app.get("/", (req, res) => {
    res.send("Bot is running");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

// 🤖 Telegram Bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {

    const chatId = msg.chat.id;
    const number = msg.text;

    // validation
    if (!/^\d{10}$/.test(number)) {
        return bot.sendMessage(chatId, "❌ Invalid number (10 digit required)");
    }

    const url = "https://exploitsindia.site/track/live.php?term=" + number;

    try {

        const res = await fetch(url);
        const data = await res.text();

        bot.sendMessage(chatId, "✅ Result:\n\n" + data);

    } catch (err) {

        bot.sendMessage(chatId, "❌ Error fetching data");
    }
});
