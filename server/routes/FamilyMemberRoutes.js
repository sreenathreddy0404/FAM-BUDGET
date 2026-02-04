const express = require('express');
const { addFamilyMember, getFamilyMembers, getFamilyMember, deleteFamilyMember, updateFamilyMember } = require('../controllers/FamilyMemberController');

const router = express.Router();

router.post('/', addFamilyMember);
router.get('/', getFamilyMembers);
router.get('/:id', getFamilyMember);
router.delete('/:id', deleteFamilyMember);
router.put('/:id', updateFamilyMember);

module.exports = router;