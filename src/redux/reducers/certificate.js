const initialState = {
    name: null,
    image: null,
    fields: [],    
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_CERTIFICATE':
            return { ...state, ...action.data}
        default:
            return state;
    }
}

export default reducer