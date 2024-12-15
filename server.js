import net from "node:net";

const server = net.createServer();

const clients = [];

server.on("connection", (socket)=>{

    console.log("A new connection to server!");

    const clientId = clients.length + 1;
    socket.write(`id-${clientId}`);

    socket.on("data", (data)=>{
        const dataString = data.toString("utf-8");
        const id = dataString.substring(0, dataString.indexOf("-"));
        const message = dataString.substring(dataString.indexOf("-message-") + 9);
        //writing data in each socket
        clients.map((client)=>{
            client.socket.write(`> User ${id}: ${message}`);
        })
    });
    //For sending msg to every client
    clients.push({id: clientId.toString(), socket});

});

server.listen(3099, "127.0.0.1", ()=>{
    console.log("Server is running....", server.address());
});