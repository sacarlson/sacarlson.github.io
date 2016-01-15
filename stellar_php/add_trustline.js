// Copyright (c) 2016 by Scott Carlson  sacarlson_2000@yahoo.com
// Jan 15 2016 first edition
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server({hostname:'horizon-testnet.stellar.org', secure: true, port: 443});
// from php
// add_trustline($asset_code, $issuer, $to_seed)
// example command line:
// node add_trustline.js 'EQD' GATSLMDSVV4MQWGDUOL4XQ65LZ46GJ5G7N3JFEN332JJCGX52F5AODSK 'SAMEB...'

StellarSdk.Network.useTestNet();

var asset_code = process.argv[2];
var issuer = process.argv[3];
var to_seed = process.argv[4];
var memo_mode = "auto";
var memo = "add trust";
var email_flag = false;

var key = StellarSdk.Keypair.fromSeed(to_seed);

function addTrustlineOperation(asset_code, issuer_account_id) {
                 //asset_code examples "USD", "CHP", "EQD"
                 asset = new StellarSdk.Asset(asset_code, issuer_account_id);
                 return StellarSdk.Operation.changeTrust({asset: asset}); 
               }

function createTransaction(key,operation) {
        if (memo_mode == "auto") {
          if (isNaN(memo)) {
            //console.log("auto memo.text");
            var memo_tr = StellarSdk.Memo.text(memo);
          } else {
            //console.log("auto memo.id");
            var memo_tr = StellarSdk.Memo.id(memo);
          }
        } else if (memo_mode == "memo.id") {
          //console.log("manual memo.id");
          var memo_tr = StellarSdk.Memo.id(memo);
        } else {
          //console.log("manual memo.text");
          var memo_tr = StellarSdk.Memo.text(memo);
        }
        server.loadAccount(key.accountId())
          .then(function (account) {
             transaction = new StellarSdk.TransactionBuilder(account,{fee:100, memo: memo_tr})            
            .addOperation(operation)          
            .addSigner(key)
            .build();
           if ( email_flag != true ) { 
             //console.log("horizon mode sending tx");                               
             server.submitTransaction(transaction); 
           }          
          })
          .then(function (transactionResult) {
            //console.log(transactionResult);
            //console.log(transaction.toEnvelope().toXDR().toString("base64"));
            var envelope_b64 = transaction.toEnvelope().toXDR().toString("base64");
            if ( email_flag ) {
              console.log("horizon mode email_flag detected");  
              //email_funds_now ();
              console.log(envelope_b64);
              email_flag = false;
            }             
          })
          .catch(function (err) {
            console.log(err);
            email_flag = false; 
          });
        }

       
        var operation = addTrustlineOperation(asset_code, issuer);
        createTransaction(key,operation);
