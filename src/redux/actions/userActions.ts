import {
  getUsersListCreator,
  setSearchStringCreator,
} from "../creators/userCreators";

import {
  getUsersListService,
  deleteUserService,
  createUserService,
  updateUserService,
} from "../services/userService";

import type { AppDispatch } from "../store";
import type { CreateUserPayload, UpdateUserPayload } from "../reduxTypes/api";

// ✅ Get users list
export const getUsersListAction = (queryParam: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getUsersListService(queryParam);
      dispatch(getUsersListCreator(response));
    } catch (error) {
      console.error("Failed to fetch users list", error);
    }
  };
};

// ✅ Set search string
export const setSearchStringAction = (searchString: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setSearchStringCreator(searchString));
  };
};

// ✅ Create user
import { addUserCreator } from "../creators/userCreators"; // create this if needed

export const createUserAction = (user: CreateUserPayload) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await createUserService(user);
      dispatch(addUserCreator(response)); // update store manually
      return { success: true, data: response };
    } catch (error) {
      console.error("Create user failed:", error);
      return { success: false, error };
    }
  };
};


// ✅ Update user
export const updateUserAction = (user: UpdateUserPayload) => {
  return async (_dispatch: AppDispatch) => {
    try {
      const response = await updateUserService(user);
      return { success: true, data: response };
    } catch (error) {
      console.error("Update user failed:", error);
      return { success: false, error };
    }
  };
};

// ✅ Delete user
import { removeUserCreator } from "../creators/userCreators"; // create this too

export const deleteUserAction = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await deleteUserService(userId);
      dispatch(removeUserCreator(userId)); // update store manually
      return { success: true };
    } catch (error) {
      console.error("Delete user failed:", error);
      return { success: false, error };
    }
  };
};
