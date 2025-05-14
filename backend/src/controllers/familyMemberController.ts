import { Request, Response } from 'express'
import { createFamilyMemberModel, deleteFamilyMemberModel, getFamilyMembersByTreeIdModel, updateFamilyMemberModel } from '../models/familyMemberModel'

export const getFamilyMembersByTreeId = async (req: Request, res: Response) => {
    try {
        const treeId = parseInt(req.params.tree_id)
        if (isNaN(treeId)) return res.status(400).json({ error: 'Invalid tree ID' })

        const members = await getFamilyMembersByTreeIdModel(treeId)
        res.json(members)
    } catch (err) {
        console.error('Error fetching family members:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const createFamilyMember = async (req: Request, res: Response) => {
    try {
        const member = req.body
        const created = await createFamilyMemberModel(member)
        res.status(201).json(created)
    } catch (err) {
        console.error('Error creating member:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateFamilyMember = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const updated = await updateFamilyMemberModel(id, req.body)
        if (!updated) return res.status(404).json({ error: 'Member not found' })
        res.json(updated)
    } catch (err) {
        console.error('Error updating member:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteFamilyMember = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const deleted = await deleteFamilyMemberModel(id)
        if (!deleted) return res.status(404).json({ error: 'Member not found' })
        res.json({ message: 'Member deleted' })
    } catch (err) {
        console.error('Error deleting member:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}
