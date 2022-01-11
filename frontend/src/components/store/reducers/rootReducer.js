const initialState = {
    bins: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SET_BINS':
            return {...state, bins: action.data};
        case 'ADD_BIN':
            return {...state, bins: [...state.bins, action.data]}
        default:
            return state;
    }
}

export default rootReducer;