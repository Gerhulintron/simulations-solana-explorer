import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionLog from './TransactionLog';
import TokenAccounts from './TokenAccounts';

const AccountDetails = () => {
    const { publicKey } = useParams();

    return (
        <div>
            <h2>Account Details for {publicKey}</h2>
            <TransactionLog publicKey={publicKey} />
            <TokenAccounts publicKey={publicKey} />
        </div>
    );
};

export default AccountDetails;
