// Copyright (c) 2016 by Scott Carlson  sacarlson_2000@yahoo.com
// Jan 15 2016 first edition
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server({hostname:'horizon-testnet.stellar.org', secure: true, port: 443});
// from php
// send_asset($to_account_id, $amount, $memo, $asset_code, $issuer,$from_seed)
// to send XLM or native  use asset_code = "native" and empty string for issuer;
// example command line:
// node send_asset 'GATSLMDSVV4MQWGDUOL4XQ65LZ46GJ5G7N3JFEN332JJCGX52F5AODSK' 1.12 'cool dude'  'EQD' 'GAMEX...'  'SCROKYZNDS...'
// note this take about 10 sec to run and return

StellarSdk.Network.useTestNet();

var memo_mode = "auto";
var email_flag = false;
// fixme this value to_account_id_balance has to be checked before we run to verify we can send the funds
// this is temp just to test the rest
var to_account_id_balance = 20.1;
 
var to_account_id = process.argv[2];
var amount = process.argv[3];

var memo = process.argv[4];
var asset_code = process.argv[5];
var issuer = process.argv[6];

var from_seed = process.argv[7];

//var memo = "test";

//console.log(from_seed);
//console.log(to_account_id);
//console.log(amount);

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

  function sendPaymentTransaction() {
        //console.log("sendPaymentTransaction");
        //var key = StellarSdk.Keypair.fromSeed(from_seed);
        if (asset_code == "native") {
          var asset_obj = new StellarSdk.Asset.native();
          if (to_account_id_balance == 0){
            if (amount < 20) {
              console.log("destination account not active must send min 20 native, abort send");
              return;
            }
            createAccount(key);
          }else {
            createPaymentTransaction(key,asset_obj);
          }
        }else {
          if (to_account_id_balance == 0){
            console.log("destination account not active, can only send native, abort send");
            return;
          }
          //console.log("asset_code: " + asset_code + " issuer: " + issuer);
          var asset_obj = new StellarSdk.Asset(asset_code, issuer);
          //console.log("started payment: ");
          createPaymentTransaction(key,asset_obj);
        }        
      }    
  

      function createPaymentTransaction(key,asset_obj) {
          //console.log("createPaymentTransaction");
          var operation = createPaymentOperation(asset_obj);
          createTransaction(key,operation);
        }

     function createPaymentOperation(asset_obj) {
                 //console.log("creatPaymentOperation");                 
                 return StellarSdk.Operation.payment({
                   destination: to_account_id,
                   amount: fix7dec(amount),
                   asset: asset_obj
                 });
               }

   sendPaymentTransaction()
