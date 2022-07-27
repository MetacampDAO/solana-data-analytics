import { type PublicKey } from '@solana/web3.js';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'papaparse';


export default function parseCSV(filePath : any) {
  let file : any = fs.readFileSync(filePath, { encoding: 'utf-8' })
  return new Promise((resolve, reject) => {
    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results, file) => {
        resolve(results.data)
      },
      error (err : any, file) {
        reject(err)
      } 
    })
  })
}
