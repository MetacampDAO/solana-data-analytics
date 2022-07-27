import subscribeAccount from "./subscribeAccount";
import parseCSV from "./parseCSV";
import { connectedCluster } from "./connectToCluster";
import { PublicKey } from '@solana/web3.js'


const filePath = './lfntyAccounts.csv'

// Subscribe from File Input
async function updateFile(filePath: any) {
    let data = await parseCSV(filePath)
    for (let item of data as any[]) {
        console.log(item.pubKey)
        let subscriptionId = await subscribeAccount(connectedCluster, new PublicKey(item.pubKey), item)
        console.log("Subscription Id:", subscriptionId)
    }	
}


updateFile(filePath)