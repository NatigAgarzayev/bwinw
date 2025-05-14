export const CREATE_FAMILY_MEMBER = 'CREATE_FAMILY_MEMBER'
export const UPDATE_FAMILY_MEMBER = 'UPDATE_FAMILY_MEMBER'
export const DELETE_FAMILY_MEMBER = 'DELETE_FAMILY_MEMBER'

export const GET_FAMILY_MEMBERS = 'GET_FAMILY_MEMBERS'
export const SET_FAMILY_MEMBERS = 'SET_FAMILY_MEMBERS'

export const getFamilyMembers = (treeId: number) => ({
    type: GET_FAMILY_MEMBERS,
    payload: treeId,
})

export const setFamilyMembers = (members: any[]) => ({
    type: SET_FAMILY_MEMBERS,
    payload: members,
})

export const createFamilyMember = (member: any) => ({
    type: CREATE_FAMILY_MEMBER,
    payload: member,
})

export const updateFamilyMember = (id: number, updated: any) => ({
    type: UPDATE_FAMILY_MEMBER,
    payload: { id, updated },
})

export const deleteFamilyMember = (id: number, treeId: number) => ({
    type: DELETE_FAMILY_MEMBER,
    payload: { id, treeId }
})
