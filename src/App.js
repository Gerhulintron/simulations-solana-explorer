import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import SolanaAccountSearch from './components/SolanaAccountSearch';
import AccountDetails from './components/AccountDetails';
import SolanaBalanceDisplay from "./components/SolanaBalanceDisplay";
import './assets/styles/SimSolExplorerStyle.css';


function App() {
    const { publicKey } = useWallet();

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Simulations Solana Explorer</h1>
                    <WalletMultiButton />
                    {publicKey && (
                        <div>
                            <h1>Connected Wallet Data</h1>
                            <p>Connected Wallet: {publicKey.toString()}</p>
                            <SolanaBalanceDisplay publicKey={publicKey.toString()} />
                        </div>
                    )}
                </header>
                <h1>Explore Solana</h1>
                <Routes>
                    <Route path="/" element={<SolanaAccountSearch />} />
                    <Route path="/account/:publicKey" element={<AccountDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;