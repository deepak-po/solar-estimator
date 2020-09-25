/** @format */

import { combineReducers } from "redux"

// MODAL ACTIONS
export const toggleInstModal = () => {
	return { type: "TOGGLE_INST_MODAL" }
}
export const toggleLogInModal = () => {
	return { type: "TOGGLE_LOGIN_MODAL" }
}
export const toggleProjectSubmitModal = () => {
	return { type: "TOGGLE_PROJECT_MODAL" }
}

// PAGE VIEW ACTIONS
export const showMapEdit = () => {
	return { type: "SHOW_MAP" }
}
export const drawStart = data => {
	return { type: "DRAW_START", data: data }
}
export const clearPolyArea = () => {
	return { type: "CLEAR_POLY_AREA" }
}
export const displayGenChart = genData => {
	return { type: "DISPLAY_GEN_CHART", genData: genData }
}
export const displayTable = () => {
	return { type: "DISPLAY_TABLE" }
}
export const displayError = () => {
	return { type: "DISPLAY_ERROR" }
}
export const signOut = () => {
	return { type: "SIGN_OUT" }
}

// REDUCERS-------------->
const initialState = {
	header: "on",
	content: "start",
	prompts: "start",
	leftbar: "off",
	rightbar: "off",
	footer: "off",
	instModal: false,
	logInModal: false,
	mapInst: true,
	projectSubmitModal: false,
}

const pageReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SHOW_MAP":
			return {
				...state,
				content: "map",
				prompts: "showInst",
				footer: "on",
			}

		case "DRAW_START":
			return {
				...state,
				data: action.data,
				rightbar: "polyData",
				mapInst: false,
				prompts: "drawStart",
			}

		case "TOGGLE_INST_MODAL":
			return { ...state, instModal: !state.instModal }

		case "TOGGLE_LOGIN_MODAL":
			return { ...state, logInModal: !state.logInModal }

		case "CLEAR_POLY_AREA":
			return { ...state, data: "" }

		case "DISPLAY_GEN_CHART":
			return {
				...state,
				data: "",
				content: "genChart",
				prompts: "views",
				genData: action.genData,
				projectSubmitModal: false,
				rightbar: "genData",
			}
		case "DISPLAY_TABLE":
			return {
				...state,
				content: "table",
				rightbar: "off",
			}
		case "SIGN_OUT":
			return {
				...state,
				...initialState,
			}
		case "SIGN_IN":
			return {
				...state,
				content: "error",
				prompts: "off",
				footer: "off",
			}
		case "DISPLAY_ERROR":
			return {
				...state,
				content: "error",
				prompts: "off",
				footer: "off",
			}
		case "TOGGLE_PROJECT_MODAL":
			return {
				...state,
				projectSubmitModal: !state.projectSubmitModal,
				data: {
					area: state.data.area,
					perimeter: state.data.perimeter,
					centroid: state.data.centroid,
					path: state.data.path,
				},
			}

		default:
			return state
	}
}

export const rootReducer = combineReducers({
	pageReducer,
})


  