import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { merge, pluck } from 'ramda'
import PouchDB from 'pouchdb-browser'

import errorReducer from './reducers/error'

const videos = (state = [], action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return action.payload
    default:
      return state
  }
}

const video = (state = { name: '' }, action) => {
  switch (action.type) {
    case 'SET_VIDEO':
      return merge(state, action.payload)
    default:
      return state
  }
}

const dbReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_DB':
      return action.payload
    default:
      return state
  }
}

const src = (state = null, action) => {
  switch (action.type) {
    case 'SET_SRC':
      return action.payload
    default:
      return state
  }
}

const store = createStore(
  combineReducers({ videos, video, db: dbReducer, error: errorReducer, src }),
  applyMiddleware(thunk)
)

const db = PouchDB('twilson63-videos')
store.dispatch({ type: 'SET_DB', payload: db })
db
  .allDocs({ include_docs: true })
  .then(
    res =>
      store.dispatch({ type: 'SET_VIDEOS', payload: pluck('doc', res.rows) })
  )
console.log(process.env.REACT_APP_DB)
db.sync(process.env.REACT_APP_DB, { live: true, retry: true })

export default store
