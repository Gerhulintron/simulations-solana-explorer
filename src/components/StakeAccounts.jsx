import React, { useState, useEffect } from 'react';
import { PublicKey, Connection } from '@solana/web3.js';
import '../assets/styles/SimSolExplorerStyle.css';

const StakeAccounts = ({ publicKey }) => {
    const [stakeAccounts, setStakeAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStakeAccounts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const connection = new Connection('https://distinguished-crimson-resonance.solana-mainnet.quiknode.pro/2018028efcf5287402f6d94d444f397195f2df4a/');
                const stakeAccounts = await connection.getParsedProgramAccounts(
                    new PublicKey("Stake11111111111111111111111111111111111111"),
                    {
                        filters: [
                            {
                                memcmp: {
                                    offset: 12,
                                    bytes: publicKey.toString(),
                                },
                            },
                        ],
                    }
                );
                setStakeAccounts(stakeAccounts);
            } catch (error) {
                setError('Error fetching stake accounts.');
                console.error('Error fetching stake accounts:', error);
            }

            setIsLoading(false);
        };

        if (publicKey) {
            fetchStakeAccounts();
        }
    }, [publicKey]);

    return (
        <div>
            <h1>Stake Accounts</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoading ? <div className="spinner"></div> : (
                <div>
                    {stakeAccounts.length > 0 ? (
                        <ul>
                            {stakeAccounts.map((account, index) => (
                                <li key={index}>
                                    <p><strong>Stake Account:</strong> {account.pubkey.toString()}</p>
                                    <pre>{JSON.stringify(account.account.data, null, 2)}</pre>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No stake accounts found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default StakeAccounts;
