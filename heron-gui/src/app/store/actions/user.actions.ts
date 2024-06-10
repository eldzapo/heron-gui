// src/app/store/actions/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../../util/types/user.interface'

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());
export const updateUser = createAction('[User] Update User', props<{ user: User }>());
