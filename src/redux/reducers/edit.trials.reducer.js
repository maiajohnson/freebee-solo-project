const editTrialsReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_EDIT_TRIAL":
            return action.payload;
        case "UPDATE_EDIT_TRIAL":
            return {
                ...state,
                ...action.payload,
            };
    };
    return state;
}

export default editTrialsReducer;