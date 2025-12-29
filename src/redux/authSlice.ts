import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signOut, signUp, confirmSignUp, getCurrentUser, autoSignIn} from 'aws-amplify/auth';
import type { AuthState } from "../types/Auth";
import type { RootState } from "./appStore";

const initialState: AuthState = {
  step: "SIGN_IN",
  isAuthenticated: false,
  loading: false,
};

export const signInAsync = createAsyncThunk('auth/signIn', 
    async (credentials: { username: string; password: string },thunkAPI) => {
    try{
        //call aws amplify signIn method
        const result = await signIn({username: credentials.username, password: credentials.password});
        // return the attributes you need in state
        if(!result.isSignedIn)
            throw new Error('User is not confirmed. Please confirm your sign up before signing in.');
        return result;
    }catch(err:any){
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const signUpAsync = createAsyncThunk('auth/signUp',
    async (data: { givenName: string; familyName:string, password: string; email: string }, thunkAPI) => {
    try{
        const result = await signUp({username: data.email, password: data.password,
            options: {
                userAttributes: { 
                    email: data.email,
                    given_name: data.givenName,
                    family_name: data.familyName,
                },
                autoSignIn: {enabled: true}
            }
        });
        return result;
    }catch(err:any){
        return thunkAPI.rejectWithValue(err.message);
    }   
});

export const confirmSignUpAsync = createAsyncThunk('auth/confirmSignUp',
    async (data: { username: string; code: string }, thunkAPI) => {
    try{
        await confirmSignUp({username: data.username, confirmationCode: data.code});
        const autoSignInResult = await autoSignIn();
        if(!autoSignInResult?.isSignedIn)
            return thunkAPI.rejectWithValue('Auto sign-in after sign up confirmation failed.');
        return true;
    }catch(err:any){
        return thunkAPI.rejectWithValue(err.message);
    }   
});

export const getUserAsync = createAsyncThunk('auth/getUser', async () => {
    const user = await getCurrentUser();
    return {
        username: user.username,
        userId: user.userId
    }
});
export const signOutAsync = createAsyncThunk('auth/signOut',
    async (_, thunkAPI) => {
    try{    
        await signOut();
        return true;
    }catch(err:any){
        return thunkAPI.rejectWithValue(err.message);
    }   
});


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        goToSignIn: (state) => {
            state.step = 'SIGN_IN';
            state.error = undefined;
        },
        goToSignUp: (state) => {
            state.step = 'SIGN_UP';
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInAsync.pending, (state) => {
            state.loading = true;
        }); 
        builder.addCase(signInAsync.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.step = 'SIGNED_IN';
        });
        builder.addCase(signInAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as any;
        }
        );
        builder.addCase(signUpAsync.pending, (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        });
        builder.addCase(signUpAsync.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.isSignUpComplete)
                state.isAuthenticated = true;
            else if(action.payload.nextStep.signUpStep === 'CONFIRM_SIGN_UP')
                state.step = 'CONFIRM_SIGN_UP';
        });
        builder.addCase(signUpAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as any;
        });
        builder.addCase(confirmSignUpAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(confirmSignUpAsync.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.step = 'SIGNED_IN';
        });
        builder.addCase(confirmSignUpAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as any;
        });
        builder.addCase(signOutAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signOutAsync.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.step = 'SIGN_IN';
        }); 
        builder.addCase(signOutAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as any;
        });
        builder.addCase(getUserAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserAsync.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as any;
        });
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.step = 'SIGNED_IN';
            state.user = { userId: action.payload.userId, username: action.payload.username };
        });
    }
})
export const { goToSignIn, goToSignUp } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state:RootState) => state.auth;
export const selectIsAuthenticated = (state:RootState) => state.auth.isAuthenticated;