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
      var amount = document.getElementById("amount");
      //var balance = document.getElementById("balance");
      var balance = {};
      var CHP_balance = document.getElementById("CHP_balance");
      var asset_type = document.getElementById("asset_type");
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
    //var server_mode = "mss_server";
      //bal_disp.textContent = "test";
      reset_horizon_server(); 
      seed.value = restore_seed("seed1", "");
  
      var qrcode = new QRCode(document.getElementById("qrcode"), {
	    width : 200,
	    height : 200
      });

      var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
	    width : 200,
	    height : 200
      });
 
      //net_passphrase.value = "Test SDF Network ; September 2015";
      restore_default_settings();
      StellarSdk.Network.use(new StellarSdk.Network(net_passphrase.value));
      active_network.textContent = net_passphrase.value ;
        

      console.log("seed.value: " + seed.value);     
      console.log("seed.value.length: " + seed.value.length);
            
      //key = StellarSdk.Keypair.fromSeed(seed.value);
      if (seed.value.length != 56) {
        key = StellarSdk.Keypair.random();
        console.log("key ok");
        account.value = key.accountId();
        console.log("account ok");
        seed.value = key.seed();
        console.log("seed ok");
        save_seed("seed1", "", seed.value );
      } else {
         account.value = StellarSdk.Keypair.fromSeed(seed.value).accountId();
         key = StellarSdk.Keypair.fromSeed(seed.value);
         update_key();
      }
      //seed.value = 'SA3CKS64WFRWU7FX2AV6J6TR4D7IRWT7BLADYFWOSJGQ4E5NX7RLDAEQ'; 
      //account.value = 'GAMCHGO4ECUREZPKVUCQZ3NRBZMK6ESEQVHPRZ36JLUZNEH56TMKQXEB'
   
      asset.value = "native";

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
        }
        if (typeof params["env_b64"] != "undefined") {
          console.log("env_b64 param detected");
          envelope_b64.value = params["env_b64"];
          account.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].destination;
          console.log(new StellarSdk.Transaction(envelope_b64.value).operations[0].asset);
          tissuer.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].asset.issuer;
          tasset.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].asset.code;
          asset_type.value = tasset.value;
        }               
        if (typeof params["seed"] != "undefined") {
          seed.value = params["seed"];
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
        }
        if (typeof params["destination"] != "undefined") {
          destination.value = params["destination"];
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
        memo.value = "scotty_is_cool";
      }
      if (typeof amount.value == "undefined"){
        amount.value = "1"; 
      }
      //console.log("asset_type: " + (typeof asset_type.value));
      //console.log("asset_type.length: " + asset_type.value.length);
      if (typeof tasset.value == "undefined" || tissuer.value.length == 0) {     
        //asset_type.value = "AAA";
        tissuer.value = 'GAX4CUJEOUA27MDHTLSQCFRGQPEXCC6GMO2P2TZCG7IEBZIEGPOD6HKF';
        issuer.value = tissuer.value;
        tasset.value = 'AAA';
      }
      
      if (typeof destination.value == "undefined"){
        dest_seed.value = restore_seed("seed2", "");
        console.log("dest_seed.value: " + dest_seed.value);
        if (dest_seed.value.length != 0) {
          destination.value = StellarSdk.Keypair.fromSeed(dest_seed.value).accountId();
          console.log("dest: " + destination.value); 
        }
      }   
            
      reset_horizon_server();
      update_seed_select();
      //current_mode.value = "Stellar horizon TestNet";
      
      bal_disp.textContent = 0;
      update_balances();
      start_effects_stream();
      
      var xmlhttp = new XMLHttpRequest();

      account_disp.textContent = account.value;
      account_disp2.textContent = account.value;
      makeCode();

      //var array = [1,2,3,4,5];
      //insRow(array,"table");

      xmlhttp.onreadystatechange = function() {
              console.log("onreadystatechange");
              console.log("readystate: " + xmlhttp.readyState + " xmlhttp.status: " + xmlhttp.status);
              if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log("responseText: " + xmlhttp.responseText);
                var myArr = JSON.parse(xmlhttp.responseText);
                console.log("xmlhttp response");                
                console.log(myArr);
                console.log(myArr.account_id);
                if (fed_mode_forward) {
                  destination.value = myArr.account_id;
                  dest_seed.value = "";
                  update_balances();
                } else {
                  destination.value = myArr.stellar_address;
                }
              }
      };



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
       qrcode.makeCode(export_to_centaurus());
       //console.log("qrcode account: " + account.value);
       qrcode2.makeCode(account.value);        
     } 

          function email_funds_now (mode) {
            if (mode != "email_tx"){
             var mail = "mailto:" + email_address.value +"?subject= Stellar funds transmittal for: " + amount.value + " of asset: "+ asset.value + "&body=Click on the link bellow to collect the funds I have sent you for the amount of " + amount.value + " of asset type: "+ asset.value + " to the accountID " + destination.value + " secret seed if contained: " + dest_seed.value  + "  just click Link: https://sacarlson.github.io/transaction_toolsv0.4.0.html?json={%22env_b64%22:%22" + envelope_b64.value + "%22}   " +  ". From within the wallet just hit send_tx button to transact the issued transaction and verify balance received.   Or if you prefer other methods of receiving the transaction the Stellar envelope base64: " + envelope_b64.value;
        } else {
          var mail = "mailto:" + email_address.value +"?subject= Stellar TX transaction to be signed &body=Click on the link bellow to go to signing tool just click Link: http://sacarlson.github.io//transaction_toolsv0.4.0.html?json={%22env_b64%22:%22" + envelope_b64.value + "%22}   . From within the wallet just hit sign_tx to sign and send_tx button to transact the issued transaction after fully signed.   Or if you prefer other methods of signing tx the Stellar envelope base64: " + envelope_b64.value;
        }
        console.log("mail content: ");
        console.log(encodeURI(mail));
        message.textContent = encodeURI(mail);
        window.open(encodeURI(mail));
          }

          function federation_lookup(){
            // need to add stellar.toml lookup at some point or just move to stellar sdk implementation of lookup
            fed_mode_forward = true;
            console.log("federation_lookup click detected");
            //https://equid.co/federation?q=sacarlson*equid.co&type=name'
            //var url = "https://equid.co/federation?q=" + destination.value + "*equid.co&type=name";
            var url = "https://api.";
            // sacarlson*equid.co
            var index_at = destination.value.indexOf("@");
            var index_ast = destination.value.indexOf("*");
            console.log("index_at: " + index_at);
            console.log("index_ast: " + index_ast);
            if (index_at == -1 && index_ast == -1){
              destination.value = destination.value + "*equid.co";
            }
            if (index_at >= 0 && index_ast >= 0){
              console.log("have both * and @ in lookup, so don't change");
            } else{
              console.log("only have * or @ in lookup, will change any @ to *");
              destination.value = destination.value.replace("@", "*");
            }
            var start_index = destination.value.indexOf("*");
            url = url + destination.value.substring(start_index+1);
            console.log("url: " + url);
            url = url + "/federation?q=" + destination.value + "&type=name";
            console.log("url+: " + url);
            xmlhttp.open("GET", url, true);
            xmlhttp.send();            
          }

          function reverse_federation_lookup(){
            // this also need stellar.toml file lookup at some point or trash for stellar sdk version when working
            fed_mode_forward = false;
            console.log("reverse_federation_lookup click detected");
            //console.log(account_obj_global);
            if (typeof destination_home_domain == "undefined") {
              console.log("no home_domain");
            } else {
              var url = "https://api." + destination_home_domain + "/federation?q=" + destination.value +"&type=id";
              console.log("url: " + url);
              xmlhttp.open("GET", url, true);
              xmlhttp.send();
            }            
          }

         
          
          function attachToPaymentsStream(opt_startFrom) {
            console.log("start attacheToPaymentsStream");
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

          function start_effects_stream() {
	        server.effects()
            .forAccount(account.value)
            .limit(30)
            .order('desc')
            .call()
            .then(function (effectResults) {
                console.log("then effectResults");
                var length = effectResults.records ? effectResults.records.length : 0;
                for (index = length-1; index >= 0; index--) {
                    //console.log("index" + index);
                    var currentEffect = effectResults.records[index];
                    effectHandler(currentEffect, false);
                }
                var startListeningFrom;
                if (length > 0) {
                    latestPayment = effectResults.records[0];
                    startListeningFrom = latestPayment.paging_token;
                }
                attachToPaymentsStream(startListeningFrom);
            })
            .catch(function (err) {
                //console.log(err);
                //console.log("error detected in attachToPaymentsStream");
                attachToPaymentsStream('now');               
            });
          }

          function effectHandler(effect,tf) {
            console.log("got effectHandler event");
            //console.log(tf);
            //console.log(effect);
            //console.log("balance.value: " + balance.value);
            if (effect.type === 'account_debited') {
               if (effect.asset_type === "native") {
                  balance.value = parseFloat(balance.value) - parseFloat(effect.amount);
                  bal_disp.textContent = fix7dec(balance.value);
               }else {
                  CHP_balance.value = CHP_balance.value - effect.amount;
               }
               insert_history_table(effect,"red")
            }
            if (effect.type === 'account_credited') {
               if (effect.asset_type === "native") {
                  balance.value = parseFloat(balance.value) + parseFloat(effect.amount);
                  bal_disp.textContent = fix7dec(balance.value);
               }else {
                  CHP_balance.value = CHP_balance.value + effect.amount;
               }
               insert_history_table(effect,"green")
            }
            if (effect.type === 'account_created') {
               balance.value = parseFloat(effect.starting_balance);
               bal_disp.textContent = fix7dec(effect.starting_balance);
               insert_history_table(effect,"red")
            }
          };

      function insert_history_table(effect,red_green){
        console.log("insert_history_table");
        console.log(effect);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var font_color;
        var amount = parseFloat(effect.amount);
        if (red_green == "red"){
          font_color = red;
          amount = amount * -1;
        } else {
          font_color = green;
        }
        
        if (effect.asset_type === "native") {
          ar[4] = font_color + bal_disp.textContent + "</font>";
          ar[2] = font_color + "XLM" + "</font>";
        } else {
          ar[4] = font_color + "not_suported" + "</font>";
          ar[2] = font_color + effect.asset_code + "</font>";
        }
        ar[0] = font_color + destination.value + " ??</font>";
        ar[5] = font_color + memo.value + "</font>";
        ar[6] = font_color + (new Date()).toUTCString() + "</font>";
        ar[1] = font_color + effect.type + "</font>";
        //ar[2] = font_color + effect.asset_code + "</font>";
        ar[3] = font_color + amount + "</font>";  
        insRow(ar,"table"); 
        
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
       
      function get_account_info(account,callback) {
        console.log("account: " + account);
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
          //console.log("account_obj");
          //console.log(account_obj);
          var bal = get_native_balance(account_obj);
          //console.log("bal: " + bal);
          bal_disp.textContent = bal;
          balance.value = bal;
          if (bal > 0) {  
            get_transactions_desc(account_obj);
            display_asset_table(account_obj);
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
        makeCode();
      }
      
     

      function update_balances() {
        if (server_mode === "mss_server"){
          console.log("update_balances mss mode");
          get_balance_updates_mss();
          return
        }           
        get_account_info(account.value,update_balances_set); 
        if (destination.value.length == 56){
          get_account_info(destination.value,update_balances_set); 
        }          
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
          if (dest_balance.value == 0){
            alert("destination account not active, can only send native");
            return;
          }
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
        socket.send(action + account.value + '", "issuer":"' + tissuer.value + '", "asset":"' + asset_type.value + tail);
        socket.send(action + destination.value + '", "issuer":"' + issuer.value + '", "asset":"' +asset.value + tail);
      }
    }
     
      function sign_b64_tx(b64_tx,signer_key){
        var tx = new StellarSdk.Transaction(b64_tx);
        tx.sign(signer_key);
        return tx.toEnvelope().toXDR().toString("base64");
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
             }).catch(function(e) {
               //console.log("submitTransaction error");
               //console.log(e);
               //console.log(e.extras.result_codes.operations[0]);               
               tx_status.textContent = "Transaction error: " + e.extras.result_codes.operations[0]; 
             }); 
           }          
          })
          .then(function (transactionResult) {
            console.log("tx_result");
            if (typeof transactionResult == "undefined") {
              console.log("tx res undefined");
              tx_status.textContent = "Transaction error?  result undefined";              
              return
            }
            console.log(transactionResult);
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

      function addTrustlineOperation(asset_type, address) {
                 //asset_type examples "USD", "CHP"
                 asset = new StellarSdk.Asset(asset_type, address);
                 return StellarSdk.Operation.changeTrust({asset: asset}); 
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
        close.disabled = true;
        open.disabled = false;
        message.textContent = "";
        socket.close();
      });

      change_network.addEventListener("click", function(event) {
        change_network_func();
        save_default_settings();
      }); 
     
      function change_network_func() {
        clear_table("table");
        clear_table("table_asset");
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
          update_balances();
          start_effects_stream();
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
          update_balances();
          start_effects_stream();
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
          update_balances();
          start_effects_stream();
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
          update_balances();
          start_effects_stream();
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
          update_balances();
          start_effects_stream();
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
          message.textContent = "Sorry, your browser does not support Web Storage...";
        }     
      }

      save.addEventListener("click", function(event) {         
        if (typeof(Storage) !== "undefined") {
          var encrypted = CryptoJS.AES.encrypt(seed.value, pass_phrase.value);       
          // Store
          localStorage.setItem(seed_nick.value, encrypted);
          //seed.value = "seed saved to local storage"
          save.disabled = true;
          update_seed_select(); 
          update_key();
          update_balances();       
        }else {
          seed.value = "Sorry, your browser does not support Web Storage...";
        }
      });

                 
      delete_key.addEventListener("click", function(event) {
        // delete key_id from LocalStorage 
        console.log("deleting key "+ seed_nick.value);              
        localStorage.removeItem(seed_nick.value);
        update_seed_select()
        alert("seed_nick: " + seed_nick.value + " deleted from LocalStorage");   
        //display_localstorage_keylist();        
      });

      restore.addEventListener("click", function(event) {
        seed.value = restore_seed(seed_nick.value, pass_phrase.value);
        update_seed_select();
        update_key();
        start_effects_stream();
        update_balances();
      });

      

      function display_localstorage_keylist() {
        save.disabled = false;
        var result = "";
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
          //console.log(  localStorage.key( i ) );
          result = result + localStorage.key( i ) + ", ";
        }
        message.textContent = result;
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
          seed.value = "Sorry, your browser does not support Web Storage...";
        }        
      }

       function restore_default_settings(){
        var def_settings_json = localStorage.getItem("def_settings");
        console.log("restore_default_settings");
        console.log(def_settings_json);
        if (def_settings_json == null) {
          console.log("type null, restore nothing");
          network.value ="testnet";
          change_network_func();
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

              function clear_table(id) {
                var table = document.getElementById(id);
                for(var i = table.rows.length - 1; i > 0; i--)
                {
                  table.deleteRow(i);
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
function get_transactions_desc(bal) {
  console.log("start get_transactions_desc");
  console.log(bal);
  var es = server.transactions()
    .forAccount(account.value)    
    .order("desc")
    .limit(40)
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
            amount = amount * -1;
            page.records[i].amount = amount;
          } 
          if (page.records[i].type == "payment") {
            //console.log("payment");
            if (bal.create_detected == true) {                             
              if (page.records[i].asset_code == "XLM") {
                //console.log("asset is XLM");     
                //native_bal = native_bal + amount - 0.0001;
                bal.native = fix7dec(native_bal);                                                                    
                page.records[i].bal = clone(bal);                
                page.records[i].trans_asset_bal = native_bal;
                native_bal = native_bal - amount + 0.0001;                
              } else {
                //console.log("asset not XLM");
                var asset_not_found = true;
                var blen = bal.balances.length;
                for (var a = 0; a < blen; a++) {                  
                  if (bal.balances[a]["asset_code"] == page.records[i].asset_code && bal.balances[a]["asset_issuer"] == page.records[i].asset_issuer){                                                                                                                               
                    page.records[i].bal = clone(bal);
                    bal.balances[a]["balance"] =  parseFloat(bal.balances[a]["balance"]) - amount;
                    //page.records[i].trans_asset_bal = parseFloat(bal.balances[a]["balance"]) - amount;
                    native_bal = native_bal + 0.0001;   
                    asset_not_found = false;
                  }
                }
                if (asset_not_found) {
                  //console.log("asset_not_found add new: " + page.records[i].asset_code);                                 
                  bal.balances[blen] = {};
                  bal.balances[blen]["asset_code"] = page.records[i].asset_code;
                  bal.balances[blen]["asset_issuer"] = page.records[i].asset_issuer;
                  bal.balances[blen]["balance"] = amount;                  
                  page.records[i].bal = clone(bal);
                  //page.records[i].trans_asset_bal = page.records[i].bal.balances["balance"];
                  //console.log(page.records[i].bal);
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
              bal.native = fix7dec(native_bal);
              page.records[i].bal = clone(bal); 
              page.records[i].amount = (parseFloat(page.records[i].startingBalance)) * -1;
              native_bal = native_bal + parseFloat(page.records[i].startingBalance) + 0.0001;
            }        
          }
          // all transaction still pay .0001 Lumens so account for that here
          if (page.records[i].type != "payment" && page.records[i].type != "createAccount"){
            //console.log("trans not pay or create");
            bal.native = fix7dec(native_bal);
            page.records[i].bal = clone(bal);
            //console.log(page.records[i].type);
            page.records[i].amount = -0.0001;
            native_bal =  native_bal + 0.0001;                        
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
    insRow(ar,"table"); 
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
    };

   //triger the event of readSingleFile when file-input browse button is clicked and a file selected
     //this event reads the data from a local disk file and restores it's contents to the LocalStorage
     // the file selected is assumed to be in seed_save_recover backup format.
     document.getElementById('file-input').addEventListener('change', readSingleFile, false);

      select_seed.onchange=function(){ //run some code when "onchange" event fires
        var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
        if (chosenoption.value!="nothing"){
          console.log("selected value: " + chosenoption.value);
          restore_seed_option(chosenoption.value);
          update_balances();
        }
      }
          

      gen_random_dest.addEventListener("click", function(event) {
        console.log("gen_random");         
        var new_keypair = StellarSdk.Keypair.random();
        destination.value = new_keypair.accountId();
        dest_seed.value = new_keypair.seed();
        update_balances();
        amount.value = 20.1;
        issuer.value = "";
        asset.value = "native";
        console.log("new_account:");
        console.log(new_account.checked);
        new_account.checked=true;
        //save_seed("seed1", "", seed.value );
        save_seed("seed2", "", dest_seed.value )
      });
            
      send_payment.addEventListener("click", function(event) {
        console.log("send_payment clicked");                      
        sendPaymentTransaction();       
      });

      add_trustline.addEventListener("click", function(event) { 
        asset_type.value = tasset.value;         
        var operation = addTrustlineOperation(tasset.value, tissuer.value);
        createTransaction(key,operation);
      });

      set_inflation_dest.addEventListener("click", function(event) { 
        update_key();
        var opts = {};
        opts.inflationDest = inflation_dest.value;
        var operation = StellarSdk.Operation.setOptions(opts);
        createTransaction(key,operation);
      });

      add_signer.addEventListener("click", function(event) {
        console.log("click add_signer");
        addSignerTransaction();
        update_balances();
      });

      change_threshold.addEventListener("click", function(event) {
        console.log("click change_threshold");
        setOptionsTransaction();
        update_balances();
      });

 
      swap_seed_dest.addEventListener("click", function(event) { 
        var seed_swap = seed.value;
        var accountId_swap = account.value
        seed.value = dest_seed.value;
        dest_seed.value = seed_swap;
        account.value = destination.value;
        destination.value = accountId_swap;         
        update_key();
        if (dest_seed.value.length == 56) {
          var temp_key = StellarSdk.Keypair.fromSeed(dest_seed.value);
          destination.value = temp_key.accountId();
        }
        start_effects_stream();
        update_balances();
        if (seed.value.length == 56){
          save_seed("seed1", "", seed.value);
        }
        if (dest_seed.value.length == 56){
          save_seed("seed2", "", dest_seed.value);
        }
        sign_tx.disabled = false;
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
        update_key();
        var b64 = sign_b64_tx(envelope_b64.value,key);
        console.log("signer accountId: " + key.accountId());
        console.log("b64: " + b64);
        envelope_b64.value = b64;
        sign_tx.disabled = true;
      });


      send_tx.addEventListener("click", function(event) {
        if (server_mode == "mss_server") {
          console.log("send_tx mss_server mode");
          submitTransaction_mss_b64(envelope_b64.value);
        } else {
          console.log("send_tx horizon mode");
          console.log(envelope_b64.value);
          submitTransaction_horizon_b64(envelope_b64.value);
        }
      });

      email_funds.addEventListener("click", function(event) {
        // this will generate a transaction to send funds to
        // the destination accountID and seed will be included in the email of the body
        // it will then generate a transaction and add it as a link to the wallet in the body of the email
        // we will later make the transaction expire if demand exists
        email_flag = true;
        sendPaymentTransaction();
        sign_tx.disabled = false;
      });

      email_tx.addEventListener("click", function(event) {
        email_funds_now("email_tx");
      });

      fed_lookup.addEventListener("click", function(event) {
        console.log("destination.value.length: " + destination.value.length);
        if (destination.value.length == 56) {
          reverse_federation_lookup();
        } else {
          federation_lookup();
        }
      });

  });

