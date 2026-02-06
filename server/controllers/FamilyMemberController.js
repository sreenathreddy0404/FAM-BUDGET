const Expense = require('../models/Expense');
const FamilyMember = require('../models/FamilyMember');

//Add a new family member
const addFamilyMember = async(req,res)=>{
    try{
        const {name,avatar} = req.body;
        const userId = req.userId;
        const familyMember = await FamilyMember.create({name,avatar,userId});
        res.status(201).json({success: true,message: "Family member added successfully!",familyMember});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

const getFamilyMembers = async (req, res) => {
  try {
    const userId = req.userId;
    const familyMembers = await FamilyMember.find({ userId }).sort({ createdAt: 1 });

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const response = await Promise.all(
      familyMembers.map(async (member) => {
        
        //helper function
        const getTotal = async (from, to) => {
          const agg = await Expense.aggregate([
            { $match: {memberId: member._id, date: { $gte: from, $lt: to } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ]);
          return agg.length ? agg[0].total : 0;
        };

        const currentMonthSpent = await getTotal(startOfCurrentMonth, startOfNextMonth);
        const lastMonthSpent = await getTotal(startOfLastMonth, startOfCurrentMonth);

        
        const lastExpense = await Expense.findOne({ memberId: member._id }).sort({ date: -1 });

        // Trend Calculation
        let trend = "up", trendValue = "0%";
        if (lastMonthSpent === 0 && currentMonthSpent > 0) {
          trendValue = "+100%";
        } else if (lastMonthSpent > 0) {
          const diff = ((currentMonthSpent - lastMonthSpent) / lastMonthSpent) * 100;
          trend = diff >= 0 ? "up" : "down";
          trendValue = `${diff >= 0 ? "+" : "-"}${diff.toFixed(2)}%`;
        }

        return {
          id: member._id,
          name: member.name,
          avatar: member.avatar,
          totalSpent: currentMonthSpent,
          lastExpense: lastExpense ? `${lastExpense.name} - $${lastExpense.amount}` : "No expenses yet",
          trend,
          trendValue,
        };
      })
    );

    res.status(200).json({ success: true, data: response });
  } catch (e) {
    res.status(500).json({ success: false, message: "Server error", error: e.message });
  }
};

const deleteFamilyMember = async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.userId;
        await FamilyMember.findOneAndDelete({ _id: id, userId });
        res.status(200).json({success: true,message: "Family member deleted successfully!"});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

const updateFamilyMember = async(req,res)=>{
    try{
        const {id} = req.params;
        const {name,avatar} = req.body;
        const userId = req.userId;
        const familyMember = await FamilyMember.findOneAndUpdate({ _id: id, userId },{name,avatar},{new:true});
        res.status(200).json({success: true,message: "Family member updated successfully!",familyMember});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

module.exports = {addFamilyMember,getFamilyMembers,deleteFamilyMember,updateFamilyMember};