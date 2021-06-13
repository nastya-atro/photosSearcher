import { loginApi } from "../Searcher-3-dal/api";
import { CommonActionsTypes, CommonThunkType } from "./redux-store";




let initialState = {
    code: null as null |any
    

}

type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "auth/AUTH_RECEIVED":
            return {
                ...state,
                code: action.code
            }
       
        default:
            return state;
    }
}

const actionsSearch = {
  authReceived: (code: null |any ) => ({
        type: 'auth/AUTH_RECEIVED', code
    } as const),
    


}

type ActionsTypes = CommonActionsTypes<typeof actionsSearch>
type ThunkType = CommonThunkType<ActionsTypes>


export const getLoginThunk = (code: string): ThunkType => {
    return async (dispatch) => {
    debugger
        let result = await loginApi.getAccessToken(code)
        debugger
        console.log(result)

       
    }
}

export default authReducer
