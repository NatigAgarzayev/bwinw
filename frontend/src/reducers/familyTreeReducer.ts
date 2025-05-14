import { SET_FAMILY_TREES } from '../actions/familyTreeActions'

const initialState = {
    trees: [],
}

export const familyTreeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FAMILY_TREES:
            return { ...state, trees: action.payload }
        default:
            return state
    }
}
