const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io')

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// app.get('/', (req, res) => {
//     res.send("app working");
// });

app.get('/', (req, res) => {    
    res.render('index')
})

//Get username and roomname from form and pass it to room
app.post('/room', (req, res) => {
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

//Rooms
app.get('/room', (req, res)=>{
    res.render('room')
})
// app.use('/api', routes);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`server started on Port ${process.env.PORT}`);
})

const io = socket(server);
require('./utils/socket')(io);
