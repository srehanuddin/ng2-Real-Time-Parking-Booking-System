import { ActionReducer, Action } from '@ngrx/store';

export const ActionType = {
    User : "User"
};

export function appReducer(state: any, action: Action) {
    
switch (action.type) {
        case ActionType.User:
            return action.payload;
        default:
            return state;
    }
}