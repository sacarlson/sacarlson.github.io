# QR code formats

The QR codes contain JSON encoded data structures.

## Contact

```javascript
{
    "stellar": {
        "account": {
            "id":       ACCOUNT_ID,
            "network":  NETWORK_CODE // (*)
        }
    }
}
```

*) Network is only needed if not stellar.org live network

## Payment request

```javascript
{
    "stellar": {
        "payment": {
            "destination":  ACCOUNT_ID,
            "network":      NETWORK_CODE, // (*)
            "amount":       AMOUNT,
            "asset": {      // (**)
                "code":     ASSET_CODE,
                "issuer":   ASSET_ISSER
            },
            "memo": {       // (***)
                "type":     MEMO_TYPE,
                "value":    MEMO
            }
        }
    }
}
```

*) Network is only needed if not stellar.org live network

**) Asset is only needed if not XLM

***) Optional

## Payment request with escrow

```javascript
{
    "stellar": {
        "payment": {
            "destination":  ACCOUNT_ID,
            "network":      NETWORK_CODE, // (*)
            "amount":       AMOUNT,
            "asset": {      // (**)
                "code":     ASSET_CODE,
                "issuer":   ASSET_ISSER
            },
            "memo": {       // (***)
                "type":     MEMO_TYPE,
                "value":    MEMO
            },
            "escrow": {     // (****)
                "publicID:   ACCOUNT_ID,
                "email":     EMAIL_ADDRESS,
                "expire_ts": TIMESTAMP_EXPIRE,
                "expire_dt": EXPIRE_DATE,
                "status":    TRANSACTION_STATUS,
                "fee":       ESCROW_FEE,
                "callback":  WEB_HOOK
            }
            
        },
        "version": PROTOCOL_VERSION   // (***)
    }
}
```

*) Network is only needed if not stellar.org live network

**) Asset is only needed if not XLM

***) Optional

****) Optional see OpenCart plugin for details


## Challenge/Response

```javascript
{
    "stellar": {
        "challenge": {
            "id":       ACCOUNT_ID,		// (*)
            "message":  MESSAGE,
            "url":      WEBHOOK_URL
        }
    }
}
```

*) If not provided, any account the user controls can be used

## Account export/import

```javascript
{
    "stellar": {
        "account": {
            "network": NETWORK_CODE
        },
        "key": SEED or encrypted seed
    }
}
```

Here, network is mandatory, since it defines *where* an account has been registered. 

## Transaction Envelope
```javascript
{
    "stellar": {
        "TransactionEnvelope": {          
            "base64":   XDR_blob,         // (***)
            "url":      WEBHOOK_URL,       // (**)
            "network":  NETWORK_CODE     // (*)
        }
    }
}
```
*) Network is only needed if not stellar.org live network
**) url WEBHOOK_URL is provided that would contain the base64 XDR_blob if base64 was not directly provided in QR-code
***) base64 XDR_blob of the transaction that could signed, partly signed or fully signed with any group of operations
note: XDR_blob can be optionaly URI encoded: var b64 = encodeURIComponent(b64);

example without URI encode:
{"stellar":{"TransactionEnvelope":{"base64": "AAAAAP5saRvcSy2CRQaDS1EnupAyg4GZMSQTstIT8nouoaDbAAAAZADz38cAAAADAAAAAAAAAAEAAAAcKzkwWExNLVBsZWFzZWNsaWNrOmdpZnQ1Lm9yZwAAAAEAAAAAAAAAAQAAAACpgG+RdZDZvmEzTNJPQtZAN5oRURCIMY5TiI00fGtC4QAAAAAAAAAAAAAnEAAAAAAAAAABLqGg2wAAAEBX6WVBqu4Hu3nemplLsHCUOteH6tPqsGfAhuKRAt4uTT2l3pPBTXt6UtbeoeiCAUOZwI8mV4/6cH9m1GHLmOwD", "network":"7ac33997"}}}

example with URI encode:
{"stellar":{"TransactionEnvelope":{"base64":AAAAAP5saRvcSy2CRQaDS1EnupAyg4GZMSQTstIT8nouoaDbAAAAZADz38cAAAADAAAAAAAAAAEAAAAcKzkwWExNLVBsZWFzZWNsaWNrOmdpZnQ1Lm9yZwAAAAEAAAAAAAAAAQAAAACpgG%2BRdZDZvmEzTNJPQtZAN5oRURCIMY5TiI00fGtC4QAAAAAAAAAAAAAnEAAAAAAAAAABLqGg2wAAAEBX6WVBqu4Hu3nemplLsHCUOteH6tPqsGfAhuKRAt4uTT2l3pPBTXt6UtbeoeiCAUOZwI8mV4%2F6cH9m1GHLmOwD,"network":"cee0302d"}}}


## Specifying a Network

NETWORK_CODE is the first eight hex characters of the SHA-256 hash of the network passphrase,

```javascript
function getHash(passphrase) {
    return new StellarSdk.Network(passphrase)
    .networkId().toString('hex').slice(0, 8);
}
```

Examples:

* Live net - "7ac33997"
* Test net - "cee0302d"
