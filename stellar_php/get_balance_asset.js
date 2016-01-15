// Copyright (c) 2016 by Scott Carlson  sacarlson_2000@yahoo.com
// Jan 15 2016 first edition
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server({hostname:'horizon-testnet.stellar.org', secure: true, port: 443});
// from php
// get_balance_asset($account_id,$asset_code, $issuer)
// example command line:
// node get_balance_asset GATSLMDSVV4MQWGDUOL4XQ65LZ46GJ5G7N3JFEN332JJCGX52F5AODSK 'EQD'  'GAME...'
// node get_balance_asset GATSLMDSVV4MQWGDUOL4XQ65LZ46GJ5G7N3JFEN332JJCGX52F5AODSK 'native'  ''

StellarSdk.Network.useTestNet();

var account_id = process.argv[2];
var asset_code = process.argv[3];
var issuer = process.argv[4];

      function get_account_info(account_id,asset_code,callback) {        
        //console.log("get_account_info ");       
        server.accounts()
        .accountId(account_id)
        .call()
        .then(function (accountResult) {
          callback(accountResult,asset_code,issuer);                    
        })
        .catch(function (err) {
          console.log("got error in get_account_info");
          console.error(err);         
        })        
      }

    function display_balance(account_obj,asset_code,issuer) {
      var balance = 0;
      if (account_obj.name !== "NotFoundError"){
        //console.log("found account");
        account_obj.balances.forEach(function(entry) {
          //console.log(entry.asset_type);
          if (entry.asset_type == "native" && asset_code == "native"){
            balance = entry.balance;
          }
          if (entry.asset_code == asset_code) {
            if (entry.issuer == issuer) {
              balance = entry.balance;
            }
          }                          
        });
      }
      console.log(balance);
      //return balance;
    }

  get_account_info(account_id,asset_code,display_balance)
