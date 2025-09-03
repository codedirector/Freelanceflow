const express = require("express");
const Proposal = require("../models/Proposal");
const rolemiddlware=require("../middleware/role")
const freeMiddleware =require("../middleware/free")
// const Authmiddleware =require('../middleware/auth')
const router = express.Router();
const Project=require("../models/Project")
router.post("/", async (req, res) => {
  try {
    // console.log(req.body)
    const {token,title, coverLetter, budget, deadline, status, freelancerid, projectid } =
      req.body;
      const exists = await Proposal.findOne({
  freelancerid: freelancerid,
  projectid: projectid,
});
if(exists)
   return res.status(401).json({ message: "Already exists" });

    const proj = new Proposal({
      title:title,
      coverLetter: coverLetter,
      budget: budget,
      deadline: deadline,
      status: status,
      freelancerid: freelancerid,
      projectid: projectid,
    });
    await proj.save();
    res.status(200).json({ success: true, message: "Proposal initiated" });
  } catch (err) {
    res.status(401).json({ message: err });
  }
});
router.get('/me',freeMiddleware,async(req,res)=>{
    try {
      const {id} = req.body;
   
        const allProposal_of_freelancer=await Proposal.find({freelancerid:id})
         res.status(200).json(allProposal_of_freelancer);
    }
    catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})
router.get("/project", async (req, res) => {
  try {
    const id = req.query.id;
    // console.log(id)
    const allProposal = await Proposal.find({ projectid: id });
    res.status(200).json(allProposal);
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.put("/:_id/accept",rolemiddlware, async (req, res) => {
  const { _id } = req.params;
  try {
    const {id}=req.body;    
    // console.log(id)
    const proposal = await Proposal.findById({ _id: _id });
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });}
 const projectid= proposal.projectid
    //  console.log(projectid)
    const reject=await Proposal.updateMany(
      {
        projectid: proposal.projectid,
        _id: { $ne: _id } 
        ,
      },
      {
        $set: { status: 'rejected' }
      }
    );

      const update=await Project.findByIdAndUpdate(projectid,
        {$set:{status:'in progress',assignedfreelancerid:proposal.freelancerid}},
        {new:true},
      )
    
      proposal.status = "accepted";
      proposal.acceptedAt = new Date();
      proposal.acceptedby= id;
          
        // console.log(proposal)
      await proposal.save();
      // console.log(update)
      res.status(200).send(update);
    }
   catch (err) {
    res.status(401).json({ message: err });
  }
});


router.put("/:id/reject",rolemiddlware, async (req, res) => {
  const { id } = req.params;
  try {
    const proposal = await Proposal.findById({ _id: id });
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });}
      proposal.status = "rejected";
      await proposal.save();
      // console.log(proposal)
      res.status(200).json({ message: "Proposal rejected"});
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

module.exports=router