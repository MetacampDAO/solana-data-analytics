import subscribeAccount from "./helper/subscribeAccount";
import parseCSV from "./helper/parseCSV";
import { connectedCluster } from "./helper/connectToCluster";
import { PublicKey } from '@solana/web3.js'


const filePath = 'src/assets/lfntyAccounts.csv'

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