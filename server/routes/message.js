const express=require('express');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { onlineUsers } = require('../socket/chat');
const { io } = require('../index.js'); // Import the io instance
const router=express.Router()
router.post('/make',async(req,res)=>{
      try{ 
         // console.log(req.body);
         const {receiverid,senderid,projectid}=req.body;

      const chat= new Conversation({people:[senderid,receiverid],project:projectid})
      await chat.save();
   res.status(200).json({message:"chat created"})
}
   catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})
router.post('/send',async(req,res)=>{
   try{
      // console.log(req.body);
const { message,  senderId, receiverId, projectId } = req.body;


 
   let chat=await Conversation.findOne({
    people: {$all:[senderId,receiverId]},
   project:projectId   })
    
 
    const newMessage = new Message({
       senderId,
      receiverId,
      message:message,
      Conversationid:chat._id
   })
   if(newMessage)
   {
      chat.message.push(newMessage._id)
   }
   await Promise.all([chat.save(),newMessage.save()])
   const reciverSocketId = onlineUsers.get(receiverId);
     if(reciverSocketId){
        io.to(reciverSocketId).emit("newMessage",newMessage)
     }
   res.status(200).send(newMessage)
}
   catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})



router.get('/:id',async(req,res)=>{
   try{
      const receiverid=req.params.id;
   const  {senderid}=req.user._id;
   let chat=await Conversation.findOne({
    people: {$all:[senderid,receiverid]}   }).populate('message')
    if(!chat){
res.status(200).send([])    }
      console.log(chat);
    const Message = chat.message;
   res.status(200).send(Message)
}
   catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})
 

module.exports=router;