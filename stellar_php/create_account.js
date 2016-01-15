// Copyright (c) 2016 by Scott Carlson  sacarlson_2000@yahoo.com
// Jan 15 2016 first edition
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server({hostname:'horizon-testnet.stellar.org', secure: true, port: 443});
// from php
// create_account($to_account_id, $start_balance, $memo, $from_seed)
// example command line:
// node create_account  GATSLMDSVV4MQWGDUOL4XQ65LZ46GJ5G7N3JFEN332JJCGX52F5AODSK 1.12 'cool dude'  SCROKYZNDS...

StellarSdk.Network.useTestNet();

var memo_mode = "auto";
var email_flag = false;
 
var to_account_id = process.argv[2];
var start_balance = process.argv[3];

var memo = process.argv[4];
var from_seed = process.argv[5];
//var memo = "test";

//console.log(from_seed);
//console.log(to_account_id);
//console.log(start_balance);

var key = StellarSdk.Keypair.fromSeed(from_seed);

function createAccount(key) {
          //console.log("start createAccount");
          var operation = createAccountOperation();
          createTransaction(key,operation);
        }

function createAccountOperation() {
                 return StellarSdk.Operation.createAccount({
                   destination: to_account_id,
                   startingBalance: fix7dec(start_balance)
                 });
               }

function fix7dec(string) {
        var num = Number(string).toFixed(7);
        string = num.toString();
        return string;
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
        } else if (memo_mode.value == "memo.id") {
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
            console.log(transactionResult);
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

     createAccount(key);

