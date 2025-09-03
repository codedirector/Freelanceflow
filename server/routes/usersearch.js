const express =require('express');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const authMiddleware = require('../middleware/auth');
const router= express.Router();

// router.get('/search',async(req,res)=>{
//     const search=req.query.search||'';
//     const userid=req.user._id;

//     const user=await User.findOne()
// // })
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const userid = req.user.id;

//     const conversation = await Conversation.find({
//       people: userid
//     }).sort({ updatedAt: -1 });

//     if (!conversation || conversation.length === 0) {
//       return res.status(200).send([]);
//     }

//     // Get the "other" user(s) from each conversation
//     const otherUserIds = conversation
//       .map(conv => conv.people.find(p => p.toString() !== userid.toString()))
//       .filter(Boolean); // remove any undefined/null

//     const users = await User.find({ _id: { $in: otherUserIds } }).select('_id name');
//     const usersById = Object.fromEntries(users.map(u => [u._id.toString(), u]));

//     const list = conversation.map(conv => {
//       const otherUserId = conv.people.find(p => p.toString() !== userid.toString());
//       return usersById[otherUserId?.toString()];
//     });

//     // console.log(list);
//     return res.status(200).send(list);
//   } catch (err) {
//     console.error("error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userid = req.user.id;

    const conversations = await Conversation.find({
      people: userid
    }).sort({ updatedAt: -1 });

    if (!conversations || conversations.length === 0) {
      return res.status(200).send([]);
    }

    const otherUserIds = conversations
      .map(conv => conv.people.find(p => p.toString() !== userid.toString()))
      .filter(Boolean);

    const users = await User.find({ _id: { $in: otherUserIds } }).select('_id name');
    const usersById = Object.fromEntries(users.map(u => [u._id.toString(), u]));

    const list = conversations.map(conv => {
      const otherUserId = conv.people.find(p => p.toString() !== userid.toString());
      const otherUser = usersById[otherUserId?.toString()];
      return {
        user: otherUser,
        projectId: conv.project
      };
    });

    return res.status(200).send(list);
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports=router;