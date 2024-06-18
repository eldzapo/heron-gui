import { createReducer, on } from '@ngrx/store';
import { User } from '../../util/types/user.interface';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => {
    return { ...state, loading: true };
  }),
  on(UserActions.loadUserSuccess, (state, { user }) => {
    return { ...state, user, loading: false };
  }),
  on(UserActions.loadUserFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),
  on(UserActions.updateUser, (state, { user }) => {
    return { ...state, user };
  })
);
