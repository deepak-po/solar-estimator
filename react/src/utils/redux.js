import {combineReducers} from 'redux'

// ACTIONS-------------->
export const showMapEdit = () => {return {type: 'SHOW_MAP_EDIT'}}
export const showMapDrawComplete = (data) => { return {type: 'SHOW_MAP_DRAW_COMPLETE', data:data} }
export const toggleInstModal = () => {return {type: 'TOGGLE_INST_MODAL'}}
// export const showMapDrawComplete = (data) => { return {type: 'SHOW_MAP_DRAW_COMPLETE', data:data} }

// REDUCERS-------------->
const initialState = {
  header:'on',
  content:'start',
  prompts:'start',
  leftbar:'off',
  rightbar:'off',
  footer:'off',
  instModalState:false
}

const pageReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SHOW_MAP_EDIT' : return {...state, header:'off', content:'map',prompts:'off' }
    case 'SHOW_MAP_DRAW_COMPLETE': return  {...state, data:action.data,header:'on',rightbar:'polydata' }
    case 'TOGGLE_INST_MODAL': return {...state, instModalState:!state.instModalState }
    default: return state
  }
}


export const rootReducer = combineReducers({
  pageReducer
})
