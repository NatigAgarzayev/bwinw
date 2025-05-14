import { Router } from 'express'
import { createFamilyTree, deleteFamilyTree, getAllFamilyTrees, updateFamilyTree } from '../controllers/familyController'

const router = Router()

router.get('/', getAllFamilyTrees)

router.post('/', createFamilyTree)

router.put('/:id', updateFamilyTree)

router.delete('/:id', deleteFamilyTree)

export default router
