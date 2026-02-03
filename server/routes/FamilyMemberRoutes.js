const express = require('express');
const { addFamilyMember, getFamilyMembers, getFamilyMember, deleteFamilyMember, updateFamilyMember } = require('../controllers/FamilyMemberController');

const router = express.Router();

router.post('/', addFamilyMember);
router.get('/:userId', getFamilyMembers);
router.get('/:id/:userId', getFamilyMember);
router.delete('/:id/:userId', deleteFamilyMember);
router.put('/:id/:userId', updateFamilyMember);

module.exports = router;