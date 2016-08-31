// Copyright (c) 2016 Scott Carlson sacarlson_2000@yahoo.com

"use strict";
   
    // Initialize everything when the window finishes loading
    window.addEventListener("load", function(event) {
      //StellarSdk.Network.useTestNetwork();
      
      var network_testnet = document.getElementById("network_testnet");
      var message = document.getElementById("message");
      var account = document.getElementById("account");
      var inflation_dest = document.getElementById("inflation_dest");
      var destination = document.getElementById("destination");
      var dest_seed = document.getElementById("dest_seed");
      var issuer = document.getElementById("issuer");
      var asset = document.getElementById("asset");
      var seed = document.getElementById("seed");
      var tissuer = document.getElementById("tissuer");
      var tasset = document.getElementById("tasset");
      var tlimit = document.getElementById("tlimit");
      var amount = document.getElementById("amount");
      //var balance = document.getElementById("balance");
      var balance = {};
      var CHP_balance = document.getElementById("CHP_balance");
      //var asset_type = document.getElementById("asset_type");
      var asset_type = {};
      var memo = document.getElementById("memo");
      var memo_mode = document.getElementById("memo_mode");
      //var dest_balance = document.getElementById("dest_balance");
      var dest_balance = {};
      var dest_CHP_balance = document.getElementById("dest_CHP_balance");      
      var url = document.getElementById("url");
      var port = document.getElementById("port");
      var secure = document.getElementById("secure");
      var open = document.getElementById("open");
      var close = document.getElementById("close");
      var merge_accounts = document.getElementById("merge_accounts");
      var status = document.getElementById("status");
      var account_disp = document.getElementById("account_disp");
      var account_disp2 = document.getElementById("account_disp2");
      var network = document.getElementById("network");
      var envelope_b64 = document.getElementById("envelope_b64"); 
      var bal_disp = document.getElementById("bal_disp"); 
      var select_seed = document.getElementById("select_seed");
      var new_account = document.getElementById("new_account");
      var tx_status = document.getElementById("tx_status");
      var net_passphrase = document.getElementById("net_passphrase");
      var top_image_span = document.getElementById("top_image_span");
      var top_image_url = document.getElementById("top_image_url");
      var top_page_title = document.getElementById("top_page_title");
      var top_page_title_span = document.getElementById("top_page_title_span");
      var background_img = document.getElementById("background_img");
      var background_color = document.getElementById("background_color");
      var text_color = document.getElementById("text_color");
      var offerid = document.getElementById("offerid");
      var buying_asset_code = document.getElementById("buying_asset_code"); 
      var buying_asset_issuer = document.getElementById("buying_asset_issuer"); 
      var selling_asset_code = document.getElementById("selling_asset_code");      
      var selling_asset_issuer = document.getElementById("selling_asset_issuer");
      var selling_price = document.getElementById("selling_price");
      var selling_amount = document.getElementById("selling_amount");
      var default_asset_code = document.getElementById("default_asset_code");
      var default_issuer = document.getElementById("default_issuer");
      var auto_trust = document.getElementById("auto_trust");
      var paths_destination_addressID = document.getElementById("paths_destination_addressID");
      var paths_destination_asset = document.getElementById("paths_destination_asset");
      var paths_destination_asset_issuer = document.getElementById("paths_destination_asset_issuer");
      var paths_destination_amount = document.getElementById("paths_destination_amount");
      var orderbook_buy_asse = document.getElementById("orderbook_buy_asse");
      var orderbook_buy_issuer = document.getElementById("orderbook_buy_issuer");
      var orderbook_sell_asset = document.getElementById("orderbook_sell_asset");
      var orderbook_sell_issuer = document.getElementById("orderbook_sell_issuer");
      var better_bid_ask = document.getElementById("better_bid_ask");

      
      var asset_obj = new StellarSdk.Asset.native();
      var socket;
      var socket_open_flag = false;
      var operation_globle;
      var paymentsEventSource;
      var server;
      var key;
      var email_flag = false;
      var transaction;
      var server_mode = "horizon";
      var fed_mode_forward = true;
      var account_obj_global;
      var destination_home_domain;
      var cancel_offer_flag;
      var account_tx;
      var send_fed_to;
      var enable_effecthandler = true;
      var effect_fromstream_flag = false;
      var manageOfferTransaction_flag = false;


      auto_trust.value = 1;      

      console.log("enable_effecthandler = true");

      var resetAccount = function () {
	    account_tx = {
	        address: 'loading',
	        balance: 0,
	        reserve: 0,
	        sequence: "0",
	        transactions: [],
	        otherCurrencies: []
	    };
	  };

	resetAccount();
    //var server_mode = "mss_server";
      //bal_disp.textContent = "test";
      reset_horizon_server(); 
      seed.value = restore_seed("seed1", "");
  
      var qrcode = new QRCode(document.getElementById("qrcode"), {
	    width : 300,
	    height : 300
      });

      var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
	    width : 300,
	    height : 300
      });
 
      //net_passphrase.value = "Test SDF Network ; September 2015";
      //top_image_span.innerHTML = '<img src="scotty.png" class="img-circle" alt="Cinque Terre" width="100" height="100">';
      //top_image_url.value = "scotty.png";
      restore_default_settings();
      StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
      active_network.textContent = net_passphrase.value ;
      //top_image_span.innerHTML = '<img src="scotty.png" class="img-circle" alt="Cinque Terre" width="100" height="100">';
      

      console.log("seed.value: " + seed.value);     
      console.log("seed.value.length: " + seed.value.length);
            
      //key = StellarSdk.Keypair.fromSeed(seed.value);
      if (seed.value.length != 56) {
        key = StellarSdk.Keypair.random();
        console.log("key ok");
        account.value = key.accountId();
        account_tx.address = account.value;
        console.log("account ok");
        seed.value = key.seed();
        console.log("seed ok");
        save_seed("seed1", "", seed.value );
      } else {
         account.value = StellarSdk.Keypair.fromSeed(seed.value).accountId();
         account_tx.address = account.value;
         key = StellarSdk.Keypair.fromSeed(seed.value);
         update_key();
      }
      //seed.value = 'SA3CKS64WFRWU7FX2AV6J6TR4D7IRWT7BLADYFWOSJGQ4E5NX7RLDAEQ'; 
      //account.value = 'GAMCHGO4ECUREZPKVUCQZ3NRBZMK6ESEQVHPRZ36JLUZNEH56TMKQXEB'
   
      //asset.value = "native";
      asset.value = default_asset_code.value;
      if (default_asset_code.value != "native"){
        tasset.value = default_asset_code.value;
      } else {
        tasset.value = "";
      }
      issuer.value = default_issuer.value;
      tissuer.value = default_issuer.value;
      tlimit.value = "";

      var env_b64 = window.location.href.match(/\?env_b64=(.*)/);
      var encrypted_seed = window.location.href.match(/\?seed=(.*)/);
      var accountID = window.location.href.match(/\?accountID=(.*)/);
      var json_param = window.location.href.match(/\?json=(.*)/);
      if (env_b64 !== null) {
        console.log(env_b64[1]);
      }
      if (json_param != null) {
        //escape(str)
        console.log("json_param detected");
        json_param = unescape(json_param[1]);
        var params = JSON.parse(json_param);
        console.log(params);
        console.log(params["accountID"]);
        console.log(params["env_b64"]);
        if (typeof params["accountID"] != "undefined") {
          account.value = params["accountID"];
          account_tx.address = account.value;
        }
        if (typeof params["env_b64"] != "undefined") {
          console.log("env_b64 param detected");
          envelope_b64.value = params["env_b64"];
          account.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].destination;
          account_tx.address = account.value;
          console.log(new StellarSdk.Transaction(envelope_b64.value).operations[0].asset);
          tissuer.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].asset.issuer;
          tasset.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].asset.code;
          asset_type.value = tasset.value;
        }               
        if (typeof params["seed"] != "undefined") {
          seed.value = params["seed"];
          account.value = StellarSdk.Keypair.fromSeed(seed.value).accountId();
          account_tx.address = account.value;
          key = StellarSdk.Keypair.fromSeed(seed.value);
          update_key();
        }
        if (typeof params["amount"] != "undefined") {
          amount.value = params["amount"];
        }
        if (typeof params["memo"] != "undefined") {
          memo.value = params["memo"];
        }
        if (typeof params["asset"] != "undefined") {
          asset.value = params["asset"];
        }
        if (typeof params["issuer"] != "undefined") {
          issuer.value = params["issuer"];
          tissuer.value = params["issuer"];
        }
        if (typeof params["destination"] != "undefined") {
          destination.value = params["destination"];
          paths_destination_addressID.value =  params["destination"];
        }
        if (typeof params["tlimit"] != "undefined") {
          tlimit.value = params["tlimit"];
        } 
        var array_trustlines = [];
        if (typeof params["trustlines"] != "undefined") {
          array_trustlines = params["trustlines"].split(",");
          console.log("array_trustlines.length: " + array_trustlines.length);
          if (array_trustlines.length == 1){
            tasset.value = params["trustlines"];
          }
        }

      } 
      if (encrypted_seed != null) {
        console.log(encrypted_seed[1]);
        seed.value = encrypted_seed[1];
        update_key();      
      }    
      if (accountID != null) {
        console.log("here?");
        console.log(accountID[1]);
        account.value = accountID[1];
        account_tx.address = account.value;
      }

      //merge_accounts.disabled = true;
      //network.value ="testnet";
      tx_status.textContent = "Idle";
      status.textContent = "Not Connected";
      //url.value = "horizon-testnet.stellar.org";
      //port.value = "443";
      //secure.value = "true";
      //create_socket();
      close.disabled = true;
      open.disabled = true;
      sign_tx.disabled = true;
      
      if (typeof memo.value == "undefined") {
        memo.value = "funtracker.site";
      }
      if (typeof amount.value == "undefined"){
        amount.value = "1"; 
      }
      //console.log("asset_type: " + (typeof asset_type.value));
      //console.log("asset_type.length: " + asset_type.value.length);
      if (typeof tasset.value == "undefined" || tissuer.value.length == 0) {     
        //asset_type.value = "AAA";
        tissuer.value = 'GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU';
        issuer.value = tissuer.value;
        tasset.value = 'FUNT';
      }
      
      if (typeof destination.value == "undefined"){
        dest_seed.value = restore_seed("seed2", "");
        console.log("dest_seed.value: " + dest_seed.value);
        if (dest_seed.value.length != 0) {
          destination.value = StellarSdk.Keypair.fromSeed(dest_seed.value).accountId();
          paths_destination_addressID.value = destination.value;
          console.log("dest: " + destination.value); 
        }
      }   
            
      reset_horizon_server();
      update_seed_select();
      //current_mode.value = "Stellar horizon TestNet";
      
      //bal_disp.textContent = 0;
      update_balances();  

      var table_sort_offers = new Tablesort(document.getElementById('table_offers'));
      var table_sort_trans = new Tablesort(document.getElementById('table'), {
        descending: true
      });
      var table_sort_asset = new Tablesort(document.getElementById('table_asset'));
      var table_sort_trades = new Tablesort(document.getElementById('table_trade_history'));
      var table_sort_paths = new Tablesort(document.getElementById('table_paths'));
      var table_sort_orderbook = new Tablesort(document.getElementById('table_orderbook'));

     // var xmlhttp = new XMLHttpRequest();

      account_disp.textContent = account.value;
      account_disp2.textContent = account.value;
      makeCode();
      
      //get_offers();
      //var array = [1,2,3,4,5];
      //insRow(array,"table");

      // lets try to start 50 sec timer as the horizon connect time out seems to be set at 60 sec
      var myVar = setInterval(myTimer, (Math.round(50 * 1000)));

      function myTimer() { 
        console.log("timer click detected, do an attachToPaymentsStream('now'); to prevent time out");
        attachToPaymentsStream('now');
      }

      function makeCode () {
        //console.log("start makeCode");		
	    // qr-code generator
	    if (!account.value) {
	      alert("no account value detected for qrcode, bad pass phrase?");
		  //account.focus();
		 return;
	   }	
	   //qrcode.makeCode(seed.value);
       //update_key();
       //qrcode.makeCode(export_to_centaurus());
       qrcode.makeCode(seed.value);
       //console.log("qrcode account: " + account.value);
       qrcode2.makeCode(account.value);        
     } 

          function email_funds_now (mode) {
            var mail = "";
            if (mode != "email_tx"){
        
              if (dest_seed.value.length > 55){
                mail = "mailto:" + email_address.value +"?subject= Stellar funds transmittal for all asset in AccountId: " + destination.value +   "&body=Click on the link bellow to collect all present funds in AccountId : " + destination.value + "   just click Link: https://wallet.funtracker.site/?json=%7B%22seed%22:%22" + dest_seed.value + "%22%7D   " +  ". From within the wallet you should see the balance of your new account";
              } else {
                mail = "mailto:" + email_address.value +"?subject= Stellar funds transmittal for: " + amount.value + " of asset: "+ asset.value + "&body=Click on the link bellow to collect the funds I have sent you for the amount of " + amount.value + " of asset type: "+ asset.value + " to the accountID " + destination.value + " secret seed if contained: " + dest_seed.value  + "  just click Link: https://wallet.funtracker.site/?json=%7B%22env_b64%22:%22" + envelope_b64.value + "%22%7D   " +  ". From within the wallet just hit send_tx button to transact the issued transaction and verify balance received.   Or if you prefer other methods of receiving the transaction the Stellar envelope base64: " + envelope_b64.value;
              }

            } else {
           mail = "mailto:" + email_address.value +"?subject= Stellar TX transaction to be signed &body=Click on the link bellow to go to signing tool just click Link: https://wallet.funtracker.site/?json=%7B%22env_b64%22:%22" + envelope_b64.value + "%22%7D   . From within the wallet just hit sign_tx to sign and send_tx button to transact the issued transaction after fully signed.   Or if you prefer other methods of signing tx the Stellar envelope base64: " + envelope_b64.value;
            }
       
            console.log("mail content: ");
            console.log(encodeURI(mail));
            //message.textContent = encodeURI(mail);
            window.open(encodeURI(mail));
          }

          
          function federation_lookup(stellar_address) {
             console.log("start sendto: " + send_fed_to);
             var index_at = stellar_address.indexOf("@");
             var index_ast = stellar_address.indexOf("*");
             console.log("index_at: " + index_at);
             console.log("index_ast: " + index_ast);
             if (index_at == -1 && index_ast == -1){
               stellar_address = stellar_address + "*funtracker.site";
             }
             if (index_at >= 0 && index_ast >= 0){
               console.log("have both * and @ in lookup, so don't change");
             } else{
               console.log("only have * or @ in lookup, will change any @ to *");
               stellar_address = stellar_address.replace("@", "*");
             }
             if (send_fed_to == "dest") {
                console.log("pre set dest: " + stellar_address);
                destination.value = stellar_address;
                paths_destination_addressID.value = destination.value;
             } else {
                console.log("pre set issuer: " + stellar_address);
                issuer.value = stellar_address;
             }
             StellarSdk.FederationServer.resolve(stellar_address)
                 .then(function(federationRecord) {
                     //destination.value = federationRecord.account_id;
                     console.log("federation_lookup results" + federationRecord.account_id);
                     console.log("send_fed_to: " + send_fed_to);
                     if (send_fed_to == "dest") {
                       console.log("set dest");
                       destination.value = federationRecord.account_id;
                       paths_destination_addressID.value = destination.value;
                     } else if (send_fed_to == "signer") {
                       console.log("set signer");
                       signer.value = federationRecord.account_id;
                     } else if (send_fed_to == "inflation_dest") {
                       console.log("set inflation_dest");
                       inflation_dest.value = federationRecord.account_id;
                     } else if (send_fed_to == "tissuer") {
                       console.log("set tissuer");
                       tissuer.value = federationRecord.account_id;
                     } else if (send_fed_to == "issuer") {
                       console.log("set issuer");
                       issuer.value = federationRecord.account_id;
                     } else if (send_fed_to == "selling_asset_issuer") {
                       console.log("set selling_asset_issuer");
                       selling_asset_issuer.value = federationRecord.account_id;
                     } else if (send_fed_to == "buying_asset_issuer") {
                       console.log("set buying_asset_issuer");
                       buying_asset_issuer.value = federationRecord.account_id;
                     } else if (send_fed_to == "merge_dest") {
                       console.log("set merge_dest");
                       merge_dest.value = federationRecord.account_id;
                     }
                 })
                .catch(function(err) {
                    console.log("federation_lookup error: " + err);
                });
          }

    

          function reverse_federation_lookup3() {
             // this should work but I think my sdk is too old to support it, maybe on upgrade this will work
             StellarSdk.FederationServer.resolveAccountId(destination.value)
                 .then(function(federationRecord) {
                     console.log("federationRecord: ");
                     console.log(federationRecord);
                     //destination.value = federationRecord.account_id;
                     //console.log("federation_lookup results" + destination.value);
                 })
                .catch(function(err) {
                    console.log("reverse_federation_lookup error: " + err);
                });
          }

          function reverse_federation_lookup(address) {
            console.log("reverse_federation_lookup disabled: " + address);
          }

                  
          
          function attachToPaymentsStream(opt_startFrom) {
            console.log("start attacheToPaymentsStream");
            account_tx.address = account.value;
            var futurePayments = server.effects().forAccount(account.value);
            if (opt_startFrom) {
                console.log("opt_startFrom detected");
                futurePayments = futurePayments.cursor(opt_startFrom);
            }
            if (paymentsEventSource) {
                console.log('close open effects stream');
                paymentsEventSource.close();
            }
            console.log('open effects stream with cursor: ' + opt_startFrom);
            paymentsEventSource = futurePayments.stream({
                onmessage: function (effect) { effectHandler(effect, true); }
            });
          };

          function start_effects_stream(account_obj) {
            console.log("start_effects_stream");
            account_obj_global = clone(account_obj);
            //console.log(account_obj);
            account_tx.address = account.value;
	        server.effects()
            .forAccount(account.value)
            .limit(45)
            .order('desc')
            .call()
            .then(function (effectResults) {
                //console.log("then effectResults");
                //console.log(effectResults);
                //console.log("account_obj_global");
                //console.log(account_obj_global);
                // will add balance_splice here that adds balances over time in all effectResults.records[x]
                 effectResults = balance_splice(effectResults,account_obj_global);
                //console.log(effectResults.records.length);
                console.log("post balance_splice: effectResults");
                console.log(effectResults);
                var length = effectResults.records ? effectResults.records.length : 0;
                //var length = effectResults.records.length;
                //console.log("length: " + length);
                var currentEffect;
                for (var i = length-1; i >= 0; i--) {
                    //console.log("index: " + i);
                    currentEffect = effectResults.records[i];
                    //console.log("currentEffect");
                    //console.log(currentEffect);
                    effectHandler(currentEffect, false);
                }
                var startListeningFrom;
                if (length > 0) {
                    var latestPayment = effectResults.records[0];
                    var startListeningFrom = latestPayment.paging_token;
                }
                attachToPaymentsStream(startListeningFrom);
                enable_effecthandler = true;
                console.log("enable_effecthandler = true : startlisteningfrom");    
            })
            .catch(function (err) {                
                console.log("error start_effects_stream");
                console.log(err);
                attachToPaymentsStream('now');
                enable_effecthandler = true;
                console.log("enable_effecthandler = true : now");                   
            });
          }

         function check_trust_exists(asset_code, max_count, displayEffect){
           //example check_trust_exists("FUNT", displayEffect);
           // will return true if asset_code already exists or if max_count number of trustlines already exist
           // this allow max_count = 0 to disable adding trustlines
           var balances = displayEffect.balances;
           console.log("trustlines count: " + balances.length);
           if (balances.length >= max_count){
              return true;
           }
           console.log("balances");
           console.log(balances);
           for (var i = 0; i < balances.length; i++) {
             if (balances[i].asset_code == asset_code){
               return true;
             }
           }
           return false;
         }
         
         function effectHandler(effect,fromStream) {
            //console.log("effectHandler fromStream: " + fromStream);
            //console.log("effect");
            //console.log(effect);
            //console.log(" effect.type ");
            //console.log(effect.type);
            //console.log("enable_effecthandler");
            //console.log(enable_effecthandler);

            // simple quick and yet dirty fix for handling my effects.  just update all balances on all tables and top page XLM view if
            // I see anything replay from effects return.  maybe some day I'll figure out a better way.  This will I imagin make updates slower and put
            // a bigger burden on horizion that shouldn't be needed, but hay it works.
            //update_balances();
            if (enable_effecthandler){
                update_balances();
                console.log("enable_effecthandler is true, so ran update_balances()");
            }
            if (fromStream){
              console.log("fromStream true");            
              effect_fromstream_flag = true;
            } else {
              insertEffect(effect, fromStream)
                .then(function (displayEffect) {
                    if (fromStream) {
                        //applyToBalance(effect);
                        //$rootScope.$broadcast('accountInfoLoaded');                       
                    }
                    else {
                        //if (displayEffect.ef_type == "trade"){
                        if (displayEffect.type == "trade"){
                          insert_trade_table(displayEffect);
                        }else {
                          insert_history_table(displayEffect)
                        }
                        console.log("effect_fromstream_flag: " + effect_fromstream_flag);
                        if (effect_fromstream_flag){
                          console.log("displayEffect");
                          console.log(displayEffect);
                          console.log("params.trustlines");
                          console.log(params.trustlines);
                          if (typeof params != "undefined" && typeof params["trustlines"] != "undefined"){ 
                            console.log("params.trustlines is defined");
                            var array_opps = [];
                            for (var i = 0; i < array_trustlines.length; i++) {
                              if (check_trust_exists(array_trustlines[i], Number(auto_trust.value) ,displayEffect) == false){
                                 console.log("trustline : " + array_trustlines[i] + " doen't exist so we will create it now");
                                 //activate_trustline(array_trustlines[i]);
                                 array_opps[i] = addTrustlineOperation(array_trustlines[i], tissuer.value, tlimit.value);
                              }
                            }
                            console.log("array_opps");
                            console.log(array_opps);
                            if (array_opps.length > 0){
                              createTransaction_array(array_opps);
                            }
                          }
                          effect_fromstream_flag = false;                         
                        }
                      
                    }
                }, function (err) {
                    console.error(err)
              });
            }
            var isRelevant =
                   effect.type === 'account_created'
                || effect.type === 'account_debited'
                || effect.type === 'account_credited'
            ;

            if (isRelevant) {
              console.log(" isRelevant is true ");             
            }             
         }

    // scotty moded effecthandler  must replace original in transaction_toolsv0.4.0.js
        //var effectHandler = function (effect, fromStream) {
         function effectHandler2(effect,fromStream) {
            console.log("effectHandler fromStream: " + fromStream);
            console.log("effect");
            console.log(effect);
            console.log(" effect.type ");
            console.log(effect.type);
            var isRelevant =
                   effect.type === 'account_created'
                || effect.type === 'account_debited'
                || effect.type === 'account_credited'
            ;

            //if(isRelevant) {
            if(true) {
                insertEffect(effect, fromStream)
                .then(function (displayEffect) {
                    if (fromStream) {
                        applyToBalance(effect);
                        //$rootScope.$broadcast('accountInfoLoaded');
                    }
                    else {
                        if (displayEffect.ef_type == "trade"){
                          insert_trade_table(displayEffect);
                        }else {
                          insert_history_table(displayEffect)
                        }
                    }
                }, function (err) {
                    console.error(err)
                });

            }
        };


   // new (temp?) replacement for Centarus applayToBalance,  this never existed so can plugin to transaction_tools..
   function applyToBalance(effect) {
    // this presently not used not sure if we ever will use it again
    // partly due to bad effect data bug from horizon https://github.com/stellar/horizon/issues/304.
    console.log("applyToBalance");
    if (effect.type === 'account_debited') {
               if (effect.asset_type === "native") {
                  balance.value = parseFloat(balance.value) - parseFloat(effect.amount);
                  bal_disp.textContent = fix7dec(balance.value);
               }else {
                  CHP_balance.value = CHP_balance.value - effect.amount;
               }
               //insert_history_table(effect,"red")
            }
            if (effect.type === 'account_credited') {
               if (effect.asset_type === "native") {
                  balance.value = parseFloat(balance.value) + parseFloat(effect.amount);
                  bal_disp.textContent = fix7dec(balance.value);
               }else {
                  CHP_balance.value = CHP_balance.value + effect.amount;
               }
               //insert_history_table(effect,"green")
            }
            if (effect.type === 'account_created') {
               balance.value = parseFloat(effect.starting_balance);
               bal_disp.textContent = fix7dec(effect.starting_balance);
               //insert_history_table(effect,"red")
            }
   }


          var insertEffect = function (effect, fromStream) {
            //console.log("insertEffect");
            var promise = new Promise(function(resolve, reject) {
                try {
                    effect.operation()
                    .then(function (op) {
                        op.transaction()
                        .then(function (trx) {
                            try {
                                var displayEffect = insertTransaction(trx, op, effect, fromStream);
                                //console.log("displayEffect");
                                //console.log(displayEffect);
                                resolve(displayEffect);
                            }
                            catch (err) {
                                console.log("insertEffect error: " + err);
                                reject(err);
                            }
                        });
                    })
                }
                catch(err) {
                    reject(err);
                }
            });
            return promise;
        };

   // as far as I can tell so far insertTransaction will work unmoded from Centaurus
  //var insertTransaction = function (trx, op, effect, fromStream) {
        function insertTransaction (trx, op, effect, fromStream) {
            //console.log("insertTransaction");
            //console.log("effect ");
            //console.log(effect);
            //console.log("trx ");
            //console.log(trx);
            //console.log("op");
            //console.log(op);
            var asset = effect.asset_code;
            if (asset === null || !asset)
                asset = 'XLM'
            else
                asset = effect.asset_code;

            var date = new Date(trx.created_at)
            //console.log("trx: ");
            //console.log(trx);
            //console.log("op");
            //console.log(op);
            //console.log("effect");
            //console.log(effect);
            var debit;
            if (effect.amount > 0) {
              debit = false;
            } else {
              debit = true;
            }
           
            var displayEffect = {
                effectId : effect.paging_token,
                creationDate: date,
                creationTimestamp : date.getTime(),
                asset_code: op.asset_code,
                ef_asset_code: effect.asset_code,
                op_asset_code: op.asset_code,
                op_asset_issuer: op.asset_issuer,
                ef_asset_issuer: effect.asset_issuer,
                asset_issuer: op.asset_issuer,
                amount: effect.amount,
                ef_amount: effect.amount,
                op_amount: op.amount,
                //debit: effect.type === 'account_debited',
                debit: debit,
                sender: op.from,
                source_account: op.source_account,
                receiver: op.to,
                memo: trx.memo,
                memoType: trx.memo_type,
                tx_id: trx.id,
                envelope_xdr: trx.envelope_xdr,              
                asset_type: op.asset_type,
                details: effect,
                type: op.type,
                op_type: op.type,
                ef_type: effect.type                              
            }
            if (typeof effect.bal != "undefined"){
              displayEffect.balances = effect.bal.balances;
              displayEffect.trans_balance = effect.trans_balance;
            }
                       

            if (op.type === 'create_account') {
                displayEffect.amount = op.starting_balance;
                displayEffect.sender = op.funder;
                displayEffect.receiver = op.account;
            }

            if (fromStream && account_tx.address === trx.source_account)
                account_tx.sequence = trx.source_account_sequence;

            // insert at correct position
            var i;
            for (i = 0; i < account_tx.transactions.length; i++) {
                var compareEffect = account_tx.transactions[i];
                if (displayEffect.effectId === compareEffect.effectId)
                    throw 'transaction already seen: ' + displayEffect.effectId;
                if (displayEffect.creationTimestamp > compareEffect.creationTimestamp) {
                    break;
                }
            }
            account_tx.transactions.splice(i, 0, displayEffect);

            return displayEffect;
        };


     

       function balance_splice(page,account_obj) {
         console.log("balance_splice");
        // will add balance_splice here that adds balances over time in all effectResults.records[x]
         //effectResults = balance_splice(effectRestults,account_obj_global);
        var bal = {};
        bal.balances = clone(account_obj.balances);
        var native_bal = get_native_balance(account_obj)
        var arrayLength = page.records.length;
        for (var i = 0; i < arrayLength; i++) {
          //console.log("page_tx i: " + i);
          //console.log(page.records[i]); 

          // record[x] {account, amount, asset_type, asset_code, asset_issuer, id, type}
          // asset_type can be native, credit_alphanum4, credit_alphanum12
          // asset_code can be undefined if native or "EQD", "USD" ...
          // type can be: account_credited, account_debited, account_created, path_payment, signer_created ...
       
          //console.log("asset_code: " + page.records[i].asset_code);
          var amount = parseFloat(page.records[i].amount);
          switch (page.records[i].type) {
            case "account_debited":          
              amount = (amount * -1) ;
              if (page.records[i].asset_code == "XLM"){
                amount = parseFloat(fix7dec(amount - 0.0001));
              }
              page.records[i].amount = amount;
            case "account_credited": 
            case "pathPayment": 
              //console.log("case payment");                                    
              if (page.records[i].asset_type == "native") {
                //console.log("asset is XLM");  
                page.records[i].asset_code = "XLM";                                                                    
                page.records[i].bal = clone(bal);                
                page.records[i].trans_balance = fix7dec(native_bal);
                native_bal = native_bal - amount ;
                //console.log("native_bal");
                //console.log(native_bal);                
              } else {
                //console.log("asset not XLM");
                var asset_not_found = true;
                var blen = bal.balances.length;
                //console.log("bal");
                //console.log(bal);
                for (var a = 0; a < blen; a++) { 
                  var same_asset = (bal.balances[a]["asset_code"] == page.records[i].asset_code && bal.balances[a]["asset_issuer"] == page.records[i].asset_issuer);                 
                  if (same_asset){                                                                                                     
                    page.records[i].bal = clone(bal);
                    bal.balances[a]["balance"] = parseFloat(bal.balances[a]["balance"]) - amount;
                    page.records[i].trans_balance = fix7dec(parseFloat(bal.balances[a]["balance"]) + amount);
                    asset_not_found = false;
                  }
                }
                if (asset_not_found) {
                  page.records[i].asset_code = "XLM";
                  page.records[i].type = "trade";                 
                  page.records[i].bal = clone(bal);
                  page.records[i].trans_balance = fix7dec(native_bal);
                }
                if (page.records[i].type == "account_debited") {
                  native_bal = native_bal + 0.0001; 
                }                             
              }
              break;
            case "account_created" :                                  
              if (false) {
                bal.create_detected = true;              
                bal.native = fix7dec(native_bal);
                page.records[i].bal = clone(bal); 
                native_bal = parseFloat(page.records[i].startingBalance);
                page.records[i].amount = native_bal;          
              } else {
                //console.log("createaccount to diff dest");
                //native_bal = native_bal + parseFloat(page.records[i].startingBalance) + 0.0001;              
                bal.native = fix7dec(native_bal);
                page.records[i].bal = clone(bal); 
                page.records[i].amount = (parseFloat(page.records[i].startingBalance)) * -1 - 0.0001;
                native_bal = native_bal + parseFloat(page.records[i].startingBalance) + 0.0001;
              }
              break;

            default:
              //console.log("no case match");
              //console.log("page.records[i]");
              //console.log(page.records[i]);
              page.records[i].trans_balance = fix7dec(native_bal);
              page.records[i].amount = -0.0001;
              native_bal = native_bal + 0.0001;               
              page.records[i].asset_code = "XLM";               
              page.records[i].bal = clone(bal);         
          }          
          //console.log("end of for loop");                               
        }
        //console.log("page.records");  
        //console.log(page.records);
        //display_history(page.records);
        return page;
      }

       function insert_history_table(effect){        
        //console.log("insert_history_table");
        //console.log(effect);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var font_color;
        var amount = parseFloat(effect.amount);
        if (effect.debit){
          font_color = red;
          //amount = amount * -1;
          ar[0] = font_color + effect.receiver + " </font>";
        } else {
          font_color = green;
          ar[0] = font_color + effect.sender + " </font>";
        }
         //ar[0] = effect.creationTimestamp; 
         ar[1] = font_color + effect.type + "</font>";
        if (effect.asset_type === "native") {
          ar[4] = font_color + effect.trans_balance + "</font>";
          ar[2] = font_color + "XLM" + "</font>";
        } else {
          ar[4] = font_color + effect.trans_balance + "</font>";
          ar[2] = font_color + effect.asset_code + "</font>";
        }
        ar[3] = font_color + amount + "</font>";  
        ar[5] = font_color + effect.memo + "</font>";
        //ar[6] = font_color + effect.creationDate + "</font>";  
        ar[6] = font_color + effect.creationDate.toISOString() + "</font>";             
        insRow(ar,"table"); 
        //table_sort_trans.refresh();       
      }

      function insert_trade_table(effect){        
        console.log("insert_trade_table");
        console.log(effect);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var white = '<font color="white">';
        var black = '<font color="black">';
        var font_color = black;
        ar[0] =  font_color + effect.details.offer_id + " </font>";
        if (effect.sender == account.value){
          ar[1] = font_color + effect.receiver + " </font>";
        } else {
          ar[1] = font_color + effect.sender + " </font>";
        }
        if (effect.details.bought_asset_type == "native"){
          effect.details.bought_asset_code = "XLM";
          effect.details.bought_asset_issuer = "";
        }
        if (effect.details.sold_asset_type == "native"){
          effect.details.sold_asset_code = "XLM";
          effect.details.sold_asset_issuer = "";
        }
        ar[2] = font_color + effect.details.sold_asset_code + "</font>";
        ar[3] = font_color + effect.details.sold_asset_issuer + "</font>";
        ar[4] = font_color + effect.details.sold_amount + "</font>";
        ar[5] = font_color + effect.details.bought_asset_code + "</font>"; 
        ar[6] = font_color + effect.details.bought_asset_issuer + "</font>";
        ar[7] = font_color + effect.details.bought_amount + "</font>"; 
        ar[8] = font_color + effect.creationDate.toISOString() + "</font>";             
        insRow(ar,"table_trade_history"); 
        //table_sort_offers.refresh();        
      }

      function insert_paths_table(records_obj){        
        //console.log("insert_paths_table");
        //console.log(records_obj);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var font_color = green;
        if (records_obj.destination_asset_type == "native"){
           records_obj.destination_asset_code = "XLM"
           records_obj.destination_asset_issuer = "";
        } 
        if (records_obj.source_asset_type == "native"){
           records_obj.source_asset_code = "XLM"
           records_obj.source_asset_issuer = "";
        }
        if (records_obj.destination_asset_issuer.length > 0){
           records_obj.destination_asset_issuer = records_obj.destination_asset_issuer.substring(0,6) + "...";
        }
        if (records_obj.destination_asset_issuer.length > 0){
           records_obj.source_asset_issuer = records_obj.source_asset_issuer.substring(0,6) + "...";
        }
        //records_obj.path[0].asset_type  // "credit_alphanum4 || native",
        //records_obj.path[0].asset_code 
        //records_obj.path[0].asset_issuer 
        if (records_obj.path.length > 0){
          if (records_obj.path[0].asset_type == "native"){
            records_obj.path[0].asset_code = "XLM";
            records_obj.path[0].asset_issuer = "..";
          } else {
            records_obj.path[0].asset_issuer = records_obj.path[0].asset_issuer.substring(0,6) + "...";
          }
        } else {
           console.log("records_obj.path");
           console.log(records_obj.path);
           records_obj.path[0] = {};
           records_obj.path[0].asset_code = "..";
           records_obj.path[0].asset_issuer = "..";
        }
            
               
        ar[0] = font_color + records_obj.destination_asset_code + " </font>";      
        ar[1] = font_color + records_obj.destination_asset_issuer + "</font>";         
        ar[2] = font_color + records_obj.destination_amount + "</font>";
        ar[3] = font_color + records_obj.path[0].asset_code + "</font>"; 
        ar[4] = font_color + records_obj.path[0].asset_issuer + "</font>";  
        ar[5] = font_color + records_obj.source_asset_code + "</font>";
        ar[6] = font_color + records_obj.source_asset_issuer + "</font>";
        ar[7] = font_color + records_obj.source_amount + "</font>";                      
        insRow(ar,"table_paths");        
      } 
            
            //<th data-sort-method='number' >Price</th>
            //<th data-sort-method='number' >Price R</th>
            //<th data-sort-method='number' >Amount (qty ask/bid)</th>      

      function insert_orderbook_table(records_obj){        
        //console.log("insert_orderbook_table");
        //console.log(records_obj);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var font_color = green;
        var price_r = Number(records_obj.price_r.d) / Number(records_obj.price_r.n);
        console.log ("records_obj.price.d");
        console.log(records_obj.price_r.d);
        console.log("records_obj.price_r.n");
        console.log(records_obj.price_r.n);        
        ar[0] = font_color + records_obj.price + " </font>";      
        ar[1] = font_color + price_r + "</font>";         
        ar[2] = font_color + records_obj.amount + "</font>";                       
        insRow(ar,"table_orderbook");        
      }  

      function reset_horizon_server() {
        console.log("reset_horizon_server"); 
        //console.log("secure: " + secure.value);
        var tf = true;
        if (secure.value == "false") { 
          tf = false;
        }  
        server = new StellarSdk.Server({     
          hostname: url.value,
          port: Number(port.value),
          secure: tf
        });
      }

      function clear_all_tables() {
        clear_table("table");  // transaction history
        clear_table("table_trade_history"); //asset trade history
        clear_table("table_asset"); // list asset holdings
        clear_table("table_offers"); // open order offers
      }
       
      function get_account_info(account,callback) {
        console.log("account: " + account);
        resetAccount();
        if (server_mode === "mss_server") {
          socket_open_flag = true;
        }else {
          console.log("get_account_info horizon mode");
          server.accounts()
          .accountId(account)
          .call()
          .then(function (accountResult) {
            callback(accountResult);                    
          })
          .catch(function (err) {
            console.log("got error in get_account_info");
            console.error(err);
            callback(err);          
          })
        }
      }

      function display_message(param) {
        message.textContent = JSON.stringify(param);
      }

       

      function update_balances_set(account_obj) {
        console.log("update_balances_set"); 
        if (account_obj.account_id == account.value){
          console.log("account_obj");
          console.log(account_obj);
          var bal = get_native_balance(account_obj);
          //console.log("bal: " + bal);
          bal_disp.textContent = bal;
          balance.value = bal;
          if (bal > 0) {  
            //get_transactions_desc(account_obj);
            display_asset_table(account_obj);
            start_effects_stream(account_obj);
          }
          return;
        } else {
          destination_home_domain = account_obj.home_domain;
          //console.log("distination_home_domain: " + destination_home_domain);
          dest_balance.value = get_native_balance(account_obj);
        } 
      }

      function get_native_balance(account_obj){
        console.log("get_native_balance");
        console.log(account_obj);
        var bal = 0;
        if (account_obj.name !== "NotFoundError"){
          account_obj.balances.forEach(function(entry) {
            //console.log(entry);
            if (entry.asset_type == "native") {
              //console.log("entry.bal: " + entry.balance);
              bal = entry.balance;
            }                          
          });
          console.log(bal);
          return bal;
        } else {
          console.log("no account active return -1");
          return -1;
        }
      }

                      
      function update_key() {
        if (seed.value.length == 56) {
          key = StellarSdk.Keypair.fromSeed(seed.value);
          account.value = key.accountId();          
        }
        account_disp.textContent = account.value;
        account_disp2.textContent = account.value;
        account_tx.address = account.value;
        makeCode();
      }
      
     

      function update_balances() {
        resetAccount();
        enable_effecthandler = false;
        console.log("enable_effecthandler = false");
        if (server_mode === "mss_server"){
          console.log("update_balances mss mode");
          get_balance_updates_mss();
          return
        } 
        bal_disp.textContent = 0;
        //update_balances();
        get_offers();           
        get_account_info(account.value,update_balances_set); 
        //if (destination.value.length == 56){
         // get_account_info(destination.value,update_balances_set); 
        //}          
      }

      
      function createAccount(key) {
          console.log("start createAccount");
          var operation = createAccountOperation();
          createTransaction(key,operation);
        }

      function sendPaymentTransaction() {
        console.log("sendPaymentTransaction");
        var key = StellarSdk.Keypair.fromSeed(seed.value);
        if (asset.value == "native") {
          var asset_obj = new StellarSdk.Asset.native();
          //if (dest_balance.value == 0){
          if (new_account.checked){
            if (amount.value < 20) {
              alert("destination account not active must send min 20 native");
              return;
            }
            createAccount(key);
          }else {
            createPaymentTransaction(key,asset_obj);
          }
        }else {
          //if (dest_balance.value == 0){
           // alert("destination account not active, can only send native");
           // return;
          //}
          console.log("asset: " + asset.value + " issuer: " + issuer.value);
          var asset_obj = new StellarSdk.Asset(asset.value, issuer.value);
          message.textContent = "started payment: ";
          createPaymentTransaction(key,asset_obj);
        }        
      }    
  

      function createPaymentTransaction(key,asset_obj) {
          console.log("createPaymentTransaction");
          var operation = createPaymentOperation(asset_obj);
          createTransaction(key,operation);
        }

     function accountMergeTransaction() {
          // this will send all native of key from seed.value account to destination.value account
          update_key();
          console.log("accountMerge");        
          key = StellarSdk.Keypair.fromSeed(seed.value);
          console.log(key.accountId());
          var operation = accountMergeOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }

      function setOptionsTransaction() {
          console.log("setOptionsTransaction");        
          key = StellarSdk.Keypair.fromSeed(seed.value);
          console.log(key.accountId());
          var operation = setOptionsOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }

     function manageOfferTransaction() {
          console.log("manageOfferTransaction");        
          key = StellarSdk.Keypair.fromSeed(seed.value);
          console.log(key.accountId());
          var operation = manageOfferOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }

     function addSignerTransaction() {
          console.log("addSignerTransaction");        
          key = StellarSdk.Keypair.fromSeed(seed.value);
          console.log(key.accountId());
          var operation = addSignerOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }

     function submitTransaction_mss(transaction) {
       console.log("start submitTransaction_mss");
       var b64 = transaction.toEnvelope().toXDR().toString("base64");
       envelope_b64.value = b64;
       if (email_flag) {
         email_funds_now("email_funds");
         email_flag = false;
         return;
       }
       var action = '{"action":"send_b64", "envelope_b64":"' + b64 + '"}';
       socket.send(action);
     }

     function submitTransaction_mss_b64(b64_string) {
       var action = '{"action":"send_b64", "envelope_b64":"' + b64_string + '"}';
       socket.send(action);
     }

     function submitTransaction_horizon_b64(b64_string){
       var tx = new StellarSdk.Transaction(b64_string);
       server.submitTransaction(tx);
     }

     function get_seq(address) {
       var action = '{"action":"get_sequence", "account":"' + address + '"}'
       socket.send(action);
     }

     function createTransaction_mss_submit(operation,seq_num) {
       update_key();
       var account = new StellarSdk.Account(key.accountId(), seq_num);
       if (memo_mode.value == "auto") {
         if (isNaN(memo.value)) {
           var memo_tr = StellarSdk.Memo.text(memo.value);
         } else {
           var memo_tr = StellarSdk.Memo.id(memo.value);
         }
       } else if (memo_mode.value == "memo.id") {
         var memo_tr = StellarSdk.Memo.id(memo.value);
       } else {
         var memo_tr = StellarSdk.Memo.text(memo.value);
       }
       var transaction = new StellarSdk.TransactionBuilder(account,{fee:100, memo: memo_tr})            
           .addOperation(operation)          
           .build();
       transaction.sign(key);
       submitTransaction_mss(transaction); 
     }

     function createTransaction_mss(key,operation) {
       operation_globle = operation;
       get_seq(key.accountId());
     }

    function get_balance_updates_mss() {
      // this querys balance updates from the mss-server
      // see socket.addEventListener to see how the responces from this are feed 
      // to browser display boxes
      console.log("start get_balance_updates_mss");
      if (socket.readyState === 1) {
        var action = '{"action":"get_account_info","account":"';
        var tail = '"}';
        socket.send(action + account.value + tail);
        socket.send(action + destination.value + tail);
        var action = '{"action":"get_lines_balance","account":"';
        var tail = '"}';
        socket.send(action + account.value + '", "issuer":"' + tissuer.value + '", "asset":"' + asset.value + tail);
        socket.send(action + destination.value + '", "issuer":"' + issuer.value + '", "asset":"' + asset.value + tail);
      }
    }
     
      function sign_b64_tx(b64_tx,signer_key){
        var tx = new StellarSdk.Transaction(b64_tx);
        tx.sign(signer_key);
        return tx.toEnvelope().toXDR().toString("base64");
      }

      function createTransaction_array(array_of_operations) {
         tx_status.textContent = "Processing";
         update_key();
         server.loadAccount(key.accountId())
          .then(function (account) {
             transaction = new StellarSdk.TransactionBuilder(account)            
             array_of_operations.forEach(function (item) {
               transaction.addOperation(item);
             });
             transaction = transaction.build();
             transaction.sign(key); 
             console.log("horizon mode sending tx");                               
             server.submitTransaction(transaction).then(function(result) {              
               tx_status.textContent = "Completed OK";
             }).catch(function(e) {
               console.log("submitTransaction error");
               console.log(e);
               tx_status.textContent = "Transaction failed";
               if (e.extras.result_codes.transaction == "tx_bad_auth"){
                  tx_status.textContent = "Transaction error: tx_bad_auth";
               } else {           
                 tx_status.textContent = "Transaction error: " + e.extras.result_codes.operations[0];
               } 
             });                      
          })
          .then(function (transactionResult) {
            console.log("tx_result");
            console.log(transactionResult);
            if (typeof transactionResult == "undefined") {
              console.log("tx res undefined");
            }            
          })
          .catch(function (err) {
            console.log(err);
            tx_status.textContent = "Transaction Error: " + err; 
          });
       }

      function createTransaction_horizon2(key,operation) {
        var array = [];
        array[0] = operation;
        createTransaction_array(array);
      }

      function createTransaction_horizon(key,operation) {
        tx_status.textContent = "Processing";
        update_key();
        if (memo_mode.value == "auto") {
          if (isNaN(memo.value)|| memo.value.length == 0) {
            console.log("auto memo.text");
            var memo_tr = StellarSdk.Memo.text(memo.value);
          } else {
            console.log("auto memo.id");
            var memo_tr = StellarSdk.Memo.id(memo.value);
          }
        } else if (memo_mode.value == "memo.id") {
          console.log("manual memo.id");
          var memo_tr = StellarSdk.Memo.id(memo.value);
        } else {
          console.log("manual memo.text");
          var memo_tr = StellarSdk.Memo.text(memo.value);
        }
        attachToPaymentsStream('now');
        server.loadAccount(key.accountId())
          .then(function (account) {
             //console.log("memo_tr typeof");
             //console.log(typeof memo_tr);
             transaction = new StellarSdk.TransactionBuilder(account,{fee:100, memo: memo_tr})            
            .addOperation(operation)                      
            .build();
            transaction.sign(key);
           if ( email_flag != true ) { 
             console.log("horizon mode sending tx");                               
             server.submitTransaction(transaction).then(function(result) {
               //console.log("tx2_result: ");
               //console.log(result);
               //console.log(result.result_xdr);               
               tx_status.textContent = "Completed OK";
               if (manageOfferTransaction_flag = true){
                 manageOfferTransaction_flag = false;
                 update_balances();
               }
             }).catch(function(e) {
               console.log("submitTransaction error");
               console.log(e);
               tx_status.textContent = "Transaction failed";
               if (e.extras.result_codes.transaction == "tx_bad_auth"){
                  tx_status.textContent = "Transaction error: tx_bad_auth";
               } else {
                 //console.log(e.extras.result_codes.operations[0]);               
                 tx_status.textContent = "Transaction error: " + e.extras.result_codes.operations[0];
               } 
             }); 
           }          
          })
          .then(function (transactionResult) {
            console.log("tx_result");
            console.log(transactionResult);
            //update_balances();  
            if (typeof transactionResult == "undefined") {
              console.log("tx res undefined");
              //tx_status.textContent = "Transaction error?  result undefined";              
              //return
            }
            //console.log(transactionResult);
            //console.log(transaction.toEnvelope().toXDR().toString("base64"));
            envelope_b64.value = transaction.toEnvelope().toXDR().toString("base64");
            if ( email_flag ) {
              console.log("horizon mode email_flag detected");  
              email_funds_now ("email_funds");
              email_flag = false;
            }
                       
          })
          .catch(function (err) {
            console.log(err);
            email_flag = false;
            tx_status.textContent = "Transaction Error: " + err; 
          });
        }
     
      function createTransaction(key,operation) {
        if (server_mode === "mss_server") {
          console.log("start mss trans");
          createTransaction_mss(key,operation);
        } else {
          createTransaction_horizon(key,operation);
        }
       
      }

      function fix7dec(string) {
        var num = Number(string).toFixed(7);
        string = num.toString();
        return string;
      }

      function createPaymentOperation(asset_obj) {
                 console.log("creatPaymentOperation");                 
                 return StellarSdk.Operation.payment({
                   destination: destination.value,
                   amount: fix7dec(amount.value),
                   asset: asset_obj
                 });
               }

      function createAccountOperation() {
                 return StellarSdk.Operation.createAccount({
                   destination: destination.value,
                   startingBalance: fix7dec(amount.value)
                 });
               }

      function accountMergeOperation() {
                 console.log(destination.value);
                 return StellarSdk.Operation.accountMerge({
                   destination: merge_dest.value
                 });                                     
               }

     function addSignerOperation() {
                 console.log(signer.value);
                 console.log(Number(weight.value));
                 return StellarSdk.Operation.setOptions({
                   signer: {
                     address: signer.value,
                     weight: Number(weight.value)
                   }
                 });
               }

      function addTrustlineOperation(asset_type2, address, limit) {
                 //asset_type examples "USD", "CHP"
                 console.log("addTrustlineOperation");
                 console.log(asset_type2);
                 console.log(address);
                 console.log(limit);
                 asset = new StellarSdk.Asset(asset_type2, address);
                 if (limit.length == 0){
                   return StellarSdk.Operation.changeTrust({asset: asset});
                 } else {
                   return StellarSdk.Operation.changeTrust({asset: asset,limit: limit}); 
                 }
               }

      function setOptionsOperation() {
                 console.log(Number(master_weight.value));
                 console.log(Number(threshold.value));
                 console.log(home_domain.value);
                 var opts = {};
                 //opts.inflationDest = "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7";
                 //opts.clearFlags = 1;
                 //opts.setFlags = 1;
                 opts.masterWeight = Number(master_weight.value);
                 opts.lowThreshold = Number(threshold.value);
                 opts.medThreshold = Number(threshold.value);
                 opts.highThreshold = Number(threshold.value);

                 //opts.signer = {
                 // address: signer.value,
                 // weight: weight.value
                // };
                 opts.homeDomain = home_domain.value;
                 return StellarSdk.Operation.setOptions(opts);
               }

      function activate_trustline(asset_code){
        try {       
          var operation = addTrustlineOperation(asset_code, tissuer.value, tlimit.value);
          asset.value = asset_code; 
        } catch(err) {
           alert("addTrustlineOperation failed" + err);
           return;
        }
        try {
          createTransaction(key,operation);
        } catch(err) {
          alert("createTransaction failed: " + err);
        }
      }

      function manageOfferOperation() {
           console.log("manageOfferOperation");
            var opts = {};
            if (selling_asset_code.value == "XLM") {
              console.log("sell native");
              opts.selling = new StellarSdk.Asset.native();
            } else {
              console.log("sell non native: ");
              console.log(selling_asset_code.value);
              console.log(selling_asset_issuer.value);
              opts.selling = new StellarSdk.Asset(selling_asset_code.value, selling_asset_issuer.value);             
            }
            if (buying_asset_code.value == "XLM") {
              console.log("buying native");
              opts.buying = new StellarSdk.Asset.native();
            } else {
              console.log("buying non native: ");
              console.log(buying_asset_code.value);
              console.log(buying_asset_issuer.value);
              opts.buying = new StellarSdk.Asset(buying_asset_code.value, buying_asset_issuer.value);
            }
            opts.amount = selling_amount.value;
            opts.price = selling_price.value;
            if (cancel_offer_flag) {
              console.log("cancel_offer_flag true");
              opts.offerId = offerid.value;
              opts.amount = '0.0';
              selling_amount.value = '0.0';
            } else {
              //opts.offerId = 0;
              opts.amount = selling_amount.value;
            }
            return StellarSdk.Operation.manageOffer(opts);             
          }

      function set_inflationDest() {
         update_key();
         var opts = {};
         opts.inflationDest = inflation_dest.value;
         var operation = StellarSdk.Operation.setOptions(opts);
         createTransaction(key,operation);
      }
    
      function create_socket() {
        console.log("started create_socket");
        open.disabled = true;
        close.disabled = false;
        var url_ws = url.value + ":" + port.value;
        console.log("url_ws: " + url_ws);
        socket = new WebSocket(url_ws, "echo-protocol");

        socket.addEventListener("open", function(event) {         
          open.disabled = true;
          close.disabled = false;
          status.textContent = "Connected";
        });

        // Display messages received from the mss-server
        // and feed desired responce to browser input boxes
        socket.addEventListener("message", function(event) {
          message.textContent = "Server Says: " + event.data;
          console.log(event.data);
          var event_obj = JSON.parse(event.data);          
          console.log("event_obj.action");
          console.log(event_obj.action);
          if (event_obj.action == "get_account_info") {          
            if (event_obj.accountid == account.value) {
              balance.value = event_obj.balance;
              bal_disp.textContent = event_obj.balance;
            }
            if (event_obj.accountid == destination.value) {
              dest_balance.value = event_obj.balance;
            }
          }
          if (event_obj.action == "get_lines_balance") {
            if (event_obj.accountid == account.value) {
              CHP_balance.value = event_obj.balance;
            }
            if (event_obj.accountid == destination.value) {
              dest_CHP_balance.value = event_obj.balance;
            }            
          }
          if (event_obj.action == "get_sequence") {
            var seq_num = (event_obj.sequence).toString();
            console.log("got sequence");
            console.log(seq_num);
            createTransaction_mss_submit(operation_globle, seq_num)
          }
          if (event_obj.action == "send_b64") {
            get_balance_updates_mss();
          }
        });

        // Display any errors that occur
        socket.addEventListener("error", function(event) {
          message.textContent = "Error: " + event;
        });

        socket.addEventListener("close", function(event) {
          open.disabled = false;
          close.disabled = true;
          status.textContent = "Not Connected";
        });

        socket.onopen = function (event) {
          console.log("got onopen event");
          get_balance_updates_mss();
        };

      }

     
     
      function change_network_func() {
        if (top_image_url.value.length > 4) {
          top_image_span.innerHTML = '<img src="' + top_image_url.value + '" class="img-circle" alt="Add Optional Image here" width="100" height="100">';
        } else {
          top_image_span.innerHTML = '<img src="' + "scotty.png" + '" class="img-circle" alt="Add Optional Image here" width="100" height="100">';
        }
        top_page_title_span.innerHTML = '<h1>' + top_page_title.value + '</h1>';
        bal_disp.textContent = 0; 
        console.log("mode: " + network.value);
        var pub = "Public Global Stellar Network ; September 2015"
        var tes = "Test SDF Network ; September 2015"        
        if(network.value === "testnet" ) {
          server_mode = "horizon";
          close.disabled = true;
          open.disabled = true;
          net_passphrase.value = tes;
          //PUBLIC: "Public Global Stellar Network ; September 2015"
          //TESTNET: "Test SDF Network ; September 2015"
          StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
          //StellarSdk.Network.useTestNetwork();
          //hostname = "horizon-testnet.stellar.org";
          current_mode.value = "Stellar horizon TestNet";
          console.log(socket);
          if (typeof(socket) !== "undefined") {
            socket.close();
          }
          reset_horizon_server();
          active_network.textContent = tes;

        }else if (network.value === "live" ){
          server_mode = "horizon";
          console.log("mode Live!!");  
          close.disabled = true;
          open.disabled = true;
          net_passphrase.value = pub;
          StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
          //StellarSdk.Network.usePublicNetwork();
          //hostname = "horizon-live.stellar.org";          
          current_mode.value = "Stellar horizon Live!!";
          console.log(socket);
          if (typeof(socket) !== "undefined") {
            socket.close();
          }
          reset_horizon_server();
          active_network.textContent = pub;

        }else if (network.value === "live_default" ){
          server_mode = "horizon";
          console.log("mode Live!!");  
          close.disabled = true;
          open.disabled = true;
          net_passphrase.value = pub;
          StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
          url.value = "horizon-live.stellar.org";
          port.value = "443";
          secure.value = "true";
          current_mode.value = "Stellar horizon Live!! default";
          console.log(socket);
          if (typeof(socket) !== "undefined") {
            socket.close();
          }
          reset_horizon_server();
          active_network.textContent = pub;

        }else if (network.value === "testnet_default" ){
          server_mode = "horizon";
          console.log("mode testnet_default");  
          close.disabled = true;
          open.disabled = true;
          net_passphrase.value = tes;
          StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
          url.value = "horizon-testnet.stellar.org";
          port.value = "443";
          secure.value = "true";
          current_mode.value = "Stellar horizon testnet_default";
          console.log(socket);
          if (typeof(socket) !== "undefined") {
            socket.close();
          }
          reset_horizon_server();
          active_network.textContent = tes;

        }else if (network.value === "mss_server_live") {
          //mss-server mode
          server_mode = "mss_server";
          console.log("start mss-server LIVE! mode");          
          paymentsEventSource.close();
          server = false;
          close.disabled = false;
          console.log("here " + url.value.indexOf("horizon"));
          if (Number(url.value.indexOf("horizon")) == 0) {
            console.log("url had horizon at start so will set default");
            url.value = "ws://zipperhead.ddns.net";
            port.value = "9494";
            secure.value = "false";
          }
          //StellarSdk.Network.useTestNet();
          net_passphrase.value = pub;
          StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
          create_socket();
          active_network.textContent = pub;
          current_mode.value = "MSS-server LIVE! mode";

        }else if (network.value === "custom") {
          server_mode = "horizon";
          current_mode.value = "Custom Horizon";
          close.disabled = true;
          open.disabled = true;
          StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
          reset_horizon_server();
          active_network.textContent = net_passphrase.value;

        }else if (network.value === "no_op") {
          console.log("network.value == no_op, do nothing");

        }else  {
          //mss-server mode testnet
          server_mode = "mss_server";
          console.log("start mss-server testnet mode");          
          paymentsEventSource.close();
          server = false;
          close.disabled = false;
          console.log("here " + url.value.indexOf("horizon"));
          if (Number(url.value.indexOf("horizon")) == 0) {
            console.log("url had horizon at start so will set default");
            url.value = "ws://zipperhead.ddns.net";
            port.value = "9494";
            secure.value = "false";
          }
          net_passphrase.value = tes;
          StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
          create_socket();
          active_network.textContent = tes;
          current_mode.value = "MSS-server TestNet";
        }     
        update_balances();          
      }
      
      function save_seed(seed_nick_name_, pass_phrase_, seed_ ) {
        if (typeof(Storage) !== "undefined") {
          var encrypted = CryptoJS.AES.encrypt(seed_, pass_phrase_);       
          // Store
          localStorage.setItem(seed_nick_name_, encrypted);
          //seed.value = "seed saved to local storage"        
        }else {
          message.textContent = "Sorry, your browser does not support Web Storage...";
        }
      }

      function restore_seed(seed_nick_name_, pass_phrase_) {
        if (typeof(Storage) !== "undefined") {
          // Retrieve
          console.log (typeof(seed_nick_name_));
          if (typeof(seed_nick_name_) == "undefined") {
            console.log("here");
            return;
          }
          console.log("getItem: " + seed_nick_name_);
          console.log("len: " + seed_nick_name_.length);
          var encrypted = localStorage.getItem(seed_nick_name_);
          console.log("encrypted: " + encrypted);
          //console.log("len: " + encrypted.length);
          if (encrypted != null) {
            try{
              var seed_ = CryptoJS.AES.decrypt(encrypted, pass_phrase_).toString(CryptoJS.enc.Utf8);
            }catch(e){
              console.log("error in decrypt");
              console.log(e);
              seed_ = "";
            }
          } else {
            seed_ = "";
          }
          console.log("seed type: " + typeof(seed_));
          console.log("seed: " + seed_);
          return seed_
        }else {
          alert("Sorry, your browser does not support Web Storage...");
        }     
      }      

      function display_localstorage_keylist() {
        save.disabled = false;
        var result = "";
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
          //console.log(  localStorage.key( i ) );
          result = result + localStorage.key( i ) + ", ";
        }
        alert(result);
      }

      function addOption(selectbox,text,value ) {
        var optn = document.createElement("OPTION");
        optn.text = text;
        optn.value = value;
        selectbox.options.add(optn);
      }

      function clearOption(selectbox) {
        console.log("clearOption");
        while (selectbox.options.length) {
          selectbox.remove(0);
        }        
      }

      function update_seed_select() {
        clearOption(select_seed);
        var optn = document.createElement("OPTION");
        optn.class = "placeholder selected disabled";
        optn.value = "Select Seed";
        select_seed.options.add(optn);
        var len = localStorage.length;
        for ( var i = 0;  i < len; ++i ){
          if (encodeURI(localStorage.key( i )) != "def_settings"){
            addOption(select_seed, localStorage.key( i ), localStorage.key( i ));
          }
        }
      }

      function restore_seed_option(seednick){
        seed_nick.value = seednick;
        console.log("seed: " + seednick);
        if (seed.length == 0) {
          return;
        }         
        if (typeof(Storage) !== "undefined") {
          // Retrieve
          var encrypted = localStorage.getItem(seed_nick.value);
          seed.value = CryptoJS.AES.decrypt(encrypted, pass_phrase.value).toString(CryptoJS.enc.Utf8);
          save.disabled = false;
          update_seed_select()
          update_key();
          update_balances();
        }else {
          alert("Sorry, your browser does not support Web Storage...");
        }        
      }

       function restore_default_settings(){
        var def_settings_json = localStorage.getItem("def_settings");
        console.log("restore_default_settings");
        console.log(def_settings_json);
        if (def_settings_json == null) {
          // default setting for a users first time run on this browser          
          console.log("type null, restore nothing");
          default_asset_code.value = "FUNT";
          default_issuer.value = "GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU";          
          network.value ="live_default";
          top_image_url.value = "logo.png";
          top_page_title.value = "Funtracker.site Wallet";
          background_img.value = "";
          background_color.value = "#888";
          text_color.value = "#000";
          change_network_func();
          set_default_colors();
          save_default_settings(); 
          return;
        }
        var obj = JSON.parse(def_settings_json);
        server_mode = obj.server_mode;
        net_passphrase.value = obj.net_passphrase;
        current_mode.value = obj.current_mode;
        network.value = obj.network;
        url.value = obj.url;
        port.value = obj.port;
        secure.value = obj.secure; 
        default_asset_code.value = obj.default_asset_code;
        default_issuer.value = obj.default_issuer;
        buying_asset_issuer.value = default_issuer.value;
        selling_asset_issuer.value = default_issuer.value;
        auto_trust.value = obj.auto_trust;       
        if (typeof obj.top_image_url != "undefined" && obj.top_image_url.length > 3) {
          top_image_span.innerHTML = '<img src="' + obj.top_image_url + '" class="img-rounded" alt="Add Optional Image here" width="100" height="100">';
          top_image_url.value = obj.top_image_url;
        } else {
          top_image_span.innerHTML = '<img src="' + "logo.png" + '" class="img-rounded" alt="Add optional Image here2" width="100" height="100">';
          top_image_url.value = "logo.png";
        }
        if (typeof obj.top_page_title != "undefined"){
          console.log("top_page != undefined");
          console.log(obj.top_page_title);
          top_page_title.value = obj.top_page_title;
          top_page_title_span.innerHTML = '<h1>' + obj.top_page_title + '</h1>';
        } else {
          top_page_title.value = "Funtracker.site Wallet";
          top_page_title_span.innerHTML = '<h1>' + top_page_title.value + '</h1>';
        }        
        if (typeof obj.background_color != "undefined"){
          background_color.value = obj.background_color;
        } else {
          background_color.value = "#888";
        }
        if (typeof obj.text_color != "undefined") {
          text_color.value = obj.text_color;
        } else {
          text_color.value = "#000";
        }
        change_color(text_color.value,background_color.value)
        //if (typeof obj.background_img != "undefined"  && obj.background_img.length > 6 ){ 
        if (typeof obj.background_img != "undefined" ){         
          background_img.value = obj.background_img;
          //document.body.style.backgroundImage = 'url(' + background_img.value + ')';
        } else {
          //background_img.value = "images/pilar.gif";
          //document.body.style.backgroundImage = 'url(' + background_img.value + ')';
        }
        set_default_colors();
        console.log(obj);
      }

      function save_default_settings(){
        var obj = {};
        obj.server_mode = server_mode;
        obj.net_passphrase = net_passphrase.value;
        obj.current_mode = current_mode.value;
        obj.network = network.value;
        obj.url = url.value;
        obj.port = port.value;
        obj.secure = secure.value;
        obj.top_image_url = top_image_url.value;
        obj.top_page_title = top_page_title.value;
        obj.background_color = background_color.value;
        obj.text_color = text_color.value;
        obj.background_img = background_img.value;
        obj.default_asset_code = default_asset_code.value;
        obj.default_issuer = default_issuer.value;
        obj.auto_trust = auto_trust.value;
        var string = JSON.stringify(obj);
        localStorage.setItem("def_settings", string);
      }

      save_to_file.addEventListener("click", function(event) {
        console.log("start save_to_file");
       //save all the keys presently seen in LocalStorage on this browser to a local disk file on the system
       // this does not effect the encryption of the keys just moves the data to a file
       var result = "{";
       var first = true;
       for ( var i = 0, len = localStorage.length; i < len; ++i ) {
         if (first){
           first = false;
         }else {
           result = result + ", ";
         }
         //console.log(  localStorage.key( i ) );
         result = result + '"' + encodeURI(localStorage.key( i )) + '"' + " : " + '"' + encodeURI(localStorage.getItem(localStorage.key( i ))) +'"' ;
       }
       result = result + "}";
       message.textContent = result;
       download(result, 'backup_keys.txt', 'text/plain');
     });

       //save string to file
  function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
  }

  function json_to_LocalStorage(jobj) {
    var key_list = "";
    for (var key in jobj){
      key_list = key_list + ", " + decodeURI(key) + " : " + decodeURI(jobj[key]);
      //console.log(decodeURI(key),decodeURI(jobj[key]));
      localStorage.setItem(decodeURI(key), decodeURI(jobj[key]));
    }
    return key_list;
  }



function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    //contents = '{"test" : "one", "test2" : "two"}'
    var json_obj = JSON.parse(contents);        
    displayContents(json_to_LocalStorage(json_obj));
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  //message.textContent = contents;
  console.log("displayContents");
  console.log(contents);
}

    function clear_table2(id) {
      //original version that works but not with table sort now being used
      var table = document.getElementById(id);
      for(var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
      }
    }
  
   function clear_table(id) {
    // stupid clear fix to allow table sort to work
    // for reasons uknown can't delete the first data line, can only clear it's contents to keep sort working
    console.log("clear_table");
    var col_count = document.getElementById(id).rows[0].cells.length;        
    var myTable = document.getElementById(id);
    var rowCount = myTable.rows.length;
    for (var x=rowCount-2; x>0; x--) {
      myTable.deleteRow(x);
    }
    var first_row = document.getElementById(id).rows[1].cells;
    for (var x=col_count-1; x>=0; x--) {
      first_row[x].innerHTML = "";
    }   
 }


      // array = [1,2,3,4]
      function insRow(array,id) {
        var cells = [];
        var x = document.getElementById(id).insertRow(1);
        for(var i = 0; i < array.length; i++) {
          cells[i] = x.insertCell(i);        
          cells[i].innerHTML = array[i];        
        }     
      }

//.order({"asc" or "desc"})
// I don't think we will need this anymore as we now use effects
function get_transactions_desc(bal) {
  console.log("start get_transactions_desc");
  console.log(bal);
  var es = server.transactions()
    .forAccount(account.value)    
    .order("desc")
    .limit(30)
    .call()
    .then(function (page) {
        //console.log("page");
        //console.log(page);
        //console.log("start balance");
        //console.log(bal);
        //var bal = {};
        bal.create_detected = true;
        var native_bal = find_asset_balance(bal.balances,"native","");
        //var native_bal = 0;
        //console.log(page.records);
        var arrayLength = page.records.length;
        for (var i = 0; i < arrayLength; i++) {
          //console.log(page.records[i]._links.transaction.href);                 
          var b64 = page.records[i].envelope_xdr;
          var tx = new StellarSdk.Transaction(b64);          
          page.records[i].tx = tx;                 
          page.records[i].memo_type = tx.memo._arm;
          page.records[i].memo_value = tx.memo._value;
          //page.records[i].from = tx.operations[0].source;
          page.records[i].from = page.records[i].source_account;          
          page.records[i].amount = tx.operations[0].amount;
          page.records[i].startingBalance = tx.operations[0].startingBalance;
          page.records[i].type = tx.operations[0].type;
          page.records[i].to = tx.operations[0].destination;
          page.records[i].timeBounds = tx.tx.timeBounds;
          page.records[i].asset = tx.operations[0].asset;
          page.records[i].asset_code = "XLM";
          //console.log("page_tx i: " + i);
          //console.log(page.records[i]);  
          if (typeof page.records[i].asset != "undefined") {
           // console.log("asset != undefined");
            page.records[i].asset_issuer = tx.operations[0].asset.issuer;
            page.records[i].asset_code = tx.operations[0].asset.code;
          }
          //console.log("asset_code: " + page.records[i].asset_code);
          var amount = parseFloat(page.records[i].amount);
          if (account.value == page.records[i].from) {
            amount = (amount * -1) ;
            if (page.records[i].asset_code == "XLM"){
              amount = parseFloat(fix7dec(amount - 0.0001));
            }
            page.records[i].amount = amount;
          } 
          //if (page.records[i].type == "payment") {
          if (page.records[i].type == "pathPayment" || page.records[i].type == "payment") {
            console.log("payment");
            if (page.records[i].type == "pathPayment") {
              console.log("pathPayment");
              amount = page.records[i].tx.operations[0].destAmount;
              page.records[i].asset_code = page.records[i].tx.operations[0].destAsset.code;
              page.records[i].asset_issuer = page.records[i].tx.operations[0].destAsset.issuer;
              amount = parseFloat(amount);
              if (account.value == page.records[i].from) {
                amount = (amount * -1) ;
                if (page.records[i].asset_code == "XLM"){
                  amount = parseFloat(fix7dec(amount - 0.0001));
                }
                page.records[i].amount = amount;
              }
              page.records[i].amount = amount;  
              console.log(page.records[i].amount);
              console.log(page.records[i].asset_code);
              console.log(page.records[i].asset_issuer);
            }
            if (bal.create_detected == true) {                             
              if (page.records[i].asset_code == "XLM") {
                console.log("asset is XLM");     
                //native_bal = native_bal + amount - 0.0001;
                bal.native = fix7dec(native_bal);                                                                    
                page.records[i].bal = clone(bal);                
                page.records[i].trans_asset_bal = native_bal;
                native_bal = native_bal - amount ;
                console.log("native_bal");
                console.log(native_bal);                
              } else {
                //console.log("asset not XLM");
                var asset_not_found = true;
                var blen = bal.balances.length;
                console.log("bal.balances");
                console.log(bal.balances);
                for (var a = 0; a < blen; a++) {                  
                  if (bal.balances[a]["asset_code"] == page.records[i].asset_code && bal.balances[a]["asset_issuer"] == page.records[i].asset_issuer){                                                                                                     
                    page.records[i].bal = clone(bal);
                    bal.balances[a]["balance"] =  parseFloat(bal.balances[a]["balance"]) - amount;
                    //page.records[i].trans_asset_bal = parseFloat(bal.balances[a]["balance"]) - amount;
                    //native_bal = native_bal + 0.0001;   
                    asset_not_found = false;
                  }
                }
                if (asset_not_found) {
                  //console.log("asset_not_found add new: " + page.records[i].asset_code);                                 
                  //bal.balances[blen] = {};
                  //bal.balances[blen]["asset_code"] = page.records[i].asset_code;
                  //bal.balances[blen]["asset_issuer"] = page.records[i].asset_issuer;
                  //bal.balances[blen]["balance"] = amount; 
                  page.records[i].asset_code = "XLM";
                  page.records[i].type = "trade";               
                  page.records[i].bal = clone(bal);
                  //page.records[i].trans_asset_bal = page.records[i].bal.balances["balance"];
                  //console.log(page.records[i].bal);
                }
                if (account.value == page.records[i].from) {
                  native_bal = native_bal + 0.0001; 
                } 
              }              
            }            
          }
          if (page.records[i].type == "createAccount") {            
            if (page.records[i].from != account.value) {
              bal.create_detected = true;              
              bal.native = fix7dec(native_bal);
              page.records[i].bal = clone(bal); 
              native_bal = parseFloat(page.records[i].startingBalance);
              page.records[i].amount = native_bal;          
            } else {
              //console.log("createaccount to diff dest");
              //native_bal = native_bal + parseFloat(page.records[i].startingBalance) + 0.0001;              
              bal.native = fix7dec(native_bal);
              page.records[i].bal = clone(bal); 
              page.records[i].amount = (parseFloat(page.records[i].startingBalance)) * -1 - 0.0001;
              native_bal = native_bal + parseFloat(page.records[i].startingBalance) + 0.0001;
            }        
          }
          // all transaction sent by you still pay .0001 Lumens so account for that here
          if (page.records[i].type != "payment" && page.records[i].type != "createAccount" && page.records[i].type != "pathPayment"){
            //console.log("trans not pay or create");
            bal.native = fix7dec(native_bal);
            page.records[i].bal = clone(bal);
            //console.log(page.records[i].type);
            if (account.value == page.records[i].from){
              page.records[i].amount = -0.0001;
              native_bal =  native_bal + 0.0001; 
            }                       
          }
          //console.log("end of for loop");                               
        }
        console.log("page.records");  
        console.log(page.records);
        display_history(page.records);
    });
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}

// not used anymore see insert_history
// this was originaly write to support get_transactions_desc(bal)
function display_history(page){
  console.log("start display_history");
  //console.log(page);
  clear_table("table");
  var ar = [];
  var len = page.length;
  //console.log("disp length: " + len);
  for (var i = len - 1; i >= 0; i--) { 
    var amount = parseFloat(page[i].amount);
    var red = '<font color="red">';
    var green = '<font color="green">';
    var font_color;
    if (amount > 0){
      font_color = '<font color="green">';
      ar[0] = font_color + page[i].from + "</font>";
    } else {
      font_color = '<font color="red">';
      ar[0] = font_color + page[i].to + "</font>";
    }
    //console.log(page[i]);
    //console.log(page[i].created_at);
    //console.log(page[i].from);
    //console.log(page[i].to);
    //console.log(page[i].amount);
    //console.log(page[i].asset_code);
    //console.log(page[i].memo);
    //ar[0] = page[i].from;
    //ar[1] = page[i].to;
    
    ar[1] = font_color + page[i].type + "</font>";
    ar[2] = font_color + page[i].asset_code + "</font>";
    ar[3] = font_color + page[i].amount + "</font>";  
    if (page[i].asset_code == "XLM" || page[i].asset_code == "native") {
      ar[4] =  font_color + page[i].bal.native + "</font>";
    } else {
      ar[4] = font_color + fix7dec(find_asset_balance(page[i].bal.balances,page[i].asset_code,"")) + "</font>";
    }
    ar[5] = font_color + page[i].memo + "</font>";
    ar[6] = font_color + page[i].created_at + "</font>";
    if (page[i].type != "trade"){ 
      insRow(ar,"table"); 
    }
  }
}

    function display_asset_table(account_obj){
       console.log("display_asset_table");
       console.log(account_obj.balances);
       clear_table("table_asset");
       
       var ar = [];
       var len = account_obj.balances.length;
       //console.log("disp length: " + len);
       for (var i = len - 1; i >= 0; i--) {
         if (account_obj.balances[i].asset_type == "native") {
           ar[0] = "XLM";
           ar[1] = "";
         } else { 
           ar[0] = account_obj.balances[i].asset_code;
           ar[1] = account_obj.balances[i].asset_issuer;
         }
         ar[2] = account_obj.balances[i].balance;
         ar[3] = account_obj.balances[i].limit;
         insRow(ar,"table_asset");
       }
    }

    function find_asset_balance(asset_array,asset_code, issuer) {
      //console.log("find_asset_balance: " + asset_code);
      //console.log(asset_array);
     // if issuer "" then ignore     
      var len = asset_array.length;
      for (var i = 0; i < len; i++) {
        if ((asset_code == "XLM" || asset_code == "native") && asset_array[i].asset_type == "native"){
          //console.log("asset XLM found bal: " + asset_array[i].balance);
          return parseFloat(asset_array[i].balance);
        }
        if (asset_code == asset_array[i].asset_code) {
          if (issuer == asset_array[i].issuer || issuer == "") {
            //console.log("asset found match" + asset_code);
            //console.log("bal: " + asset_array[i].balance);
            return parseFloat(asset_array[i].balance);
          }
        }
      }
      //console.log("no asset match found, return 0");
      return 0;        
    }

    function export_to_centaurus () {
      var cent_keys = {
	    address : key.accountId(),
	    secret : key.seed()
        };
	  var plain = JSON.stringify(cent_keys);
	  var backupString = CryptoJS.AES.encrypt(plain, pass_phrase.value);
	  var body = 'centaurus:backup003' + backupString;
      console.log("export centaurus: " + body);
	  return body;
    }

   function get_offers(){
     console.log("get_offers");
     server.offers("accounts", account.value)
      .limit(40)
      .call()
      .then(function (offerResult) {
        //console.log("offer results");
        //console.log(offerResult);
        display_offer_table(offerResult);
      })
      .catch(function (err) {
        console.log("offer results error");
        console.error(err);
      });
   }

   function display_offer_table(offer_obj){
       console.log("display_offer_table");
       console.log(offer_obj);
       //console.log(offer_obj.records);
       clear_table("table_offers");
       var ar = [];
       var len = offer_obj.records.length;
       //console.log("disp length: " + len);
       for (var i = len - 1; i >= 0; i--) {
         ar[0] = offer_obj.records[i].id
         if (offer_obj.records[i].selling.asset_type == "native") {
           ar[1] = "XLM";
           ar[2] = "";
         } else {        
           ar[1] = offer_obj.records[i].selling.asset_code;
           ar[2] = offer_obj.records[i].selling.asset_issuer;  
         }                
         ar[3] = offer_obj.records[i].amount;
         ar[4] = offer_obj.records[i].price; 
         if (offer_obj.records[i].buying.asset_type == "native") {
           ar[5] = "XLM";
           ar[6] = "";
         } else {     
           ar[5] = offer_obj.records[i].buying.asset_code;
           ar[6] = offer_obj.records[i].buying.asset_issuer;
         }
         insRow(ar,"table_offers");
         //table_sort_offers.refresh();
       }
    }


      function change_color(text_color,background_color) {
        console.log("change_color_text text, background");
        console.log(text_color + " " + background_color);
        document.body.style.backgroundColor = background_color;
        document.body.style.color = text_color;
        var el = [
	document.getElementsByTagName('p'),
	document.getElementsByTagName('h1'),
	document.getElementsByTagName('h2'),
	document.getElementsByTagName('h3'),
	document.getElementsByTagName('h4'),
        document.getElementsByTagName('h5'),
        document.getElementsByTagName('th'),
	];
        var i;
        var j;
	for ( i in el) {
	  for (j in el[i]) {
	    if (el[i][j].style){
	     el[i][j].style.color = text_color;
            }
	  }
	}
      } 

    function set_default_colors() {
      if (background_color.value.length > 2 && text_color.length > 2){
        change_color(text_color.value,background_color.value);
      } else {
        //background_color.value = "#777";
      }      
      change_color(text_color.value,background_color.value)
      if ( background_img.value.length > 6 ){          
        document.body.style.backgroundImage = 'url(' + background_img.value + ')';
      } else {
         background_img.value = "";
         document.body.style.backgroundImage = 'url(' + background_img.value + ')';
      }
    }

    function check_paths_function() {
      clear_table("table_paths");
      var asset_obj;
      if (paths_destination_asset.value == "native" || paths_destination_asset.value == "XLM"){
        asset_obj = new StellarSdk.Asset.native();
      } else {
        asset_obj = new StellarSdk.Asset(paths_destination_asset.value, paths_destination_asset_issuer.value);
      }
      server.paths(account.value, paths_destination_addressID.value, asset_obj, paths_destination_amount.value)
      .call()
      .then(function(result) {
        console.log("results paths: ");
        console.log(result);
        var records = result.records;
        for (var i = 0; i < records.length; i++) {
          insert_paths_table(records[i]);
        }
       });              
     }
 
    var bidask;
    var best_bid_ask;

    function check_orderbook(bidask_in) {
      bidask = bidask_in;
      clear_table("table_orderbook");
      console.log("check_orderbook bidask: " + bidask);
      // activated with check_orderbook_button click
      // orderbook_buy_asset, orderbook_buy_issuer, orderbook_sell_asset, orderbook_sell_issuer
      if (orderbook_buy_asset.value.length == 0){
        orderbook_buy_asset.value = asset.value;
        orderbook_buy_issuer.value = issuer.value;
      }
      if (orderbook_sell_asset.value.length == 0){
        orderbook_sell_asset.value = asset.value;
        orderbook_sell_issuer.value = issuer.value;
      }
      var buy_asset;
      var sell_asset;
      if (orderbook_buy_asset.value == "native" || orderbook_buy_asset.value == "XLM"){
        buy_asset = new StellarSdk.Asset.native();
        orderbook_buy_issuer.value = "";
      } else {
        if (orderbook_buy_issuer.value.length == 0){
          orderbook_buy_issuer.value = issuer.value;
        }
        buy_asset = new StellarSdk.Asset(orderbook_buy_asset.value, orderbook_buy_issuer.value);
      }
      if (orderbook_sell_asset.value == "native" || orderbook_sell_asset.value == "XLM"){
        sell_asset = new StellarSdk.Asset.native();
        orderbook_sell_issuer.value = "";
      } else {
        if (orderbook_sell_issuer.value.length == 0){
          orderbook_sell_issuer.value = issuer.value;
        }
        sell_asset = new StellarSdk.Asset(orderbook_sell_asset.value, orderbook_sell_issuer.value);
      }
      server.orderbook(buy_asset,sell_asset)
     //.trades()
     .call()
     .then(function(result) {
        console.log("check_orderbook results");
        console.log(result);
        var records;
        if (bidask == "ask"){
          records = result.asks;
        } else {
          records = result.bids;
        }
        if (bidask == "ask"){
          best_bid_ask = 9999999999;
        } else {
          best_bid_ask = 0;
        }
        var price_r;
        for (var i = 0; i < records.length; i++) {
          if (bidask == "ask"){
            price_r = Number(records[i].price_r.d)/Number(records[i].price_r.n);            
            if (best_bid_ask > price_r ){
               best_bid_ask = price_r; 
            } 
            console.log("price_r: ");
            console.log(price_r);
            console.log("best_bid_ask");
            console.log(best_bid_ask);
          } else {
            if (best_bid_ask < Number(records[i].price)){
               best_bid_ask = Number(records[i].price);
            }
            console.log("best_bid_ask: ");
            console.log(best_bid_ask);
            console.log("Number(records[i].price)");
            console.log(Number(records[i].price));
          }
          insert_orderbook_table(records[i]);
        } 
      })
     .catch(function(err) { console.log(err); });
    }

    function better_bid_ask_function() {
// orderbook_buy_asset, orderbook_buy_issuer, orderbook_sell_asset, orderbook_sell_issuer
//selling_asset_code.value, selling_asset_issuer.value, buying_asset_code.value, buying_asset_issuer.value, selling_amount.value, selling_price.value
      selling_asset_code.value = orderbook_sell_asset.value;
      console.log("sell code:");
      console.log(selling_asset_code.value);
      selling_asset_issuer.value = orderbook_sell_issuer.value;
      buying_asset_code.value = orderbook_buy_asset.value;
      buying_asset_issuer.value = orderbook_buy_issuer.value;

      //selling_asset_code.value = orderbook_buy_asset.value;
      //selling_asset_issuer.value = orderbook_buy_issuer.value;
      //buying_asset_code.value = orderbook_sell_asset.value;
      //buying_asset_issuer.value = orderbook_sell_issuer.value;
      selling_price.value = (best_bid_ask + (best_bid_ask * (Number(better_bid_ask.value)/100)));
      console.log("selling_price: " + selling_price.value);
      //window.location.href = "#create_offer";
    }
 

   //triger the event of readSingleFile when file-input browse button is clicked and a file selected
     //this event reads the data from a local disk file and restores it's contents to the LocalStorage
     // the file selected is assumed to be in seed_save_recover backup format.
     document.getElementById('file-input').addEventListener('change', readSingleFile, false);

     
      select_seed.onchange=function(){ //run some code when "onchange" event fires
        var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
        if (chosenoption.value!="nothing"){
          console.log("selected value: " + chosenoption.value);
          restore_seed_option(chosenoption.value);
        }
      }

      better_bid_ask_button.addEventListener("click", function(event) {
        //check_orderbook("ask");
        better_bid_ask_function();
      }); 
        
      check_orderbook_ask_button.addEventListener("click", function(event) {
        check_orderbook("ask");
      }); 

      check_orderbook_bid_button.addEventListener("click", function(event) {
        check_orderbook("bid");
      });

      check_paths.addEventListener("click", function(event) {
        check_paths_function();
      });   

      gen_random_dest.addEventListener("click", function(event) {
        console.log("gen_random");         
        var new_keypair = StellarSdk.Keypair.random();
        destination.value = new_keypair.accountId();
        paths_destination_addressID.value = destination.value;
        dest_seed.value = new_keypair.seed();
        //update_balances();
        amount.value = 20.1;
        issuer.value = "";
        asset.value = "native";
        console.log("new_account:");
        console.log(new_account.checked);
        new_account.checked=true;
        //save_seed("seed1", "", seed.value );
        save_seed("seed2", "", dest_seed.value );
      });
            
      send_payment.addEventListener("click", function(event) {
        console.log("send_payment clicked");
        try {                      
          sendPaymentTransaction();
        } catch(err) {
          alert("send_payment error: " + err);
        }       
      });

      add_trustline.addEventListener("click", function(event) {
        console.log("add_trustline click");
        console.log(tasset.value);
        console.log(asset.value);
        console.log(tissuer.value);
        update_key();
        try { 
          //asset_type.value = tasset.value;
          //asset.value = tasset.value;         
          var operation = addTrustlineOperation(tasset.value, tissuer.value, tlimit.value);
          asset.value = tasset.value; 
          console.log("post asset.value: " + asset.value);
          console.log("post tasset.value: " + tasset.value);
        } catch(err) {
           alert("addTrustlineOperation failed" + err);
        }
        try {
          createTransaction(key,operation);
        } catch(err) {
          alert("createTransaction failed: " + err);
        }
        //update_balances();
      });

      set_inflation_dest.addEventListener("click", function(event) {
        try { 
          update_key();
          var opts = {};
          opts.inflationDest = inflation_dest.value;
          var operation = StellarSdk.Operation.setOptions(opts);
          createTransaction(key,operation);
        } catch(err){
          alert("set_inflation_dest error: " + err);
        }
      });

      add_signer.addEventListener("click", function(event) {
        console.log("click add_signer");
        try {
          addSignerTransaction();
          //update_balances();
        } catch(err){
          alert("add_signer error: " + err);
        }
      });

      change_threshold.addEventListener("click", function(event) {
        console.log("click change_threshold");
        try {
          setOptionsTransaction();
          //update_balances();
        } catch(err){
          alert("change_threshold error: " + err);
        }
      
      });

      
      swap_seed_dest.addEventListener("click", function(event) { 
        var seed_swap = seed.value;
        var accountId_swap = account.value
        seed.value = dest_seed.value;
        dest_seed.value = seed_swap;
        account.value = destination.value;
        account_tx.address = account.value;
        destination.value = accountId_swap;
        paths_destination_addressID.value = destination.value;         
        update_key();        
        if (dest_seed.value.length == 56) {
          var temp_key = StellarSdk.Keypair.fromSeed(dest_seed.value);
          destination.value = temp_key.accountId();
          paths_destination_addressID.value = destination.value;
        }
        update_balances();
        if (seed.value.length == 56){
          save_seed("seed1", "", seed.value);
        }
        if (dest_seed.value.length == 56){
          save_seed("seed2", "", dest_seed.value);
        }
        sign_tx.disabled = false;
        update_seed_select();
      });

      decrypt_seed.addEventListener("click", function(event) {
        var temp = CryptoJS.AES.decrypt(seed.value, pass_phrase.value).toString(CryptoJS.enc.Utf8);
        console.log("length temp: " + temp.length);
        if (temp.length > 0) {
          seed.value = temp;
        } else {
          alert("bad pass phrase for decrypt_seed");
        }
      });

      encrypt_seed.addEventListener("click", function(event) {
        seed.value = CryptoJS.AES.encrypt(seed.value, pass_phrase.value);  
      });

      sign_tx.addEventListener("click", function(event) {
        try {
          update_key();
          var b64 = sign_b64_tx(envelope_b64.value,key);
          console.log("signer accountId: " + key.accountId());
          console.log("b64: " + b64);
          envelope_b64.value = b64;
          sign_tx.disabled = true;
        } catch(err) {
          alert("sign_tx error: " + err);
        }
      });


      send_tx.addEventListener("click", function(event) {
        try {
          if (server_mode == "mss_server") {
            console.log("send_tx mss_server mode");
            submitTransaction_mss_b64(envelope_b64.value);
          } else {
            console.log("send_tx horizon mode");
            console.log(envelope_b64.value);
            submitTransaction_horizon_b64(envelope_b64.value);
          }
        } catch(err) {
          alert("send_tx error: "+ err);
        }
      });

      email_funds.addEventListener("click", function(event) {
        // this will generate a transaction to send funds to
        // the destination accountID and seed will be included in the email of the body
        // it will then generate a transaction and add it as a link to the wallet in the body of the email
        // we will later make the transaction expire if demand exists
        try {
          email_flag = true;
          sendPaymentTransaction();
          sign_tx.disabled = false;
        } catch(err) {
          alert("email_funds error: " + err);
        }
      });

      email_tx.addEventListener("click", function(event) {
        try {
          email_funds_now("email_tx");
        } catch(err) {
          alert("email_tx error: " + err);
        }
      });

      fed_lookup.addEventListener("click", function(event) {
        send_fed_to = "dest";
        try {
          console.log("destination.value.length: " + destination.value.length);
          if (destination.value.length == 56) {
            reverse_federation_lookup(destination.value);
          } else {
            federation_lookup(destination.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

     fed_lookup_issuer.addEventListener("click", function(event) {
        send_fed_to = "issuer";
        try {
          console.log("issuer.value.length: " + issuer.value.length);
          if (issuer.value.length == 56) {
            reverse_federation_lookup(issuer.value);
          } else {
            federation_lookup(issuer.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

     fed_lookup_signer.addEventListener("click", function(event) {
        send_fed_to = "signer";
        try {
          console.log("signer.value.length: " + signer.value.length);
          if (signer.value.length == 56) {
            reverse_federation_lookup(signer.value);
          } else {
            federation_lookup(signer.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

     fed_lookup_inflation_dest.addEventListener("click", function(event) {
        send_fed_to = "inflation_dest";
        try {
          console.log("inflation_dest.value.length: " + inflation_dest.value.length);
          if (inflation_dest.value.length == 56) {
            reverse_federation_lookup(inflation_dest.value);
          } else {
            federation_lookup(inflation_dest.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

      fed_lookup_tissuer.addEventListener("click", function(event) {
        send_fed_to = "tissuer";
        try {
          console.log("tissuer.value.length: " + tissuer.value.length);
          if (tissuer.value.length == 56) {
            reverse_federation_lookup(tissuer.value);
          } else {
            federation_lookup(tissuer.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

     fed_lookup_selling_asset_issuer.addEventListener("click", function(event) {
        send_fed_to = "selling_asset_issuer";
        try {
          console.log("selling_asset_issuer.value.length: " + selling_asset_issuer.value.length);
          if (selling_asset_issuer.value.length == 56) {
            reverse_federation_lookup(selling_asset_issuer.value);
          } else {
            federation_lookup(selling_asset_issuer.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

     fed_lookup_buying_asset_issuer.addEventListener("click", function(event) {
        send_fed_to = "buying_asset_issuer";
        try {
          console.log("buying_asset_issuer.value.length: " + buying_asset_issuer.value.length);
          if (buying_asset_issuer.value.length == 56) {
            reverse_federation_lookup(buying_asset_issuer.value);
          } else {
            federation_lookup(buying_asset_issuer.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

     fed_lookup_merge_dest.addEventListener("click", function(event) {
        send_fed_to = "merge_dest";
        try {
          console.log("merge_dest.value.length: " + merge_dest.value.length);
          if (merge_dest.value.length == 56) {
            reverse_federation_lookup(merge_dest.value);
          } else {
            federation_lookup(merge_dest.value);
          }
        } catch(err) {
          alert("fed_lookup error: " + err);
        }
      });

     submit_offer.addEventListener("click", function(event) {
        console.log("submit_offer clicked");
        cancel_offer_flag = false;
        manageOfferTransaction_flag = true;
        try {
          manageOfferTransaction();
        } catch(err) {
          console.log("manageOfferTransaction error catch: " + err);
          alert("manageOfferTransaction error: "+ err);
        }       
      });

     cancel_offer.addEventListener("click", function(event) {
        console.log("submit cancel offer clicked");
        cancel_offer_flag = true;
        //get_offerid();
        try {
          manageOfferTransaction();
        } catch(err) {
          console.log("manageOfferTransaction error catch: " + err);
          alert("manageOfferTransaction error: "+ err);
        }    
      });

       save.addEventListener("click", function(event) {         
        if (typeof(Storage) !== "undefined") {
          var encrypted = CryptoJS.AES.encrypt(seed.value, pass_phrase.value);       
          // Store
          localStorage.setItem(seed_nick.value, encrypted);
          //seed.value = "seed saved to local storage"
          save.disabled = true;
          update_seed_select(); 
          update_key();
          //update_balances();       
        }else {
          alert("Sorry, your browser does not support Web Storage...");
        }
      });

                 
      delete_key.addEventListener("click", function(event) {
        // delete key_id from LocalStorage    
        console.log("deleting key "+ seed_nick.value);              
        localStorage.removeItem(seed_nick.value);        
        alert("seed_nick: " + seed_nick.value + " deleted from LocalStorage");
        update_seed_select();
        //display_localstorage_keylist();        
      });

      restore.addEventListener("click", function(event) {
        seed.value = restore_seed(seed_nick.value, pass_phrase.value);
        update_seed_select();
        update_key();
        update_balances();
        
      });

       // Create a new connection when the Connect button is clicked
      open.addEventListener("click", function(event) {
        create_socket();
      });

      merge_accounts.addEventListener("click", function(event) {
        accountMergeTransaction();
      });


      // Close the connection when the Disconnect button is clicked
      close.addEventListener("click", function(event) {
        console.log("closed socket");
        //close.disabled = true;
        close.disabled = false;
        open.disabled = false;
        message.textContent = "";
        //socket.close();
        
      });

      change_network.addEventListener("click", function(event) {
        change_network_func();
        set_default_colors();
        asset.value = default_asset_code.value;
        issuer.value = default_issuer.value;
        tissuer.value = default_issuer.value;
        if (default_asset_code.value != "native"){
          tasset.value = default_asset_code.value;
        } else {
          //tasset.value = "";
        }
        save_default_settings();               
      }); 


  });

