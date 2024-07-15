import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import SolanaAccountSearch from './components/SolanaAccountSearch';
import AccountDetails from './components/AccountDetails';
import SolanaBalanceDisplay from "./components/SolanaBalanceDisplay";
import './assets/styles/SimSolExplorerStyle.css';
import SimSolExplorerNavBar from "./components/SimSolExplorerNavBar";
import TransactionDetail from "./components/TransactionDetail";
import StakeAccounts from "./components/StakeAccounts";


function App() {
    const { publicKey } = useWallet();

    return (
        <Router>
            <div className="App">
                <SimSolExplorerNavBar />
                <h1>Explore Solana</h1>
                <Routes>
                    <Route path="/" element={<SolanaAccountSearch />} />
                    <Route path="/account/:publicKey" element={<AccountDetails />} />
                    <Route path="/tx/:signature" element={<TransactionDetail />} />
                    <Route path="/stake/:publicKey" element={<StakeAccounts publicKey={publicKey} />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;