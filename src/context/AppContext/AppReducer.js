import { ADD_MODULE, UPDATE_SCAFFOLDER } from "../types";

const AppReducer = (state, action) => {
  switch(action.type){
    case UPDATE_SCAFFOLDER:
      return{
        ...state,
        chosenScaffolder: action.payload
      }
    case ADD_MODULE:
      return{
        ...state,
        moduleList: [...state.moduleList, action.payload]
      }
      default:
        return state;
  }
}

export default AppReducer;