export const GET_FAMILY_TREES = 'GET_FAMILY_TREES'
export const SET_FAMILY_TREES = 'SET_FAMILY_TREES'
export const CREATE_FAMILY_TREE = 'CREATE_FAMILY_TREE'
export const DELETE_FAMILY_TREE = 'DELETE_FAMILY_TREE'
export const UPDATE_FAMILY_TREE = 'UPDATE_FAMILY_TREE'

export const getFamilyTrees = () => ({ type: GET_FAMILY_TREES })

export const setFamilyTrees = (trees: any[]) => ({
    type: SET_FAMILY_TREES,
    payload: trees
})

export const createFamilyTree = (title: string) => ({
    type: CREATE_FAMILY_TREE,
    payload: title
})

export const deleteFamilyTree = (id: number) => ({
    type: DELETE_FAMILY_TREE,
    payload: id
})

export const updateFamilyTree = (id: number, title: string) => ({
    type: UPDATE_FAMILY_TREE,
    payload: { id, title }
})
