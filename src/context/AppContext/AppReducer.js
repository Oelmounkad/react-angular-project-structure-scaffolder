import { UPDATE_SCAFFOLDER } from "../types";

const AppReducer = (state, action) => {
  switch(action.type){
    case UPDATE_SCAFFOLDER:
      return{
        ...state,
        chosenScaffolder: action.payload
      }
      default:
        return state;
  }
}

export default AppReducer;