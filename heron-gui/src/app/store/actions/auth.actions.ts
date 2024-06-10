import { createAction, props } from '@ngrx/store';

export const authSuccess = createAction('[Auth] Auth Success', props<{ token: string }>());
export const authFailure = createAction('[Auth] Auth Failure', props<{ error: string }>());
export const loadAuth = createAction('[Auth] Load Auth');
