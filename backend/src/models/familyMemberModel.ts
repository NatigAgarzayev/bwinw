import { pool } from '../config/db'

export interface FamilyMember {
    id: number
    tree_id: number
    parent_id: number | null
    name: string
    gender: boolean
    alive: boolean
    birth_date: string
    death_date: string | null
    position: string
}

export const getFamilyMembersByTreeIdModel = async (treeId: number): Promise<FamilyMember[]> => {
    const result = await pool.query(
        `SELECT * FROM family_members WHERE tree_id = $1 ORDER BY id ASC`,
        [treeId]
    )
    return result.rows
}

export const createFamilyMemberModel = async (member: Omit<FamilyMember, 'id'>): Promise<FamilyMember> => {
    const result = await pool.query(
        `INSERT INTO family_members (tree_id, parent_id, name, gender, alive, birth_date, death_date, position)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
        [
            member.tree_id,
            member.parent_id,
            member.name,
            member.gender,
            member.alive,
            member.birth_date,
            member.death_date,
            member.position,
        ]
    )
    return result.rows[0]
}

export const updateFamilyMemberModel = async (id: number, updated: Partial<FamilyMember>): Promise<FamilyMember | null> => {
    const result = await pool.query(
        `UPDATE family_members
     SET name = $1,
         gender = $2,
         alive = $3,
         birth_date = $4,
         death_date = $5,
         position = $6,
         parent_id = $7
     WHERE id = $8
     RETURNING *`,
        [
            updated.name,
            updated.gender,
            updated.alive,
            updated.birth_date,
            updated.death_date,
            updated.position,
            updated.parent_id,
            id,
        ]
    )
    return result.rows[0] || null
}

export const deleteFamilyMemberModel = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM family_members WHERE id = $1', [id])
    return result.rowCount === 1
}