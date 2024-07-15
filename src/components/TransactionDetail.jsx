import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

const TransactionDetail = () => {
    const { signature } = useParams();
    const { connection } = useConnection();
    const [transactionDetail, setTransactionDetail] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTransactionDetail = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const transaction = await connection.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0 });
                setTransactionDetail(transaction);
            } catch (error) {
                setError('Error fetching transaction details.');
                console.error('Error fetching transaction details:', error);
            }
            setIsLoading(false);
        };

        fetchTransactionDetail();
    }, [signature, connection]);

    return (
        <div>
            <h1>Transaction Detail</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoading ? <div className="spinner"></div> : (
                <div>
                    {transactionDetail ? (
                        <pre>{JSON.stringify(transactionDetail, null, 2)}</pre>
                    ) : (
                        <p>No transaction details found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransactionDetail;
