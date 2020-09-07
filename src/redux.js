import {combineReducers} from "redux"

// ACTIONS-------------->
export const logInUser = (user) => {return {type: "LOG_IN", user:user}}
export const logOutUser = () => {return {type: "LOG_OUT"}}

export const toggleModal = () => {return {type: "TOOGLE_MODAL"}}

export const displayPolyData = (data) => {return {type: "DONE_DRAWING", data:data}}

// REDUCERS-------------->
const modalReducer = (state={isOn:true}, action) => {
  switch(action.type) {
    case 'TOOGLE_MODAL' : return {...state, isOn: !state.isOn}
    case 'HIDE_MODAL': return  {...state, isOn: false }
    default: return state
  }
}

const mapDrawReducer = (state={isDrawn:false}, action) => {
  switch(action.type) {
    case 'DONE_DRAWING' : return {...state, ...action.data}
    default: return state
  }
}


export const rootReducer = combineReducers({
  modalReducer,
  mapDrawReducer
})
