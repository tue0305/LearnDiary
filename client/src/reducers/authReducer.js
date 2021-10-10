export const authReducer = (state, action) => {
    const { type, payload: {isAuthenticated, user} } = action;
    
    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
            break;
    
        default:
            return state
            break;
    }
}