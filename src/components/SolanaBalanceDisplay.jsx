import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { SOLANA_ENDPOINT } from '../config';

const SolanaBalanceDisplay = ({ publicKey }) => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                const connection = new Connection(SOLANA_ENDPOINT);
                const balance = await connection.getBalance(new PublicKey(publicKey));
                setBalance(balance / 1e9); // Convert lamports to SOL
            }
        };

        fetchBalance();
    }, [publicKey]);

    return (
        <div>
            {publicKey && (
                <p>SOL Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
            )}
        </div>
    );
};

export default SolanaBalanceDisplay;
