import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import {
    CREATE_FAMILY_MEMBER,
    UPDATE_FAMILY_MEMBER,
    DELETE_FAMILY_MEMBER,
    GET_FAMILY_MEMBERS,
    setFamilyMembers,
    getFamilyMembers,
} from '../actions/familyMemberActions'

function* fetchFamilyMembers(action: any): Generator<any, void, any> {
    try {
        const res = yield call(axios.get, `http://localhost:4000/api/family-members/${action.payload}`)
        yield put(setFamilyMembers(res.data))
    } catch (err) {
        console.error('Fetch error:', err)
    }
}

function* createMember(action: any): Generator<any, void, any> {
    try {
        yield call(axios.post, 'http://localhost:4000/api/family-members', action.payload)
        yield put(getFamilyMembers(action.payload.tree_id))
    } catch (err) {
        console.error('Create error:', err)
    }
}

function* updateMember(action: any): Generator<any, void, any> {
    try {
        const { id, updated } = action.payload
        yield call(axios.put, `http://localhost:4000/api/family-members/${id}`, updated)
        yield put(getFamilyMembers(updated.tree_id))
    } catch (err) {
        console.error('Update error:', err)
    }
}

function* deleteMember(action: any) {
    try {
        const { id, treeId } = action.payload
        yield call(axios.delete, `http://localhost:4000/api/family-members/${id}`)
        // now re-fetch this tree’s members
        yield put(getFamilyMembers(treeId))
    } catch (err) {
        console.error('Delete error:', err)
    }
}

export function* familyMemberSaga() {
    yield all([
        takeLatest(GET_FAMILY_MEMBERS, fetchFamilyMembers),
        takeLatest(CREATE_FAMILY_MEMBER, createMember),
        takeLatest(UPDATE_FAMILY_MEMBER, updateMember),
        takeLatest(DELETE_FAMILY_MEMBER, deleteMember),
    ])
}
