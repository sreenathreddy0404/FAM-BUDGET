const express = require('express');
const { addFamilyMember, getFamilyMembers, deleteFamilyMember, updateFamilyMember } = require('../controllers/FamilyMemberController');

const router = express.Router();

router.post('/', addFamilyMember);
router.get('/', getFamilyMembers);
router.delete('/:id', deleteFamilyMember);
router.put('/:id', updateFamilyMember);

module.exports = router;