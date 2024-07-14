// import React, { useEffect, useState } from 'react';
// import { Connection } from '@metaplex/js';
// import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
// import { SOLANA_ENDPOINT } from '../config';
//
// async function fetchNftMetadata(connection, ownerPublicKey) {
//     const metadata = await Metadata.findDataByOwner(connection, ownerPublicKey);
//     return metadata;
// }
//
// const FetchNFTsByPublicKey = ({ publicKey }) => {
//     const [nftMetadata, setNftMetadata] = useState([]);
//
//     useEffect(() => {
//         const fetchMetadata = async () => {
//             if (publicKey) {
//                 const connection = new Connection(SOLANA_ENDPOINT);
//                 const metadata = await fetchNftMetadata(connection, publicKey);
//                 setNftMetadata(metadata);
//             }
//         };
//
//         fetchMetadata();
//     }, [publicKey]);
//
//     return (
//         <div className="container">
//             <h3>NFT Metadata</h3>
//             <p>Number of NFTs: {nftMetadata.length}</p>
//             <ul>
//                 {nftMetadata.map((metadata) => (
//                     <li key={metadata.mint}>
//                         <p><strong>Name:</strong> {metadata.data.name}</p>
//                         <p><strong>Mint:</strong> {metadata.mint}</p>
//                         <p><strong>Image URL:</strong> {metadata.data.image}</p>
//                         <p><strong>Metadata URI:</strong> {metadata.data.uri}</p>
//                         <img src={metadata.data.image} alt={metadata.data.name} style={{ width: '100px', height: '100px' }} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
//
// export default FetchNFTsByPublicKey;
