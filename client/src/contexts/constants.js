export const apiUrl = process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "URL";

// save accessToken in local Storage
export const LOCAL_STORAGE_TOKEN_NAME = `Learn-Diary`

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
