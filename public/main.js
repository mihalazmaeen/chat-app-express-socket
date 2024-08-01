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
    if(messageInput.value === ''){
        	return
    }
    const data={
        name:nameInput.value,
        message:messageInput.value,
        dateTime:new Date()
    }
    socket.emit('message',data)
    addMessageToUI(true,data)
}

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`
})

socket.on('chat-message',(data)=>{
    console.log(data);
    addMessageToUI(false,data)
})
function addMessageToUI(isOwnMessage,data){
    const element = `<li class="${
      isOwnMessage ? "message-right" : "message-left"
    }">
          <p class="message">
            ${data.message}
            <span>${data.name} - ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>`;
        messageContainer.innerHTML += element
        scrollToBottom()
}

function scrollToBottom(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}