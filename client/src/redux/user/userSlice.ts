import { createSlice } from "@reduxjs/toolkit";

type CurrentUser = {
  name: string,
  username: string,
  email: string
  profilePicture: string,  
}
type InitialState = {
  currentUser: CurrentUser | null,
  loading: boolean,
  error: string | null ,
}
const initialState: InitialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;      
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
  }
})
export type userReducer = ReturnType<typeof userSlice.reducer>
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;