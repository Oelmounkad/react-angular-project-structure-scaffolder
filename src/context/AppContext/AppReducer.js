import { UPDATE_SCAFFOLDER } from "../types";

export default (state, action) => {
  switch(action.type){
    case UPDATE_SCAFFOLDER:
      return{
        ...state,
        chosenScaffolder: action.payload
      }
  }
}