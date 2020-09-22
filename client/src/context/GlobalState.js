// since it's a smol app we will have one state for all the app
import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios';

// initial state
const initialState = {
    transactions: [],
    // for alerts
    error: null,
    loading: true
}

// create context
export const GlobalContext = createContext(initialState);

// to allow other components to access this, we need a provider
// since we are wrapping the components we have they are called children
export const GlobalProvider = ({ children }) => {
    // dispatch is for when we wanna call a reducer action
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    return (
        <GlobalContext.Provider value={{
            // we access whatever value we want from initState
            transactions: state.transactions,
            deleteTransaction,
            addTransaction,
            getTransactions,
            error: state.error,
            loading: state.loading
        }} >
            {children}
        </GlobalContext.Provider>
    )
}