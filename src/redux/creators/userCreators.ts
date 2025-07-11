import { ACTION_TYPES } from "../actionTypes";
import type { User, UsersListResponse } from "../reduxTypes/api";

// Set full users list
export const getUsersListCreator = (payload: UsersListResponse | null) => {
  return {
    type: ACTION_TYPES.GET_USERS_LIST,
    payload,
  };
};

// Set search string
export const setSearchStringCreator = (searchString: string) => {
  return {
    type: ACTION_TYPES.SET_SEARCH_STRING,
    payload: searchString,
  };
};

// Add a single user
export const addUserCreator = (user: User) => {
  return {
    type: ACTION_TYPES.ADD_USER,
    payload: user,
  };
};

// Remove a user by ID
export const removeUserCreator = (userId: number) => {
  return {
    type: ACTION_TYPES.REMOVE_USER,
    payload: userId,
  };
};
