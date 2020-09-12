/** @format */

import { combineReducers } from "redux"

// MODAL ACTIONS
export const toggleInstModal = () => {
	return { type: "TOGGLE_INST_MODAL" }
}
export const toggleLogInModal = () => {
	return { type: "TOGGLE_LOGIN_MODAL" }
}
export const toggleProjectModal = () => {
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
export const displayError = () => {
	return { type: "DISPLAY_ERROR" }
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
}

const pageReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SHOW_MAP":
			return {
				...state,
				header: "off",
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
				prompts: "off",
				genData: action.genData,
			}
		case "DISPLAY_ERROR":
			return {
				...state,
				header: "off",
				content: "error",
				prompts: "off",
				footer: "off",
			}

		default:
			return state
	}
}

export const rootReducer = combineReducers({
	pageReducer,
})
