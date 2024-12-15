import net from "node:net";
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const socket = net.createConnection({host: "127.0.0.1",port: 3099}, async ()=>{

    const message = await rl.question("type something > ")
    socket.write(message);
})