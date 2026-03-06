const { fork } = require('child_process');
const chalk = require('chalk');

async function start() {
    const child = fork('./main.js');
    
    child.on("message", msg => {
        console.log('child to parent =>', msg);
    });

    child.on("close", (anu) => {
        console.log(chalk.black(chalk.bgRed(`Bot is auto restarting..`)));
        start();
    });

    child.on("exit", (anu2) => {
    });

    // --- NEW ANTI-SLEEP FIX ---
    // Forcefully kill and restart the process every 1 hours 
    // to refresh the silent WhatsApp WebSocket drop.
    setTimeout(() => {
        console.log(chalk.yellow("Scheduled restart: Refreshing WhatsApp connection to prevent silent sleep..."));
        child.kill(); 
    }, 1 * 60 * 60 * 1000); // 1 hours in milliseconds
}

start();
