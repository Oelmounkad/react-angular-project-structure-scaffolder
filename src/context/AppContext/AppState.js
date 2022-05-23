import { useReducer } from "react"
import { UPDATE_SCAFFOLDER } from "../types"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"

const AppState = props => {


    const initialState = {
        chosenScaffolder: 'react',
    }

   const [state, dispatch] = useReducer(AppReducer, initialState);


   // Actions:

   const updateScaffolder = (scaffolder) => {
    dispatch({type: UPDATE_SCAFFOLDER , payload: scaffolder})
}


   return (
    <AppContext.Provider 
    value={{
        chosenScaffolder: state.chosenScaffolder,
        updateScaffolder
    }}>
        {props.children}
    </AppContext.Provider>
)
}

export default AppState