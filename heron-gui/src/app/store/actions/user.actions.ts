import { createAction, props } from '@ngrx/store';
import { User } from '../../util/types/user.interface';

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());
export const updateUser = createAction('[User] Update User', props<{ user: User }>());
export const checkUserExists = createAction('[User] Check User Exists', props<{ email: string }>());
export const checkUserExistsSuccess = createAction('[User] Check User Exists Success', props<{ exists: boolean }>());
export const addUser = createAction('[User] Add User', props<{ user: User }>());
