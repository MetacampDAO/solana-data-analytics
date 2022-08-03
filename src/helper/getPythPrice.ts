import {
    PythHttpClient,
    getPythProgramKeyForCluster

} from "@pythnetwork/client"

import { 
    type Cluster,
    type Connection,
    PublicKey,
    type AccountInfo
} from '@solana/web3.js'

import { 
    AccountLayout, 
} from "@solana/spl-token";



export default async function getPythPrice(connection : Connection, cluster : Cluster, symbol : string ) {

    // CUSTOM: Check stablecoins and return 1
    if(symbol == "stable") {
        return 1

    // CUSTOM: Check for non-Pyth symbol, i.e. without ".", and return custom symbol
    } else if ( !symbol.includes('.') ) {
        return symbol

    // Check Pyth Price Feeds based on Symbol
    } else {
        const pythProgramId = getPythProgramKeyForCluster(cluster);
        const pythClient = new PythHttpClient(connection, pythProgramId);
        const data = await pythClient.getData();
        const price = data.productPrice.get(symbol)!
        if (price.status == 1) {
            return price.price
        }
    }

    


}