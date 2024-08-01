const express=require('express')
const app=express()
const path=require('path')
const PORT=process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
const io=require('socket.io')(server)


app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', onConnected)
let socketsConnected = new Set()


function onConnected(socket) {
    console.log('New client connected', socket.id)
    socketsConnected.add(socket.id)
    io.emit('clients-total', socketsConnected.size)
    socket.on('disconnect',()=>{
        socketsConnected.delete(socket.id)
        io.emit("clients-total", socketsConnected.size);
    })
    socket.on("message", (data) => {
      socket.broadcast.emit("chat-message", data);
    });
}