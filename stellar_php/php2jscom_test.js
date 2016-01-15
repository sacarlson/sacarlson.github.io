// Copyright (c) 2016 by Scott Carlson  sacarlson_2000@yahoo.com
// Jan 15 2016 first edition
// input command line example;  send_native from_seed to_account_id amount
//console.log(process.argv[2]);

var from_seed = process.argv[2];
var to_account_id = process.argv[3];
var amount = process.argv[4];

console.log( from_seed + " " + to_account_id + " " + amount);
return amount;
