import subscribeAccount from "./helper/subscribeAccount";
import parseCSV from "./helper/parseCSV";
import { connectedCluster } from "./helper/connectToCluster";
import { PublicKey } from '@solana/web3.js';
import * as dotenv from 'dotenv';
import { createIndex } from './elasticsearch/elasticsearch'
import { poolMappings } from './elasticsearch/mappings'

dotenv.config()



const filePath = `${process.env.ASSET_CSV_PATH}`

// Subscribe from File Input
async function updateFile(filePath: any) {

    // Extract assets from file
    let data = await parseCSV(filePath)

    // Create elasticsearch index with custom mappings
    try {
        await createIndex(`${process.env.ES_INDEX}`, poolMappings)
    } catch (e) {
        console.log(e)
    }

    // Subscribe to assets on blockchain changes
    for (let item of data as any[]) {
        let subscriptionId = await subscribeAccount(connectedCluster, new PublicKey(item.pubKey), item)
        console.log(`${item.provider}, ${item.product}, ${item.token}, ${item.pubKey}, Subscription ID: ${subscriptionId}`)
    }	
    
}



updateFile(filePath)
