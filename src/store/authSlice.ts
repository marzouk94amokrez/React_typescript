import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AccessToken } from "@/utils/types/accessToken";
import { RequestStatus } from "@/utils/types/requestStatus";

interface AuthSliceState {
  currentUser?: any;
  userRights?: any[];
  token: string;
  tokenContents?: any;
  status: RequestStatus,
  
}

const initialState: AuthSliceState = {
  currentUser: "",
  userRights: [],
  token: "",
  tokenContents: undefined,
  status: RequestStatus.IDLE,

}

/**
 * Slice pour le stockage de la session utilisateur
 */
export const authSlice = createSlice({
  name: 'auth' ,
  initialState,
  reducers: {
    setToken: {
      reducer: (state, { payload: { userRights, token, tokenContents, status } }: PayloadAction<AuthSliceState>) => {
        state.userRights = userRights;
        state.token = token;
        state.tokenContents = tokenContents;
        state.status = status;
       
      },
      prepare: (accessToken?: AccessToken) => {
        const userRights: any[] = accessToken?.user_right || [];
        const token: string = accessToken?.token || '';
        const tokenContents: any = accessToken?.tokenContents;
        const status = (token) ? RequestStatus.SUCCEEDED : RequestStatus.IDLE;

        return { payload: { userRights, token, tokenContents, status } };
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearToken: (state) => {
      state.userRights = [];
      state.token = "";
      state.tokenContents = undefined;
      state.status = RequestStatus.IDLE;
    }
  },
});

export const { setToken, clearToken,setCurrentUser } = authSlice.actions

export default authSlice.reducer;
