import net from "node:net";
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const clearLine = (dir) => {
    return new Promise((resolve, reject) =>{
        process.stdout.clearLine(dir, ()=>{
            resolve();
        });
    });
};

const moveCursor = (dx, dy) =>{
    return new Promise((resolve, reject)=>{
        process.stdout.moveCursor(dx, dy, ()=>{
            resolve();
        });
    });
};

let id;

const socket = net.createConnection({host: "127.0.0.1",port: 3099}, async ()=>{

    const ask = async () => {
        const message = await rl.question("type something > ");
        await moveCursor(0, -1);
        await clearLine(0);
        //below command will wait for the above line to respond back
        socket.write(`${id}-message-${message}`);
    };

    ask();

    socket.on("data",async (data) => {
        console.log();
        await moveCursor(0, -1);
        await clearLine(0);

        if(data.toString("utf-8").substring(0,2) === "id"){
            id = data.toString("utf-8").substring(3);
            console.log(`Your id is ${id}!\n`);
        }else{
            console.log(data.toString("utf-8"));
        }
        ask();
    });

});



socket.on("end", ()=>{
    console.log("Connection was ended!");
});