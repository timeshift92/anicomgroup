import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        error: {},
        isLoading: true
    },
    reducers: {
        list: (state, action) => {
            state.data = action.payload
            state.isLoading = false
        },
        create: (state, action) => {
            state.data.push(action.payload)
            state.error = {}
        },
        update: (state, action) => {
            state.data.flatMap(tab => {
                if (tab.id == action.payload.id) {
                    tab.name = action.payload.name
                }
            })
            state.error = {}
        },
        error: (state, action) => {
            state.error = action.payload ? action.payload : {}
        },
        destroy: (state, action) => {
            state.data = state.data.filter(tab => tab.id !== action.payload);

        }
    }
})

export const { list, update, create, destroy, error } = productSlice.actions;

export const getProducts = (tab_id) => dispatch => {
    fetch(`http://localhost:4001/api/products${tab_id ? '?tab=' + tab_id : ''}`)
        .then(async response => {
            const tabs = await response.json();
            dispatch(list(tabs.data));
        })

};

export const updateProducts = (tab) => dispatch => {
    fetch(`http://localhost:4001/api/tabs/${tab.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "multipart/form-data"
        },
        body: tab,

    })
        .then(async response => {
            dispatch(update(tab));
        })
}

export const createProduct = (tab, callback) => dispatch => {
    fetch(`http://localhost:4001/api/products`, {
        method: "POST",
        headers: {
            // 'Content-Type': "multipart/form-data;",
            'Accept': "application/json"
        },
        body: tab,

    })
        .then(async response => {
            const result = await response.json()
            if (response.status >= 200 && response.status <= 299) {
                dispatch(create(result.data));
                callback()
            } else {
                dispatch(error(result.errors));
            }
        })
}

export const deleteProduct = (product_id) => dispatch => {
    fetch(`http://localhost:4001/api/products/${product_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        }
    }).then(async response => {
        dispatch(destroy(product_id));
    })
}

export const selectProducts = state => {
    return state.products
};

export default productSlice.reducer;
