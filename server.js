import net from "node:net";

const server = net.createServer();

const clients = [];

server.on("connection", (socket)=>{

    console.log("A new connection to server!");
    socket.on("data", (data)=>{
        //writing data in each socket
        clients.map((s)=>{
            s.write(data);
        })
    });
    //For sending msg to every client
    clients.push(socket);

});

server.listen(3099, "127.0.0.1", ()=>{
    console.log("Server is running....", server.address());
});