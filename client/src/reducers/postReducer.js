import {
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
  } from "./constants";
export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoaded: false,
      };
      break;
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postsLoaded: false,
      };
      break;

    default:
      return state;
      break;
  }
};
