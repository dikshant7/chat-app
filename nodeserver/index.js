
//node server which will handle socket io connections
const io=require('socket.io')(process.env.PORT|| 8000)


const  users={};

io.on('connection',Socket=>{
    //if any new user join
    Socket.on('new-user-joined',name=>{
        users[Socket.id]=name;
        Socket.broadcast.emit('user-joined',name)
    });
    // if someone sends a message
    Socket.on('send',message=>{
        Socket.broadcast.emit('receive',{message:message,name:users[Socket.id]})
    });
    //if someones leaves the chat 
    //disconnect is builtin
    Socket.on('disconnect',message=>{
        Socket.broadcast.emit('left',users[Socket.id]);
        delete users[Socket.id];
    });
})