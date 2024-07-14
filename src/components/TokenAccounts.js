import React, { useState, useEffect } from 'react';
import { Connection, GetProgramAccountsFilter } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SOLANA_ENDPOINT } from '../config';

const TokenAccounts = ({ publicKey }) => {
    const [nftMintAddresses, setNftMintAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTokenAccounts = async () => {
            setIsLoading(true);
            try {
                const connection = new Connection(SOLANA_ENDPOINT);
                const filters = [
                    { dataSize: 165 },
                    { memcmp: { offset: 32, bytes: publicKey.toString() } }
                ];
                const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, { filters });
                const mintAddresses = accounts.map(account => account.account.data.parsed?.info?.mint).filter(Boolean);
                setNftMintAddresses(mintAddresses);
            } catch (error) {
                console.error('Error fetching token accounts:', error);
            }
            setIsLoading(false);
        };

        if (publicKey) {
            fetchTokenAccounts();
        }
    }, [publicKey]);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : (
                nftMintAddresses.length > 0 ? (
                    <div>
                        <h3>NFT Mint Addresses</h3>
                        <pre>{JSON.stringify(nftMintAddresses, null, 2)}</pre>
                    </div>
                ) : (
                    <p>No NFT mint addresses found.</p>
                )
            )}
        </div>
    );
};

export default TokenAccounts;
