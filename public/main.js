const socket = io()
const clientsTotal=document.getElementById('clients-total')

const messageCounter = document.getElementById('message-counter')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const feedback = document.getElementById('feedback')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})
function sendMessage(){
    console.log(messageInput.value)
    const data={
        name:nameInput.value,
        message:messageInput.value,
        dateTime:new Date()
    }
    socket.emit('message',data)
}

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`
})

socket.on('chat-message',(data)=>{
    console.log(data);
})