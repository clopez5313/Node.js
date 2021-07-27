var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.Promise = Promise

var dburl = 'mongodb+srv://<user>:<password>@cluster0.nse3d.mongodb.net/DBName?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', async (req, res) => {

    try {
        throw 'some error'

        var message = new Message(req.body)
        var savedMessage = await message.save()
        console.log('saved')
        var censored = await Message.findOne({message: 'badword'})

        if(censored)
            await Message.remove({_id: censored.id})

        else
            io.emit('message', req.body)

        res.sendStatus(200)
    }

    catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
})

io.on('connection', (socket) => {
    console.log('A user connected.')
})

mongoose.connect(dburl, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
})
