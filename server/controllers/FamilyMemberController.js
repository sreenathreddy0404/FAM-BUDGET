const FamilyMember = require('../models/FamilyMember');

//Add a new family member
const addFamilyMember = async(req,res)=>{
    try{
        const {name,avatar,userId} = req.body;
        const familyMember = await FamilyMember.create({name,avatar,userId});
        res.status(201).json({success: true,message: "Family member added successfully!",familyMember});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

const getFamilyMembers = async(req,res)=>{
    try{
        const {userId} = req.params;
        const familyMembers = await FamilyMember.find({userId}).sort({createdAt:1});
        res.status(200).json({success: true,familyMembers});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

const getFamilyMember = async(req,res)=>{
    try{
        const {id,userId} = req.params;
        const familyMember = await FamilyMember.findOne({ _id: id, userId });
        res.status(200).json({success: true,familyMember});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

const deleteFamilyMember = async(req,res)=>{
    try{
        const {id,userId} = req.params;
        await FamilyMember.findOneAndDelete({ _id: id, userId });
        res.status(200).json({success: true,message: "Family member deleted successfully!"});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

const updateFamilyMember = async(req,res)=>{
    try{
        const {id,userId} = req.params;
        const {name,avatar} = req.body;
        const familyMember = await FamilyMember.findOneAndUpdate({ _id: id, userId },{name,avatar},{new:true});
        res.status(200).json({success: true,message: "Family member updated successfully!",familyMember});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

module.exports = {addFamilyMember,getFamilyMembers,getFamilyMember,deleteFamilyMember,updateFamilyMember};