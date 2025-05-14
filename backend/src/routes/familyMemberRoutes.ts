import { Router } from 'express';
import { createFamilyMember, deleteFamilyMember, getFamilyMembersByTreeId, updateFamilyMember } from '../controllers/familyMemberController';

const router = Router();

router.get('/:tree_id', getFamilyMembersByTreeId);
router.post('/', createFamilyMember);
router.put('/:id', updateFamilyMember);
router.delete('/:id', deleteFamilyMember);

export default router;
