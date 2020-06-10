export default (state, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                success: action.payload,
            };
        case "LOGIN_USER":
            return {
                ...state,
                success: action.payload,
            };
        case "LOGOUT_USER":
            return {
                ...state,
                success: action.payload,
            };
        case "ACTIVE_USERS":
            return {
                ...state,
                user: action.payload,
            };
        case "ERROR_USER":
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
