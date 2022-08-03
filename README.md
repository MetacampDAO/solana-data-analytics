# solana-data-analytics
Data Extraction from Solana Blockchain + Data Visualization

1. Add Assets.csv in src/assets folder
2. Add ca.crt in elasticsearch/certs folder
3. Set environment variables in .env for 
ES_HOST=XXX
ES_PORT=XXX
ES_INDEX=XXX
ELASTIC_USERNAME=XXX
ELASTIC_PASSWORD=XXX
HTTPS_RPC_ENDPOINT=XXX
WSS_RPC_ENDPOINT=XXX
ASSET_CSV_PATH=src/assets/Assets.csv
4. Run npx ts-node src/scrapData.ts
