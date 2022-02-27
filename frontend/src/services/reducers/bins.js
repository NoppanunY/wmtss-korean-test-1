import {
    BIN_LOADING,
    BIN_LOADED,
    ADD_BIN,
    EDIT_BIN,
    DELETE_BIN,
} from '../../services/constants/actionType';

const initialState = {
    bin: null,
    isLoading: true
};

const bins = (state = initialState, action) => {
    switch (action.type){
        case BIN_LOADING:
            return { ...state, isLoading: true }
        case BIN_LOADED:
            return { ...state, bin: action.data, isLoading: false };
        case ADD_BIN:
            return { ...state, bin: [...state.bin, action.data], isLoading: false }
        case EDIT_BIN:
            return {
                ...state,
                bin: state.bin.map(function(item){return (item.id === action.data.id) ? action.data: item}),
                isLoading: false
            }
        case DELETE_BIN:
            return {
                ...state,
                bin : state.bin.filter((bin) => bin.id !== action.data),
                isLoading: false
            }
        default:    
            return state;
    }
}

export default bins;