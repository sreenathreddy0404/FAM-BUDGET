const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

module.exports = mongoose.model('FamilyMember', familyMemberSchema);