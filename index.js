import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

const token = "8833974326:AAGT8CYo9qxs1BC65YrOYs1CfH-oz4Dci5k";

const bot = new TelegramBot(token, { polling: true });

// Start command
bot.onText(/\/start/, (msg) => {

    const chatId = msg.chat.id;

    bot.sendMessage(chatId,
        "👋 Welcome!\n\nNumber check karne ke liye button press karo:",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "📱 Check Number", callback_data: "check" }
                    ]
                ]
            }
        }
    );
});

// Button click handler
bot.on("callback_query", async (callbackQuery) => {

    const chatId = callbackQuery.message.chat.id;

    if (callbackQuery.data === "check") {

        bot.sendMessage(chatId, "📩 Send me 10 digit number");

    }
});

// User message handler
bot.on("message", async (msg) => {

    const chatId = msg.chat.id;
    const text = msg.text;

    // ignore command
    if (text.startsWith("/")) return;

    // validation
    if (!/^\d{10}$/.test(text)) {
        return bot.sendMessage(chatId, "❌ Invalid number (10 digit required)");
    }

    const url = "https://exploitsindia.site/track/live.php?term=" + text;

    try {

        const res = await fetch(url);
        const data = await res.text();

        bot.sendMessage(chatId, "✅ Result:\n\n" + data);

    } catch (err) {
        bot.sendMessage(chatId, "❌ Error fetching data");
    }
});
