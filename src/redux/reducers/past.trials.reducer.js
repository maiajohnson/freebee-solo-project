const pastTrialsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_PAST_TRIALS":
            return action.payload;
        default:
            return state;
    }
};
    
export default pastTrialsReducer;