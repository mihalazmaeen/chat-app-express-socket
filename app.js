const express=require('express')
const app=express()
const path=require('path')
const PORT=process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')))