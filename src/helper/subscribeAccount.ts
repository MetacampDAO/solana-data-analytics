import type {
    Connection,
    ParsedAccountData,
    AccountInfo,
} from '@solana/web3.js';

import { 
    PublicKey 
} from '@solana/web3.js';

import { 
    AccountLayout, 
} from "@solana/spl-token";

import es from '../elasticsearch/elasticsearch'

import pyth from '../helper/getPythPrice'
import getPythPrice from '../helper/getPythPrice';


    
// Subscribe from File function
export default async function subscribeAccount(connection : Connection, pubKey: PublicKey, data? : any) {
    
    let accountData : any
    let slot
    let usdValue : number
    let pythPrice : string | number

    // Subscribe accountInfo
    let onAccountChange = connection.onAccountChange(
        pubKey, 
        async (accountInfo, context) => {

            // Check if ATA and extract ATA data
            if (accountInfo!.data.length > 0) {
                accountData = AccountLayout.decode(accountInfo!.data);
                slot = context.slot

                // Get Pyth Price Feed
                let pythPrice = await getPythPrice(connection, 'mainnet-beta', data.pythSymbol)

                // For Price Feeds not available on Pyth Network
                if ( typeof pythPrice === 'string') {

                    const usdcInfo : AccountInfo<Buffer> | null = await connection.getAccountInfo(new PublicKey(pythPrice), 'confirmed')!
                    const usdcData = AccountLayout.decode(usdcInfo!.data)
                    pythPrice = Number(usdcData.amount) / Number(accountData.amount)
                    usdValue = (pythPrice * Number(accountData.amount)) / (10**Number(data.decimals))

                // If Price Feeds available on Pyth Network
                } else {
                    usdValue = (Number(pythPrice) * Number(accountData.amount)) / (10**Number(data.decimals))
                }
                console.log(`${data.provider}, ${data.product}, ${Number(accountData.amount)/(10**Number(data.decimals))} ${data.token}, $${usdValue}`)

                // Ingest data to Elasticsearch
                let result = await es(data.provider, data.product, data.token, Number(pythPrice), pubKey.toString(), Number(accountData.amount)/(10**Number(data.decimals)), Number(data.decimals), Number(slot), Number(usdValue))
                console.log(result? "Success" : "Error")
            }      
        }, 
        'confirmed')

    return onAccountChange;
};