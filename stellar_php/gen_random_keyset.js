// Copyright (c) 2016 by Scott Carlson  sacarlson_2000@yahoo.com
// Jan 15 2016 first edition
//console.log("started");
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server({hostname:'horizon-testnet.stellar.org', secure: true, port: 443});
var key = StellarSdk.Keypair.random();

var account_id = key.accountId();
//console.log("account_id");
//console.log(account_id);
var secret_seed = key.seed();

console.log(account_id + ":" + secret_seed);
