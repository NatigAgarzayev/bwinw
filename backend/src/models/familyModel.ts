import { pool } from '../config/db'

export interface FamilyTree {
    tree_id: string
    title: string
    created_at: string
    changed_at: string
}

// Get all trees
export const getAllFamilyTreesModel = async (): Promise<FamilyTree[]> => {
    const result = await pool.query('SELECT * FROM family_trees ORDER BY created_at DESC')
    return result.rows
}

// Create new tree
export const createFamilyTreeModel = async (title: string): Promise<FamilyTree> => {
    const result = await pool.query(
        `INSERT INTO family_trees (title, created_at, changed_at)
     VALUES ($1, NOW(), NOW())
     RETURNING *`,
        [title]
    )
    return result.rows[0]
}

// Update tree
export const updateFamilyTreeModel = async (treeId: number, title: string): Promise<FamilyTree | null> => {
    const result = await pool.query(
        `UPDATE family_trees
     SET title = $1, changed_at = NOW()
     WHERE tree_id = $2
     RETURNING *`,
        [title, treeId]
    )
    return result.rows[0] || null
}

// Delete tree
export const deleteFamilyTreeModel = async (treeId: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM family_trees WHERE tree_id = $1', [treeId])
    return (result.rowCount ?? 0) > 0
}