import express from 'express';
const app = express();
import urlRoutes from './routes/url.js';
import dbConnection from './dbConnection.js';

dbConnection().then(()=>console.log('Database Connected')).catch(err=>console.log(err))

app.use(express.json());

app.use('/', urlRoutes);

app.listen(8000, ()=>{
    console.log('Server started at port 8000');
})