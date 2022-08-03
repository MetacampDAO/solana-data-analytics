import { estypes , Client } from '@elastic/elasticsearch';
import { float, MappingTypeMapping } from '@elastic/elasticsearch/lib/api/types';
import { poolMappings } from './mappings';
import * as dotenv from 'dotenv';
import * as fs from 'fs';


export interface Document {
    '@timestamp': Date,
    timeId: number,
    provider: string,
    product: string,
    token: string,
    price: number
    pubKey: string,
    amount: number,
    prevAmount: number,
    volume: number,
    decimals: number,
    slot: number,
    usdValue: number,
}

dotenv.config()

const client = new Client(
    {
        node: `https://${process.env.ES_HOST}:9210`,
        auth: {
            username: `${process.env.ELASTIC_USERNAME}`,
            password: `${process.env.ELASTIC_PASSWORD}`
        },
        tls: {
            ca: fs.readFileSync('src/elasticsearch/certs/ca.crt'),
            rejectUnauthorized: false
          }

    }
)

export async function createIndex(index : string, mappings: MappingTypeMapping){
    const result = await client.indices.create({
        index,
        mappings
    })
    return result
}

export default async function es(provider: string, product : string, token : string, pythPrice: number, pubKey: any, amount: number, decimals : number, slot: number, usdValue: number){

    let prevAmount : number;
    let volume : number;
    let prevDocs;

    try {
        prevDocs = (await client.search<Document>({
            index: `${process.env.ES_INDEX}`,
            body: {
                size: 3,
                sort: [
                    {
                        "@timestamp": "desc"
                    }
                ],
                query: {
                    bool: {
                        filter: [
                            { term: { "provider.keyword": provider } },
                            { term: { "product.keyword": product } },
                            { term: { "token.keyword": token } }
                        ]
                    }
                }
            }
        })).hits.hits
        prevAmount = prevDocs[0]._source!.amount
    } catch (e) {
        console.log(e)
        prevAmount = amount
    }
    volume = Math.abs(amount - prevAmount)

    const result = await client.index<Document>({
        index: `${process.env.ES_INDEX}`,
        'id': `${provider}_${product}_${token}_${Date.now()}`,
        document: { 
            '@timestamp': new Date(Date.now()),
            timeId: Date.now(),
            provider,
            product,
            token,
            price: pythPrice,
            pubKey,
            amount,
            prevAmount,
            volume,
            decimals,
            slot,
            usdValue,
        }
    })


    return result
}