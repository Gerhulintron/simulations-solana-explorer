import React, { useState, useEffect, useCallback } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import '../assets/styles/SimSolExplorerStyle.css';

const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
};

const TransactionLog = ({ publicKey }) => {
    const { connection } = useConnection();
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [transactionTable, setTransactionTable] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSignature, setLastSignature] = useState(null);

    const fetchTransactions = useCallback(debounce(async (address, numTx, before = null) => {
        setIsLoading(true);
        setError(null);
        try {
            const pubKey = new PublicKey(address);
            const options = { limit: numTx, before };
            const transactionList = await connection.getSignaturesForAddress(pubKey, options);
            const signatureList = transactionList.map(transaction => transaction.signature);
            const transactionDetails = await connection.getParsedTransactions(signatureList, { maxSupportedTransactionVersion: 0 });
            setTransactionHistory(prev => [...prev, ...transactionDetails]);
            if (transactionList.length > 0) {
                setLastSignature(transactionList[transactionList.length - 1].signature);
            }
        } catch (error) {
            setError('Error fetching transactions.');
            console.error('Error fetching transactions:', error);
        }
        setIsLoading(false);
    }, 3000), []); // 3-second debounce to limit requests

    useEffect(() => {
        if (publicKey) {
            // Clear the table when the public key changes
            setTransactionHistory([]);
            setTransactionTable(null);
            setLastSignature(null);
            fetchTransactions(publicKey.toString(), 15);
        }
    }, [publicKey, fetchTransactions]);

    useEffect(() => {
        if (transactionHistory && transactionHistory.length > 0) {
            buildTransactionTable();
        }
    }, [transactionHistory]);

    const buildTransactionTable = () => {
        const header = (
            <thead>
            <tr>
                <th>Transaction Signature</th>
                <th>Slot</th>
                <th>Date</th>
                <th>Result</th>
            </tr>
            </thead>
        );
        const rows = transactionHistory.map((transaction, i) => {
            const date = new Date(transaction.blockTime * 1000).toLocaleDateString();
            return (
                <tr key={i}>
                    <td>{transaction.transaction.signatures[0]}</td>
                    <td>{transaction.slot.toLocaleString("en-US")}</td>
                    <td>{date}</td>
                    <td>{transaction.meta.err ? 'Failed' : 'Success'}</td>
                </tr>
            );
        });
        setTransactionTable(
            <table>
                {header}
                <tbody>{rows}</tbody>
            </table>
        );
    };

    const loadMoreTransactions = async () => {
        if (!publicKey || !lastSignature) return;
        await fetchTransactions(publicKey.toString(), 15, lastSignature);
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>{transactionTable}</div>
            {lastSignature && (
                <div>
                    <button onClick={loadMoreTransactions} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Load More Transactions'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TransactionLog;
