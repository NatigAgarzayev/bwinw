import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { familyTreeReducer } from '../reducers/familyTreeReducer'
import { familyMemberReducer } from '../reducers/familyMemberReducer'

import { familyTreeSaga } from '../sagas/familyTreeSaga'
import { familyMemberSaga } from '../sagas/familyMemberSaga'
import { all } from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    familyTree: familyTreeReducer,
    familyMember: familyMemberReducer,
})

function* rootSaga() {
    yield all([
        familyTreeSaga(),
        familyMemberSaga(),
    ])
}

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>
