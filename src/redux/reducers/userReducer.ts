import { ACTION_TYPES } from "../actionTypes";
import type { User, UsersListResponse } from "../reduxTypes/api";

interface UserState {
  usersList: UsersListResponse | null;
  searchString: string;
}

const initialState: UserState = {
  usersList: null,
  searchString: "",
};

export const userReducer = (
  state = initialState,
  action: { type: string; payload?: any }
): UserState => {
  switch (action.type) {
    case ACTION_TYPES.GET_USERS_LIST:
      return {
        ...state,
        usersList: action.payload,
      };

    case ACTION_TYPES.SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload,
      };

    case ACTION_TYPES.ADD_USER:
      return {
        ...state,
        usersList: state.usersList
          ? {
              ...state.usersList,
              data: [action.payload, ...state.usersList.data],
              total: state.usersList.total + 1,
            }
          : {
              page: 1,
              per_page: 6,
              total: 1,
              total_pages: 1,
              data: [action.payload],
            },
      };

    case ACTION_TYPES.REMOVE_USER:
      return {
        ...state,
        usersList: state.usersList
          ? {
              ...state.usersList,
              data: state.usersList.data.filter(
                (user: User) => user.id !== action.payload
              ),
              total: state.usersList.total - 1,
            }
          : state.usersList,
      };

    case ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        usersList: state.usersList
          ? {
              ...state.usersList,
              data: state.usersList.data.map((user: User) =>
                user.id === action.payload.id ? { ...user, ...action.payload } : user
              ),
            }
          : state.usersList,
      };

    default:
      return state;
  }
};
