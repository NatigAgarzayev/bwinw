import { Request, Response } from 'express'
import {
    getAllFamilyTreesModel,
    createFamilyTreeModel,
    updateFamilyTreeModel,
    deleteFamilyTreeModel,
} from '../models/familyModel'

export const getAllFamilyTrees = async (_req: Request, res: Response) => {
    try {
        const trees = await getAllFamilyTreesModel()
        res.json(trees)
    } catch (err) {
        console.error('Error fetching family trees:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const createFamilyTree = async (req: Request, res: Response) => {
    try {
        const { title } = req.body
        if (!title) return res.status(400).json({ error: 'Title is required' })

        const newTree = await createFamilyTreeModel(title)
        res.status(201).json(newTree)
    } catch (err) {
        console.error('Error creating family tree:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateFamilyTree = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { title } = req.body
        if (!title) return res.status(400).json({ error: 'Title is required' })

        const updatedTree = await updateFamilyTreeModel(id, title)
        if (!updatedTree) return res.status(404).json({ error: 'Family tree not found' })

        res.json(updatedTree)
    } catch (err) {
        console.error('Error updating family tree:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteFamilyTree = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const success = await deleteFamilyTreeModel(id)
        if (!success) return res.status(404).json({ error: 'Family tree not found' })

        res.json({ message: 'Family tree deleted' })
    } catch (err) {
        console.error('Error deleting family tree:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}