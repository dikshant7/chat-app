const socket=io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");
//function which will append event info to the container
const append =(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    let message = document.getElementById("messageinp").value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    document.getElementById("messageinp").value='';

})
//ask new user for his/her name and let server know
const name=prompt("what is your name ");
socket.emit('new-user-joined',name);
//if new user join recieve its name from server
socket.on('user-joined',name=>{
 append(`${name} joined the chat`,'right');
})
//message is recieved
socket.on('receive',data=>{
 append(`${data.name}: ${data.message}`,'left');
})
//if users leaves the chat
socket.on('left',name=>{
    append(`${name} left the chat`,'right');
   })