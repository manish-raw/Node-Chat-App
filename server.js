import net from "node:net";

const server = net.createServer();

server.on("connection", (socket)=>{
    console.log("A new connection to server!");




    socket.on("data", (data)=>{
        console.log(data.toString("utf-8"));
    })
});


server.listen(3099, "127.0.0.1", ()=>{
    console.log("Server is running....", server.address());
});