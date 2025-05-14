import { SET_FAMILY_MEMBERS } from '../actions/familyMemberActions'

const initialState = {
    members: [],
}

export const familyMemberReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FAMILY_MEMBERS:
            return { ...state, members: action.payload }
        default:
            return state
    }
}
