import {combineReducers} from 'redux'

// ACTIONS-------------->
export const showMapEdit = () => {return {type: 'SHOW_MAP'}}
export const drawStart = (data) => { return {type: 'DRAW_START', data:data} }
export const toggleInstModal = () => {return {type: 'TOGGLE_INST_MODAL'}}
// export const drawStart = (data) => { return {type: 'SHOW_MAP_DRAW_COMPLETE', data:data} }

// REDUCERS-------------->
const initialState = {
  header:'on',
  content:'start',
  prompts:'start',
  leftbar:'off',
  rightbar:'off',
  footer:'off',
  instModalState:false,
  mapInst:true
}

const pageReducer = (state = initialState, action) => {
	switch (action.type) {

		case "SHOW_MAP":
			return {
				...state,
				header: "off",
				content: "map",
				prompts: "showinst",
      }
      
		case "DRAW_START":
			return {
				...state,
				data: action.data,
				rightbar: "polydata",
				mapInst: false,
				prompts: "drawstart",
      }
      
		case "TOGGLE_INST_MODAL":
      return { ...state, instModalState: !state.instModalState }
      
		default:
			return state
	}
}


export const rootReducer = combineReducers({
  pageReducer
})
