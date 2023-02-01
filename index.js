import express from 'express';
import cors from 'cors'
import routes from './src/routes/index.js';

const PORT = 3000

const server = express();

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})