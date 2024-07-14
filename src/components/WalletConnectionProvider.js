import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const endpoint = 'https://distinguished-crimson-resonance.solana-mainnet.quiknode.pro/2018028efcf5287402f6d94d444f397195f2df4a/';

const WalletConnectionProvider = ({ children }) => {
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletConnectionProvider;
