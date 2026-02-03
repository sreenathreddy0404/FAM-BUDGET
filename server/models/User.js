const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
});

//Hash Password before saving.
//pre('save',cb) it is hook given by mongoose module.
userSchema.pre('save',async function(){
    if(!this.isModified('password'))return;
    //salt is the randomly generated string to add with 
    // our password to make our password encode stronger.
    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

module.exports = mongoose.model('User',userSchema);