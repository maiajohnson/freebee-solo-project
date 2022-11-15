const trialsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TRIAL":
            return action.payload;
        default:
            return state;
    }
};

export default trialsReducer;