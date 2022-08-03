import { MappingTypeMapping } from "@elastic/elasticsearch/lib/api/types";

export const poolMappings : MappingTypeMapping = {
    "properties": {
      "@timestamp": {
        "type": "date"
      },
      "amount": {
        "type": "float"
      },
      "decimals": {
        "type": "byte"
      },
      "prevAmount": {
        "type": "float"
      },
      "product": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 128
          }
        }
      },
      "provider": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 128
          }
        }
      },
      "pubKey": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 128
          }
        }
      },
      "slot": {
        "type": "long"
      },
      "token": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 8
          }
        }
      },
      "usdValue": {
        "type": "float"
      },
      "volume": {
        "type": "float"
      },
      "price": {
        "type": "float"
      }
    }
}