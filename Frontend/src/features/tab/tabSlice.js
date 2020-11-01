import { createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        data: [],
        isLoading: true,
        error: {}
    },
    reducers: {
        list: (state, action) => {
            state.data = action.payload
            state.isLoading = false
        },
        create: (state, action) => {
            state.data.push(action.payload)
        },
        update: (state, action) => {
            state.data.flatMap(tab => {
                if (tab.id == action.payload.id) {
                    tab.name = action.payload.name
                }
            })
        },
        error: (state, action) => {
            state.error = action.payload ? action.payload : {}
        },
        destroy: (state, action) => {
            state.data = state.data.filter(tab => tab.id !== action.payload);

        }
    }
})

export const { list, update, create, error, destroy } = tabSlice.actions;

export const getTabs = () => dispatch => {
    fetch('http://localhost:4001/api/tabs')
        .then(async response => {
            const tabs = await response.json();
            dispatch(list(tabs.data));
        })

};

export const updateTab = (tab) => dispatch => {
    fetch(`http://localhost:4001/api/tabs/${tab.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ name: tab.name }),

    })
        .then(async response => {
            dispatch(update(tab));
        })
}

export const createTab = (name, callback) => dispatch => {
    fetch(`http://localhost:4001/api/tabs`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
        body: JSON.stringify({ name }),

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

export const deleteTab = (tab_id) => dispatch => {
    fetch(`http://localhost:4001/api/tabs/${tab_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        }
    }).then(async response => {
        dispatch(destroy(tab_id));
    })
}

export const selectTabs = state => {
    return state.tabs
};

export default tabSlice.reducer;
