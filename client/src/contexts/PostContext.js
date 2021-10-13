import { postReducer } from "../reducers/postReducer";

import { createContext, useReducer, useEffect } from "react";
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN_NAME,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // State
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });

  //Get all Posts
  const getPosts = async () => {
    try {
      const response = await await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_LOADED_FAIL,
      });
    }
  };

  // Posts context data
  const postContextData = { getPosts, postState };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
