import { createContext, useReducer, useEffect  } from "react";
import { authReducer } from "../reducers/authReducer";

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

import Axios from "axios";
import setAuthToken from '../utils/setAuthToken'


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate the user
  const loadUser = async (user) => {
    try {
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
      }

      const response = await Axios.get(`${apiUrl}/auth`)
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true.valueOf,
            user: response.data.user
          }})
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
      setAuthToken(null)
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: false,
          user: null
        }})
      return { success: false, message: error.message }; 
    }
  }

  useEffect(() => loadUser(), [])

  // Login
  const loginUser = async userForm => {
    try {
      const response = await Axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken);
      }
      await loadUser()


      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
    };
    
    // Context data
    const authContextData = {loginUser, authState}

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider
