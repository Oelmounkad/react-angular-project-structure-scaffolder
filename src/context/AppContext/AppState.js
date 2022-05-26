import { useReducer } from "react"
import { ADD_COMPONENT_TO_MODULE, ADD_MODULE, UPDATE_SCAFFOLDER } from "../types"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"

const AppState = props => {


    const initialState = {
        chosenScaffolder: 'angular',
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

    const addComponentToModule = (component, moduleName) => {
        dispatch({type: ADD_COMPONENT_TO_MODULE , payload: {component, moduleName}})
    }


   return (
    <AppContext.Provider 
    value={{
        chosenScaffolder: state.chosenScaffolder,
        moduleList: state.moduleList,
        addModule,
        updateScaffolder,
        addComponentToModule
    }}>
        {props.children}
    </AppContext.Provider>
)
}

export default AppState