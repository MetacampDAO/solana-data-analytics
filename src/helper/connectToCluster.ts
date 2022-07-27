import { type Cluster, Connection, clusterApiUrl } from '@solana/web3.js'

// Export wallet cluster and cluster connection
export let cluster : Cluster
export let connectedCluster = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')