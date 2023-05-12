import express from 'express';
import cors from 'cors'
require('dotenv').config();
import router from './route/route';


const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.get('/',(req,res)=>{
  res.send('okay')
})

app.use('/', router)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});