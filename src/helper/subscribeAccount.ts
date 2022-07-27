import type {
    PublicKey,
    Connection,
} from '@solana/web3.js';

import { 
    AccountLayout, 
} from "@solana/spl-token";
    
// Subscribe from File function
export default async function subscribeAccount(connection : Connection, pubKey: PublicKey, data? : any) {
    
    let accountData
    let slot

    // Subscribe accountInfo
    let onAccountChange = connection.onAccountChange(
        pubKey, 
        async (accountInfo, context) => {
            if (accountInfo!.data.length > 0) {
                
                console.log("Token                                         Balance");
                console.log("------------------------------------------------------------");
                accountData = AccountLayout.decode(accountInfo!.data);
                console.log(`${pubKey}   ${Number(accountData.amount)/(10**Number(data.decimals))}`);
            }
            slot = context.slot
            console.log(slot)
        }, 
        'confirmed')

    return onAccountChange;
};