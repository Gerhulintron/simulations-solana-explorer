import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import SolanaAccountSearch from "./SolanaAccountSearch";

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
        <div id="transaction-detail-container" className="data-container">
            <SolanaAccountSearch/>
            <h1>Transaction Detail</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoading ? <div className="spinner"></div> : (
                <div>
                    {transactionDetail ? (
                        <div>
                            <h2>Transaction Signature</h2>
                            <p>{signature}</p>
                            <h2>Slot</h2>
                            <p>{transactionDetail.slot}</p>
                            <h2>Block Time</h2>
                            <p>{new Date(transactionDetail.blockTime * 1000).toLocaleString()}</p>
                            <h2>Result</h2>
                            <p>{transactionDetail.meta.err ? 'Failed' : 'Success'}</p>
                            <h2>Fee</h2>
                            <p>{transactionDetail.meta.fee} lamports</p>
                            <h2>Token Balances</h2>
                            <div>
                                {transactionDetail.meta.preTokenBalances.map((balance, index) => (
                                    <div key={index}>
                                        <h3>Pre Token Balance {index + 1}</h3>
                                        <p>Account: {balance.accountIndex}</p>
                                        <p>Mint: {balance.mint}</p>
                                        <p>Owner: {balance.owner}</p>
                                        <p>Amount: {balance.uiTokenAmount.uiAmountString}</p>
                                    </div>
                                ))}
                                {transactionDetail.meta.postTokenBalances.map((balance, index) => (
                                    <div key={index}>
                                        <h3>Post Token Balance {index + 1}</h3>
                                        <p>Account: {balance.accountIndex}</p>
                                        <p>Mint: {balance.mint}</p>
                                        <p>Owner: {balance.owner}</p>
                                        <p>Amount: {balance.uiTokenAmount.uiAmountString}</p>
                                    </div>
                                ))}
                            </div>
                            <h2>Accounts Involved</h2>
                            <ul>
                                {transactionDetail.transaction.message.accountKeys.map((account, index) => (
                                    <li key={index}>
                                        {account.pubkey.toString()} {account.signer ? '(Signer)' : ''} {account.writable ? '(Writable)' : ''}
                                    </li>
                                ))}
                            </ul>
                            <h2>Instructions</h2>
                            <ul>
                                {transactionDetail.transaction.message.instructions.map((instruction, index) => (
                                    <li key={index}>
                                        Program: {instruction.programId.toString()}
                                        <pre>{JSON.stringify(instruction, null, 2)}</pre>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No transaction details found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransactionDetail;
