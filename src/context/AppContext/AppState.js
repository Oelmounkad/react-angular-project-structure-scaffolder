import { useReducer } from "react"
import { ADD_MODULE, UPDATE_SCAFFOLDER } from "../types"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"

const AppState = props => {


    const initialState = {
        chosenScaffolder: 'react',
        moduleList: []
    }

   const [state, dispatch] = useReducer(AppReducer, initialState);


   // Actions:

   const updateScaffolder = (scaffolder) => {
    dispatch({type: UPDATE_SCAFFOLDER , payload: scaffolder})
}

    const addModule = (module) => {
        dispatch({type: ADD_MODULE , payload: module})
    }


   return (
    <AppContext.Provider 
    value={{
        chosenScaffolder: state.chosenScaffolder,
        moduleList: state.moduleList,
        addModule,
        updateScaffolder
    }}>
        {props.children}
    </AppContext.Provider>
)
}

export default AppState