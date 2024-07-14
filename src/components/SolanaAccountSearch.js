import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Connection, PublicKey } from '@solana/web3.js';
import { SOLANA_ENDPOINT } from '../config';

const SolanaAccountSearch = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSearch = async () => {
        setError('');
        try {
            const connection = new Connection(SOLANA_ENDPOINT);
            const publicKey = new PublicKey(input);
            const accountInfo = await connection.getAccountInfo(publicKey);
            if (accountInfo) {
                navigate(`/account/${publicKey.toString()}`);
            } else {
                setError('Account not found or invalid address.');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid account address or unable to fetch account details.');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter Solana account address"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SolanaAccountSearch;
