import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Transaction } from '../components/Transaction'

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    // use effect mainly for reuests that involve http (async stuff)
    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //console.log(context);
    return (
        <>
            <h3>History</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => <Transaction key={transaction.id} transaction={transaction} />)}
            </ul>
        </>
    )
}