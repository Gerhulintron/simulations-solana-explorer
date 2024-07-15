import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SolanaBalanceDisplay from './SolanaBalanceDisplay';
import TransactionLog from "./TransactionLog";
import TokenAccounts from "./TokenAccounts";

const AccountDetails = () => {
    const { publicKey } = useParams();

    return (
        <div>
            <h1>Account Details</h1>
            <p>Public Key: {publicKey}</p>
            <SolanaBalanceDisplay publicKey={publicKey} />
            <Link to={`/stake/${publicKey}`}>View Stake Accounts</Link>
            <TransactionLog publicKey={publicKey} />
            <TokenAccounts publicKey={publicKey} />
        </div>
    );
};

export default AccountDetails;
