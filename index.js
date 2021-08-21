const express = require("express")
const app = express() //Se creaa la aplicacion

app.use(express.json())
let notes = [
    {
        "id":1,
        "content": "I wish you the best",
        "date": "2021-08-10T11:37:40.0982",
        "important": true
    },
    {
        "id":2,
        "content": "The shining moon on the sky",
        "date": "2021-08-10T12:37:40.0982",
        "important": false
    },
    {
        "id":3,
        "content": "Never give up",
        "date": "2021-08-10T13:37:40.0982",
        "important": true
    }

]


// const app = http.createServer((request, response) => {
//     response.writeHead(200,{'Content-Type':'application/json'})
//     response.end (JSON.stringify(notes))
// })

app.get('/',(request,response) =>{
   response.send('<h1>Hello Word </h1>')
})

app.get('/api/notes',(request,response) =>{
   response.json(notes)
})

app.get('/api/notes/:id',(request,response) =>{
   const id = Number(request.params.id)
   //console.log({id})
   const note = notes.find(note => note.id ===id)

   if (note){
   response.json(note)
} else{
   response.status(404).end()
}
})

app.delete('/api/notes/:id',(request,response) =>{
   const id = Number(request.params.id)
   notes = notes.filter(note => note.id !== id)
   response.status (204).end()
})

app.post ('/api/notes',(request,response) =>{
   const note = request.body
   //console.log (note)

   if (!note || !note.content){
       return response.status(400).json({
           error : 'note.content is missing'
       })
   }
   
   const ids = notes.map (note =>note.id)
   const maxid = Math.max(...ids)


   const newNote = {
       id: maxid + 1,
       content : note.content,
       important: typeof note.important !== 'undefined' ?note.important : false,
       date : new Date().toISOString()
   }
   notes = [...notes,newNote]

   response.status(201).json (newNote)
})

const PORT = 3001
app.listen(PORT,()=>{
console.log (`Server running on port ${PORT}`)
})