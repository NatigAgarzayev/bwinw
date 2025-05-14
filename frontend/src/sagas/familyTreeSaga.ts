import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import {
    GET_FAMILY_TREES,
    CREATE_FAMILY_TREE,
    UPDATE_FAMILY_TREE,
    DELETE_FAMILY_TREE,
    setFamilyTrees,
    getFamilyTrees
} from '../actions/familyTreeActions'

const BASE_URL = "https://bwinw.onrender.com"

function* fetchFamilyTrees(): Generator<any, void, any> {
    try {
        const { data } = yield call(axios.get, `${BASE_URL}/api/family-trees`)
        yield put(setFamilyTrees(data))
    } catch (error) {
        console.error('Error fetching family trees:', error)
    }
}

function* createTree(action: any): Generator<any, void, any> {
    try {
        yield call(axios.post, `${BASE_URL}/api/family-trees`, {
            title: action.payload
        })
        yield put(getFamilyTrees())
    } catch (error) {
        console.error('Error creating family tree:', error)
    }
}

function* updateTree(action: any): Generator<any, void, any> {
    try {
        const { id, title } = action.payload
        yield call(axios.put, `${BASE_URL}/api/family-trees/${id}`, { title })
        yield put(getFamilyTrees())
    } catch (error) {
        console.error('Error updating family tree:', error)
    }
}

function* deleteTree(action: any): Generator<any, void, any> {
    try {
        const id = action.payload
        yield call(axios.delete, `${BASE_URL}/api/family-trees/${id}`)
        yield put(getFamilyTrees())
    } catch (error) {
        console.error('Error deleting family tree:', error)
    }
}

export function* familyTreeSaga() {
    yield all([
        takeLatest(GET_FAMILY_TREES, fetchFamilyTrees),
        takeLatest(CREATE_FAMILY_TREE, createTree),
        takeLatest(UPDATE_FAMILY_TREE, updateTree),
        takeLatest(DELETE_FAMILY_TREE, deleteTree),
    ])
}
