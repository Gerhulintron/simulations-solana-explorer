import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TransactionLog from './TransactionLog';
import TokenAccounts from './TokenAccounts';
import SolanaBalanceDisplay from "./SolanaBalanceDisplay";
import SolanaAccountSearch from "./SolanaAccountSearch";
import '../assets/styles/SimSolExplorerStyle.css';

const AccountDetails = () => {
    const { publicKey } = useParams();

    return (
        <div>
            <div>
                <SolanaAccountSearch/>
                <Link to="/">Return to Home</Link>
            </div>
            <h2>Account Details for {publicKey}</h2>
            <SolanaBalanceDisplay publicKey={publicKey} />
            <TransactionLog publicKey={publicKey} />
            <TokenAccounts publicKey={publicKey} />
        </div>
    );
};

export default AccountDetails;
