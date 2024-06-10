import { createReducer, on } from '@ngrx/store';
import { authSuccess, authFailure, loadAuth } from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(loadAuth, state => ({ ...state, loading: true })),
  on(authSuccess, (state, { token }) => ({ ...state, token, loading: false })),
  on(authFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
