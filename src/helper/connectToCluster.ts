import { type Cluster, Connection, clusterApiUrl, Commitment } from '@solana/web3.js'
import * as dotenv from 'dotenv';

dotenv.config()

// Export wallet cluster and cluster connection

const options = {
    commitment: "confirmed" as Commitment,
    wsEndpoint: `${process.env.WSS_RPC_ENDPOINT}`
}

export let cluster : Cluster
export let connectedCluster = new Connection(`${process.env.HTTPS_RPC_ENDPOINT}`, options)