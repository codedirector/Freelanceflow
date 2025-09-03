const express=require('express')
const router=express.Router()
const authmiddleware=require('../middleware/auth')
const roleMiddleware=require('../middleware/role')
const Project =require('../models/Project')

router.post('/',roleMiddleware,async(req,res)=>{
   try{
    const {title,description,budget,deadline,status,id}=req.body;
      // console.log(title)
       const newProject=new Project({
          title:title,
          description:description,budget:budget,
          deadline:deadline,
          status:status,
          client:id
       });
       await newProject.save();
       res.status(201).json({
      success: true,
      message: "Project created successfully",
    });
   }
   catch(err){
     console.error("Project error:", err);
    res.status(500).json({ message: "Server error" });
   }
})
router.get('/me',roleMiddleware,async(req,res)=>{
    try {
      const {id} = req.body;
      // console.log(userId)
        const allProject_of_client=await Project.find({client:id})
         res.status(200).json(allProject_of_client);
    }
    catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})

router.get('/',async(req,res)=>{
  try{
    const page = parseInt(req.query.page) || 1;  
    
    const limit = parseInt(req.query.limit) || 10;  
      
    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([
  Project.find()
    .populate('client', 'name')
    .skip(skip)
    .limit(limit),
  Project.countDocuments()
]);
// console.log(projects) 
     res.json(
  // page,              
  // limit,            
  // totalProjects: total,
  // totalPages: Math.ceil(total / limit),
  projects        
);
  }
  catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})

router.put('/',roleMiddleware,async(req,res)=>{
    try{
   const projectid=req.query.id;
   console.log(projectid)
   const {description,title,budget,deadline,status}=req.body;
      const {id} = req.body;   const project=await Project.findById(projectid)
    if (!project) {
      return res.status(401).json({ message: 'Project not found' });
    };
   const clientid=project.client.toString(); ;
   if(id !==clientid)
         return res.status('404').json({message:"Does not have permission"})
    const update=await Project.findByIdAndUpdate(projectid,{$set:{
     description:description.trim(),title:title,budget:budget,deadline:deadline,
     status:status
    }},{new:true})
     if (!update) {
      return res.status(404).json({ message: 'Update not done' });
    }

    res.status(200).json(update);
}
catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})

router.delete('/',roleMiddleware,async(req,res)=>{
    try{
   const projectid=req.query.id;
      const {id} = req.body;     
   const project=await Project.findById(projectid);
    if (!project) {
      return res.status(401).json({ message: 'Project not found' });
    }
   const clientid=project.client.toString(); ;
   if(id!==clientid)
         return res.status('404').json({message:"Does not have permission"})
    const del=await Project.findOneAndDelete(projectid);
     if (!del) {
      return res.status(404).json({ message: 'Update not done' });
    }

    res.status(200).json({ message: 'Deleted Successfully' });
}
catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }
})

router.get('/:id',async(req,res)=>{
    try {const projectid=req.params.id;
      // console.log(projectid)
      const projectdetails=await Project.findById(projectid)
        // const projectdetails=await Project.find({id:projectid})
         res.status(200).json(projectdetails);
    }
    catch(err){
 console.error("error:", err);
    res.status(500).json({ message: "Server error" });
    }}
  )

//   router.get('/inbox', authmiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;

//    const projects = await Project.find({
//   status: 'in progress',  // note the space, NOT underscore
//   $or: [
//     { client: user._id },  // use 'client' instead of 'createdBy'
//     { assignedfreelancerid: user._id }  // correct field name
//   ]
// })
// .populate('client', 'name')
// .populate('assignedfreelancerid', 'name');


//     res.status(200).json(projects);
//   } catch (error) {
//     console.error('Inbox fetch error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


module.exports=router;





