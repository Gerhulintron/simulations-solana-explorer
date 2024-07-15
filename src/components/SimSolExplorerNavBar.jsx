import React from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import SolanaBalanceDisplay from './SolanaBalanceDisplay';
import '../assets/styles/SimSolExplorerStyle.css';

const SimSolExplorerNavBar = () => {
    const { publicKey } = useWallet();

    return (
        <header className="navbar">
            <Link to="/"><h1 className="navbar-title">Simulations Solana Explorer</h1></Link>
            <nav className="navbar-links">
                <Link to="/">Home</Link>
                {publicKey && <Link to={`/account/${publicKey.toString()}`}>Account</Link>}
            </nav>
            <div className="navbar-wallet">

                {publicKey && (
                    <div className="wallet-info">
                        <p><strong>Connected Wallet:</strong> {publicKey.toString()}</p>
                        <SolanaBalanceDisplay publicKey={publicKey.toString()} />
                    </div>
                )}
                <WalletMultiButton />
            </div>
        </header>
    );
};

export default SimSolExplorerNavBar;
