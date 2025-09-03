const express=require('express')
require('dotenv').config();
const app=express();
const port=process.env.PORT;
const mongoose=require('mongoose');
const cors=require('cors');
const {Server} =require('socket.io')
const chat =require('./socket/chat')
const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB connected successfully");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
};
connectDB();


 app.use(cors())

app.use(express.json())
const server=app.listen(port,()=>{
    console.log(`server is running ${port}`)
})
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001', // allow Next.js frontend
    methods: ["GET", "POST"]
  }
});
chat(io);
module.exports.io = io;
const proposalRoutes=require('./routes/proposal')
const projectRoutes=require('./routes/project')
const userRoutes=require('./routes/user');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const searchRoutes = require('./routes/usersearch');
app.use('/api/message', messageRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/current', searchRoutes);
app.use('/api/proposals',proposalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/',(req,res)=>{
  res.send("hello")
})

