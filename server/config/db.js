const mongoose=require('mongoose');

try{
mongoose.connect(process.env.Mongo_url);
console.log("Db connected Successfully")
}
catch(err)
{
    console.log(err);
}