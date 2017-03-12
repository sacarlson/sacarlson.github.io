// Copyright (c) 2016 Scott Carlson sacarlson_2000@yahoo.com

"use strict";
   
     var key;
     var server;
     var transaction;

    // Initialize everything when the window finishes loading
    window.addEventListener("load", function(event) {
      //StellarSdk.Network.useTestNetwork();
      var network_testnet = document.getElementById("network_testnet");
      //var message = document.getElementById("message");
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
      var merge_all_assets = document.getElementById("merge_all_assets");
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
      var selling_price_R = document.getElementById("selling_price_R");
      var asset_pair_span = document.getElementById("asset_pair_span");
      var selling_amount = document.getElementById("selling_amount");
      var default_asset_code = document.getElementById("default_asset_code");
      var default_issuer = document.getElementById("default_issuer");
      var auto_trust = document.getElementById("auto_trust");
      var paths_destination_addressID = document.getElementById("paths_destination_addressID");
      var paths_destination_asset = document.getElementById("paths_destination_asset");
      var paths_destination_asset_issuer = document.getElementById("paths_destination_asset_issuer");
      var paths_destination_amount = document.getElementById("paths_destination_amount");
      var orderbook_buy_asset = document.getElementById("orderbook_buy_asset");
      var orderbook_buy_issuer = document.getElementById("orderbook_buy_issuer");
      var orderbook_sell_asset = document.getElementById("orderbook_sell_asset");
      var orderbook_sell_issuer = document.getElementById("orderbook_sell_issuer");
      var better_bid_ask = document.getElementById("better_bid_ask");
      var lock_account = document.getElementById("lock_account");
      var signer = document.getElementById("signer");
      var weight = document.getElementById("weight");
      var master_weight = document.getElementById("master_weight");
      var threshold = document.getElementById("threshold");
      var home_domain = document.getElementById("home_domain");
      var sound_src = document.getElementById("sound_src");
      var auto_allow_trust = document.getElementById("auto_allow_trust");
      var dec_round = document.getElementById("dec_round");
      var force_enable_change_key = document.getElementById("force_enable_change_key");
      var qr_export_mode = document.getElementById("qr_export_mode");
      var qr_export_mode_span = document.getElementById("qr_export_mode_span");
      var add_signer_type = document.getElementById("add_signer_type");
      var signer_type = document.getElementById("signer_type");
      var signer_key = document.getElementById("signer_key");
      var secret_key = document.getElementById("secret_key");
      var secret_key_hex = document.getElementById("secret_key_hex");
      var passphrase = document.getElementById("passphrase");      
      var public_key_coded = document.getElementById("public_key_coded");
      var lab_signer_span = document.getElementById("lab_signer_span");
      var lab_env_viewer_span = document.getElementById("lab_env_viewer_span");
      var my_signer_span = document.getElementById("my_signer_span");
      var my_wallet_signer_url = document.getElementById("my_wallet_signer_url");
      var lab_signer_url = document.getElementById("lab_signer_url");
      var regen_keypair = document.getElementById("regen_keypair");
      var multisig_url = document.getElementById("multisig_url");
      var send_tx_status = document.getElementById("send_tx_status");

      var asset_obj = new StellarSdk.Asset.native();
      var socket;
      var socket_open_flag = false;
      var operation_globle;
      var paymentsEventSource;
      //var server;
      //var key;
      var email_flag = false;
      //var transaction;
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
      home_domain.value = "funtracker.site";
      //sound_src.value = "sound/coin-drop-3.mp3";
      var reset_defaults = false;
      memo_mode.value  = "memo.text";
      memo.value = "";
      //secret_key.textContent = "test 1 2 3";

      auto_trust.value = 1;      

      //console.log("enable_effecthandler = true");

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
      //reset_horizon_server(); 
      seed.value = restore_seed("seed1", "");
      signer_key.value = seed.value;
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
      reset_horizon_server(); 

      console.log("seed.value: " + seed.value);     
      console.log("seed.value.length: " + seed.value.length);
            
      //key = StellarSdk.Keypair.fromSecret(seed.value);
      if (seed.value.length != 56) {
        key = StellarSdk.Keypair.random();
        //console.log("key ok");
        account.value = key.publicKey();
        account_tx.address = account.value;
        //console.log("account ok");
        seed.value = key.secret();
        signer_key.value = seed.value;
        //console.log("seed ok");
        save_seed("seed1", "", seed.value );
      } else {
         //account.value = StellarSdk.Keypair.fromSeed(seed.value).publicKey();
         account.value = StellarSdk.Keypair.fromSecret(seed.value).publicKey();
         account_tx.address = account.value;
         key = StellarSdk.Keypair.fromSecret(seed.value);
         update_key();
      }
      //seed.value = 'SA3CKS64WFRWU7FX2AV6J6TR4D7IRWT7BLADYFWOSJGQ4E5NX7RLDAEQ'; 
      //account.value = 'GAMCHGO4ECUREZPKVUCQZ3NRBZMK6ESEQVHPRZ36JLUZNEH56TMKQXEB'
   
      //asset.value = "native";
      asset.value = clone(default_asset_code.value);
      if (default_asset_code.value != "native"){
        tasset.value = default_asset_code.value;
      } else {
        tasset.value = "";
      }
      issuer.value = clone(default_issuer.value);
      tissuer.value = clone(default_issuer.value);
      //tlimit.value = "";

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
        console.log(json_param);
        json_param = unescape(json_param[1]);
        console.log("post unescape:");
        console.log(json_param);
        var params = JSON.parse(json_param);
        console.log(params);
        console.log(params["accountID"]);
        //console.log(params["env_b64"]);
        if (typeof params["tx_tag"] != "undefined") {
          console.log("tx_tag detected");
          console.log(params["tx_tag"]);
          console.log("url_callback");
          console.log(params["callback"]);
          if (typeof params["ver"] != "undefined") {
            if (params["ver"] == "2.0") {
              get_remote_tx_v2(params["callback"],params["tx_tag"]);
            } else {
              console.log("nothing yet");
            }
          } else {
            get_remote_tx(params["callback"],params["tx_tag"]);
            multisig_url.value = params["callback"];
          }
        }
        if (typeof params["accountID"] != "undefined") {
          account.value = params["accountID"];
          account_tx.address = account.value;
        }
        if (typeof params["env_b64"] != "undefined") {
          console.log("env_b64 param detected");
          //envelope_b64.value = params["env_b64"];
          fill_envelope_b64(params["env_b64"]);
          account.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].destination;
          account_tx.address = account.value;
          console.log(new StellarSdk.Transaction(envelope_b64.value).operations[0].asset);
          tissuer.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].asset.issuer;
          tasset.value = new StellarSdk.Transaction(envelope_b64.value).operations[0].asset.code;
          //asset_type.value = tasset.value;
        }               
        if (typeof params["seed"] != "undefined") {
          seed.value = params["seed"];
          signer_key.value = seed.value;
          account.value = StellarSdk.Keypair.fromSecret(seed.value).publicKey();
          account_tx.address = account.value;
          key = StellarSdk.Keypair.fromSecret(seed.value);
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

        if (typeof params["selling_asset_code"] != "undefined") {
          selling_asset_code.value = params["selling_asset_code"];
          to_trade_page();
        }

        if (typeof params["selling_asset_issuer"] != "undefined") {
          selling_asset_issuer.value = params["selling_asset_issuer"];
        } 
        if (typeof params["selling_amount"] != "undefined") {
          selling_amount.value = params["selling_amount"];
        }

        if (typeof params["selling_price"] != "undefined") {
          selling_price.value = params["selling_price"];
        } 

        if (typeof params["buying_asset_code"] != "undefined") {
          buying_asset_code.value = params["buying_asset_code"];
          to_trade_page();
        }  

        if (typeof params["buying_asset_issuer"] != "undefined") {
          buying_asset_issuer.value = params["buying_asset_issuer"];
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
        //console.log(encrypted_seed[1]);
        seed.value = encrypted_seed[1];
        update_key();      
      }    
      if (accountID != null) {
        //console.log("here?");
       // console.log(accountID[1]);
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
        issuer.value = 'GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU';
        tissuer.value = clone(issuer.value);
        tasset.value = 'FUNT';
      }
      
      if (typeof destination.value == "undefined"){
        dest_seed.value = restore_seed("seed2", "");
        console.log("dest_seed.value: " + dest_seed.value);
        if (dest_seed.value.length != 0) {
          destination.value = StellarSdk.Keypair.fromSecret(dest_seed.value).publicKey();
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
      //var table_sort_orderbook = new Tablesort(document.getElementById('table_orderbook'));
      var table_sort_orderbook_ask = new Tablesort(document.getElementById('table_orderbook_ask'));
      var table_sort_orderbook_bid = new Tablesort(document.getElementById('table_orderbook_bid'));

     // var xmlhttp = new XMLHttpRequest();

      account_disp.textContent = account.value;
      account_disp2.textContent = account.value;
      makeCode();

      // preload alarm sound
      var alarm = new Audio();
      alarm.autoplay = false;
      //alarm.src = navigator.userAgent.match(/Firefox/) ? 'shutter.ogg' : 'shutter.mp3';
      alarm.src = sound_src.value;
      //alarm.play();     
        
      // lets try to start 50 sec timer as the horizon connect time out seems to be set at 60 sec
      //  temp disable myTimer to see if it's really needed anymore with sdk 0.6.1
      //var myVar = setInterval(myTimer, (Math.round(50 * 1000)));

      function myTimer() { 
        console.log("timer click detected, do an attachToPaymentsStream('now'); to prevent time out");
        attachToPaymentsStream('now');
        get_offers();
      }

      function fill_envelope_b64(b64_tx_env){
        console.log("fill_envelope");
        console.log(b64_tx_env);
        envelope_b64.value = b64_tx_env;
        //var my_signer = gen_my_wallet_signer_link(b64_tx_env)
        //var lab_signer = gen_lab_env_signer_link(b64_tx_env);
        //var lab_env_viewer = gen_lab_env_viewer_link(b64_tx_env);
        lab_env_viewer_span.innerHTML = '<a href="' + gen_lab_env_viewer_link(b64_tx_env) + '" target="_blank">View Transaction Details </a>';
        lab_signer_span.innerHTML = '<a href="' + gen_lab_env_signer_link(b64_tx_env) + '" target="_blank">Send Tx to Stellar lab to sign</a>';
        my_signer_span.innerHTML = '<a href="' + gen_my_wallet_signer_link(b64_tx_env) + '" target="_blank">Send Tx to remote my_wallet to sign</a>';
      }

    function gen_my_wallet_signer_link(b64_tx_env){
      // example output to my_signer_link
      //"https://wallet.funtracker.site/?json=%7B%22env_b64%22:%22AAAAAACiljUs+IgW9r0pX8M/tQAOZ0ZvSfYAvdaqe43XQcJ9AAAAZAAJZF4AAAAkAAAAAAAAAAAAAAABAAAAAAAAAAMAAAABVVNEAAAAAACJmyhA7VY2xW3cXxSyOXX3nxuiOI0mlOTFbs3dyWDl7wAAAAAAAAAAAJiWgAAAAgkAAAABAAAAAAAAAAAAAAAAAAAAAA==%22%7D"app.js:51788:3
      var signer_url = my_wallet_signer_url.value;
      var pre_env = '/?json=%7B%22env_b64%22:%22';
      var post_env = '%22%7D';
      var signer_link =  signer_url + pre_env + b64_tx_env + post_env;
      console.log("my_signer_link");
      console.log(signer_link);
      return signer_link;
    }

  function check_net_type(){
    var pub = "Public Global Stellar Network ; September 2015"
    var tes = "Test SDF Network ; September 2015"
    if (net_passphrase.value == pub){
      return "live";
    } else if (net_passphrase.value == tes){
      return "test";
    } else {
      return "unknown";
    }
  }

  function gen_lab_env_signer_link(b64_tx_env){
    // example output to lab_viewer_link.  b64_tx_env is a base64 encoded string of tx envelope
    //https://www.stellar.org/laboratory/#txsigner?xdr=AAAAAACiljUs%2BIgW9r0pX8M%2FtQAOZ0ZvSfYAvdaqe43XQcJ9AAAAZAAJZF4AAAAHAAAAAAAAAAAAAAABAAAAAAAAAAMAAAABVVNEAAAAAACJmyhA7VY2xW3cXxSyOXX3nxuiOI0mlOTFbs3dyWDl7wAAAAAAAAAAAJiWgAAAAgkAAAABAAAAAAAAAAAAAAAAAAAAAA%3D%3D&network=test
    var signer_url = lab_signer_url.value;
    var pre_env = "/#txsigner?xdr=";
    var post_env = "&network=" + check_net_type();
    var b64_post_encode = b64_tx_env.replace(/\=/g,"%3D");
    b64_post_encode = b64_post_encode.replace(/\//g,"%2F");
    b64_post_encode = b64_post_encode.replace(/\+/g,"%2B");    
    var signer_link = signer_url + pre_env + b64_post_encode + post_env;
    console.log("lab_env_signer_link");
    console.log(signer_link);
    return signer_link;
  }

  function gen_lab_env_viewer_link(b64_tx_env){
    // "https://www.stellar.org/laboratory/#xdr-viewer?input=AAAAAACiljUs%2BIgW9r0pX8M%2FtQAOZ0ZvSfYAvdaqe43XQcJ9AAAAZAAJZF4AAAAkAAAAAAAAAAAAAAABAAAAAAAAAAMAAAABVVNEAAAAAACJmyhA7VY2xW3cXxSyOXX3nxuiOI0mlOTFbs3dyWDl7wAAAAAAAAAAAJiWgAAAAgkAAAABAAAAAAAAAAAAAAAAAAAAAA%3D%3D&type=TransactionEnvelope&network=test"
    var viewer_url = lab_signer_url.value;
    var pre_env = "/#xdr-viewer?input=";
    var post_env = "&type=TransactionEnvelope&network=" + check_net_type();
    var b64_post_encode = b64_tx_env.replace(/\=/g,"%3D");
    b64_post_encode = b64_post_encode.replace(/\//g,"%2F");
    b64_post_encode = b64_post_encode.replace(/\+/g,"%2B");        
    var lab_viewer_link = viewer_url + pre_env + b64_post_encode + post_env;
    console.log("lab_env_viewer_link");
    console.log(lab_viewer_link);
    return lab_viewer_link;
  }

      function to_trade_page() {
        document.getElementById('top_ul').getElementsByTagName('li')[0].className = "";
        document.getElementById('top_ul').getElementsByTagName('li')[5].className = "active";
        document.getElementById('send').className = "tab-pane fade";
        document.getElementById('trade').className = "active";
        document.getElementById('trade_ul').getElementsByTagName('li')[0].className = "";
        document.getElementById('trade_ul').getElementsByTagName('li')[2].className = "";
        document.getElementById('trade_ul').getElementsByTagName('li')[4].className = "active";
        document.getElementById('trade_history').className = "tab-pane fade";
        document.getElementById('view_orderbook').className = "tab-pane fade";
        document.getElementById('create_offer').className = "active";
      }

      function play_alarm_sound() {
        console.log("play_alarm_sound");
        if (sound_src.value.length > 5){
          console.log("play_alarm_sound activated");
          alarm.play();
        }else{
          console.log("sound_src set to disable");
        }
      }

      function setup_xml(callback) {
       var xmlhttp_ = new XMLHttpRequest();
       xmlhttp_.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
           //var data = JSON.parse(this.responseText);
           callback(this.responseText);
         }
       };
       return xmlhttp_
     }

     function obj2parms(obj){
       var str = "";
       for (var key in obj) {
         if (str != "") {
           str += "&";
         }
         str += key + "=" + encodeURIComponent(obj[key]);
       }
       return str;
     }


     function get_remote_tx(xml_url,txTag){
       // version 1.0
       console.log("started get_remote_tx");
       console.log("xml_url");
       var client = setup_xml(xml_response_get_remote_tx)
       client.open("GET", xml_url + '/gettx/' + txTag, true); 
       client.send();
     }

     function get_remote_tx_v2(xml_url,txTag){
       // version 2.0
       console.log("started get_remote_tx");
       console.log("xml_url");
       var client = setup_xml(xml_response_get_remote_tx)
       client.open("GET", xml_url + 'tx_tag=' + txTag, true); 
       client.send();
     }


     var remote_txData;

     function xml_response_get_remote_tx(data){
        console.log("xml_response get_remote_tx: ");
//Object { destination: "GDUPQLNDVSUKJ4XKQQDITC7RFYCJTROCR6A…", amount: "204.9900", asset: "USD", issuer: "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCG…", memo: "32" }
        console.log(data);
        data = decodeURI(data);
        remote_txData = JSON.parse(data);
        console.log(remote_txData);       
        amount.value = remote_txData.amount;
        destination.value = remote_txData.destination;
        asset.value = remote_txData.asset;
        issuer.value = remote_txData.issuer;
        memo.value = remote_txData.memo;
        //envelope_b64.value = d.content.tx.tx_xdr;
        console.log(remote_txData.content.tx.tx_xdr);
        fill_envelope_b64(remote_txData.content.tx.tx_xdr); 
     }

     function sign_remote_tx(xml_url, txData) {
       //txData starts as an obj with {tx_id:2,signer:GCEZ.., tx_xdr:AAAAA..}
       //tx_id=2&signer=GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ&tx_xdr=AAAAAICnn2od%2FfNM3E6rGaCdB4zdpwodRz7bT1CKLlf0ll%2FhAAAAZAALDIQAAAACAAAAAAAAAAAAAAABAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAA9mdW50cmFja2VyLnNpdGUAAAAAAAAAAAAAAAAG9JZf4QAAAECvNZh6LLcq41BoGoqPMj7aB7KAL6vpxDS4Ljwb43Kh2KCj52V58WMUxRcbGzpLGeyFiZmVGSxEhgE6rf1IbmoLyWDl7wAAAEB4TAuUAgkpjGX6g9zBCeSY9HsTmkJVloFpFvQ0qA5EAmbGmipy69O%2FFUQinvjaHIu3P6WQC5SND%2Bs3QXXFCm0KyWDl7wAAAEB4TAuUAgkpjGX6g9zBCeSY9HsTmkJVloFpFvQ0qA5EAmbGmipy69O%2FFUQinvjaHIu3P6WQC5SND%2Bs3QXXFCm0KyWDl7wAAAEB4TAuUAgkpjGX6g9zBCeSY9HsTmkJVloFpFvQ0qA5EAmbGmipy69O%2FFUQinvjaHIu3P6WQC5SND%2Bs3QXXFCm0KyWDl7wAAAEB4TAuUAgkpjGX6g9zBCeSY9HsTmkJVloFpFvQ0qA5EAmbGmipy69O%2FFUQinvjaHIu3P6WQC5SND%2Bs3QXXFCm0KyWDl7wAAAEB4TAuUAgkpjGX6g9zBCeSY9HsTmkJVloFpFvQ0qA5EAmbGmipy69O%2FFUQinvjaHIu3P6WQC5SND%2Bs3QXXFCm0K 
       console.log("sign_remote_tx txData:");
       console.log(obj2parms(txData));     
       var client = setup_xml(xml_response_sign_remote);
       client.open("POST", xml_url+'/signtx/', true); 
       client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       client.send(obj2parms(txData));
     }

     function xml_response_sign_remote(data) {
        console.log("xml_response sign_remote: ");
        console.log(data);
        console.log(typeof data);
        var result = JSON.parse(data);
        send_tx_status.textContent = result.content.message;      
     }


      function add_trusted_issuer(accountId){
         // this will add all trustlines of all assets that are seen in this issuers stellar.toml file
         //add_trusted_issuer('GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU');
         server.accounts()
             .accountId(accountId).call()
             .then(function (accountInfo) {
               var xmlurl;
               console.log("accountInfo: ");
               console.log(accountInfo);
               //account_obj_global = accountInfo;
               if (accountInfo.home_domain.length > 0){
                 xmlurl = "https://www." + accountInfo.home_domain + "/.well-known/stellar.toml";
                 var xmlhttp = setup_xml(xml_response_add_trust);
                 xmlhttp.open("GET", xmlurl, true);
                 xmlhttp.send();
               }else {
                 console.log("accountInfo.home_domain.length == 0 so can't add trust");
               }
             });                            
      }

      function xml_response_add_trust(data) {
        console.log("xml_response: ");
        console.log(data);
        var obj = toml.parse(data);
        console.log("toml.parse : ");
        console.log(obj);
        console.log(obj.CURRENCIES);
        if (obj.CURRENCIES.length >0){
          console.log("now account_obj_global: ");
          console.log(account_obj_global);
          add_trust_array(obj.CURRENCIES,tlimit.value);
        }else{
          console.log("no assets to add to trust found");
        }
      }

      function add_trust_array2(array_trustlines,limit){
        // example array_trustlines:
        // [{code:"USD",issuer:"GBUY..."},{code:"THB",issuer:"GBUY..."}]
        var array_opps = [];
        for (var i = 0; i < array_trustlines.length; i++) {
          if (check_trust_exists2(array_trustlines[i]["code"], array_trustlines[i]["issuer"] , Number(auto_trust.value) ,account_obj_global.balances) == false){
            console.log("trustline : " + array_trustlines[i] + " doen't exist so we will create it now");
            array_opps[i] = addTrustlineOperation(array_trustlines[i]["code"], array_trustlines[i]["issuer"], limit);
          }
        }
        console.log("array_opps");
        console.log(array_opps);
        if (array_opps.length > 0){
          createTransaction_array(array_opps);
        }
     }

     function add_trust_array(array_trustlines,limit){
        // adds array_trustlines to present active account
        // example array_trustlines:
        // [{code:"USD",issuer:"GBUY..."},{code:"THB",issuer:"GBUY..."}]        
        var array_opps = add_trust_array_get_opps(array_trustlines,limit,account_obj_global.balances,1)
        if (array_opps.length > 0){
          createTransaction_array(array_opps);
        }
     }

     function add_trust_to_merge(callback){
       console.log("add_trust_to_merge");
       var array_opps = add_trust_array_get_opps(account_obj_global.balances,"",chain_store["account_info"].balances,2);
       console.log("array_opps");
       console.log(array_opps);
       if (array_opps.length > 0){
          console.log("call create_tx");
          //create_tx_opp_array(array_opps,callback);
          var merge_keypair = StellarSdk.Keypair.fromSecret(merge_dest_key.value);
          createTransaction_array_for_keypair(array_opps,merge_keypair,callback);
        }else{
          console.log("array_opps.length zero, all needed trustlines present, nothing done");
          callback();
        }      
     }

     function remove_all_trustlines(callback){
       // remove all trustlines from active account, note all trustlines must have zero balance before running this
       console.log("start remove_all_trustlines");
       var array_opps = [];
       for (var i = 0; i < account_obj_global.balances.length; i++) {
         if (account_obj_global.balances[i]["asset_type"] != "native"){
           array_opps[i] = addTrustlineOperation(account_obj_global.balances[i]["asset_code"], account_obj_global.balances[i]["asset_issuer"], "0"); 
         }
       }
       if (array_opps.length > 0){
         console.log("trustlines detected will remove with array_opps");
         create_tx_opp_array(array_opps,callback);
       }else{
         console.log("no trustlines detected, nothing done");
         callback();
       }
     }

     

     function add_trust_array_get_opps(array_trustlines,limit,dest_balances,mode){
        // mode = 2 if array_trustlines is in format from server.acounts(), mode 1 is used for data from stellar.toml file
        // dest_balances are an array list of assets from destination account
        // example format mode 1 array_trustlines to be added to destination account:
        // [{code:"USD",issuer:"GBUY..."},{code:"THB",issuer:"GBUY..."}]
        var array_opps = [];
        for (var i = 0; i < array_trustlines.length; i++) {
          if (mode == 2){
            array_trustlines[i]["code"] = array_trustlines[i]["asset_code"];
            array_trustlines[i]["issuer"] = array_trustlines[i]["asset_issuer"];
          }
          if (check_trust_exists2(array_trustlines[i]["code"], array_trustlines[i]["issuer"] , Number(auto_trust.value) ,dest_balances) == false){
            console.log("trustline : " + array_trustlines[i] + " doen't exist so we will add opp to add: " + array_trustlines[i]["code"]);
            array_opps[i] = addTrustlineOperation(array_trustlines[i]["code"], array_trustlines[i]["issuer"], limit);                       
          }
        }
        console.log("array_opps");
        console.log(array_opps);        
        return array_opps;        
     }

     function move_all_assets(callback){
        // move all non native assets from active account to merge_dest.value account
        console.log("start move_all_assets");
        var to_account_local = merge_dest.value;
        console.log("to_account: " + to_account_local);
        var opp_array = [];
        var asset_obj;
        for (var i = 0; i < account_obj_global.balances.length; i++) {
          if (account_obj_global.balances[i]["asset_type"] != "native"){
             asset_obj = new StellarSdk.Asset(account_obj_global.balances[i]["asset_code"], account_obj_global.balances[i]["asset_issuer"]);
             opp_array[i] = StellarSdk.Operation.payment({
               destination: to_account_local,
               amount: fix7dec(account_obj_global.balances[i]["balance"]),
               asset: asset_obj
             });
          }
        }
        console.log("opp_array: ");
        console.log(opp_array);
        create_tx_opp_array(opp_array,callback);
     }

     function merge_native(callback){
       // merger all native assets from active account to merge_dest.value account
       var opp = accountMergeOperation();
       create_tx(opp,callback);
     }

     function update_bal_callback(callback){
        bal_disp.textContent = 0;
        clear_all_tables();         
        server.accounts()
          .accountId(account.value)          
          .call()
          .then(function (accountResult) {           
            update_balances_set(accountResult);
            enable_change_key();
            callback();                    
          })
          .catch(function (err) {
            console.log("got error in get_account_info");
            enable_change_key();
            console.error(err);           
            callback();          
          })
     }

     var chain_store = {};
     //chain_store["account_info"] = "";
     function merge_all_assets_Tx(){      
       console.log("start merge_all_assets_Tx");
       // setup chain of callback functions       
       var cc = new ccbuild.CallChain();
       cc.add(get_merge_account_info);
       //cc.add(check_result);
       cc.add(create_account_if_zero);
       cc.add(get_merge_account_info);
       cc.add(add_trust_to_merge);
       cc.add(move_all_assets);
       cc.add(remove_all_trustlines);
       cc.add(merge_native);
       cc.add(update_bal_callback);
       cc.add(noop);
       cc.execute();
     }
     
     function check_result(callback){
       console.log("check_result chain_store:");
       console.log(chain_store);
       callback();
     }

     function create_account_if_zero(callback){
       // create or add to account in merge_dest_key.value if no native balance seen in chain_store["accountInfo"].balances"]
       // with start native balance for what is needed to hold present active account
       console.log("start create_acccount_if_zero");
       var clone_keypair = StellarSdk.Keypair.fromSecret(merge_dest_key.value);
       var start_bal = ((account_obj_global.balances.length - 1) * 10) + 20.001;
       console.log(chain_store);
       if (chain_store["account_info"] == 404) {
         console.log("no account present so create one");         
         console.log("start_bal needed is: " + start_bal);         
         var opp = StellarSdk.Operation.createAccount({
                   destination: clone_keypair.publicKey(),
                   startingBalance: fix7dec(start_bal)
                 });
         create_tx(opp,callback);
       }else{
         console.log("account already exist, check to see if has native balance needed");
         var nativebal_merge = find_bal(chain_store["account_info"].balances,"native");
         var native_bal_active = find_bal(account_obj_global.balances,"native");
         console.log("nativebal: " + nativebal_merge);
         var send = start_bal - nativebal_merge ;
         var asset_obj = new StellarSdk.Asset.native();
         if ( send > 0 ) {
           console.log("need to send native: " + send);
           var opp = StellarSdk.Operation.payment({
               destination: clone_keypair.publicKey(),
               amount: fix7dec(send),
               asset: asset_obj
             });
           create_tx(opp,callback);
         }else{
           console.log("merge account exists and holds needed amount of native, nothing need be done");
           callback();
         }
       }
     }

     function create_tx(opp,callback){
       console.log("create_tx");
       var opp_array = [];
       opp_array[0] = opp;
       createTransaction_array_for_keypair(opp_array,key,callback);
     }

     function create_tx_opp_array(opp_array,callback){
       console.log("start create_tx_opp_array");
       createTransaction_array_for_keypair(opp_array,key,callback);
     }

    

     function find_bal(balances,asset_code){
       // return balance for asset code in balances array that is returned from horizon
       // use XLM or native if looking for native balance
       var bal = 0;
       for (var i = 0; i < balances.length; i++) {
         if (asset_code == "XLM" || asset_code == "native"){
           if (balances[i].asset_type == "native"){
             bal = balances[i].balance;
             break;
           }else{
             if (balances[i].asset_code == asset_code) {
               bal = balances[i].balance;
               break;
             }
           }
         }
       }
       return bal;
     }
     

     function noop(callback){
       // performs almost no action to signal end callback chain without error (no callback done)
       console.log("started noop");       
     }
     
     function get_merge_account_info(callback){
        // return 0 on error, if exists put results in chain_store
        var clone_keypair = StellarSdk.Keypair.fromSecret(merge_dest_key.value);
        server.accounts()
             .accountId(clone_keypair.publicKey())
             .call()
             .then(function (accountInfo) {
               console.log("accountInfo.balances: ");
               console.log(accountInfo.balances);
               console.log("acount_obj_global.balances");
               console.log(account_obj_global.balances);
               chain_store["account_info"] = accountInfo;
               callback();
             })
             .catch(function(err) {
               console.log("account info fetch error: " );
               console.log(err);
               console.log(err.data.status);
               chain_store["account_info"] = 0;
               if (err.data.status == 404){
                 chain_store["account_info"] = 404;
               };               
               callback();
             });
         console.log("exit get_merge_accoun_info");          
     }

     var ccbuild = ccbuild || {};
     ccbuild.CallChain = function () {
       var cs = [];
       this.add = function (call) {
         cs.push(call);
       };
       this.execute = function () {
         var wrap = function (call, callback) {
            return function () {
                call(callback);
            };
         };
         for (var i = cs.length-1; i > -1; i--) {
            cs[i] = 
                wrap(
                    cs[i], 
                    i < cs.length - 1 
                        ? cs[i + 1] 
                        : null);
         }
         cs[0]();
       };
     };


     function check_trust_exists2(asset_code, issuer, max_count, balances){
           //example check_trust_exists("FUNT","GBYX...",3, balances);
           // will return true if asset_code already exists or if max_count number of trustlines already exist
           // this allows setting max_count = 0 to disable adding trustlines
           // balances is an array of all currencies assets presently held on this account being checked
           // balances = [{asset_code:"USD",issuer:"GBUYU..."},{asset_code:"THB",issuer:"GBUYU..."}]
           console.log("trustlines count: " + balances.length);
           if (balances.length >= max_count){
              console.log("return true due to balances.length >= max_count value: " + max_count);
              return true;
           }
           console.log("asset_code: " + asset_code);
           console.log("issuer: " + issuer);
           console.log("balances");
           console.log(balances);
           for (var i = 0; i < balances.length; i++) {
             if (balances[i].asset_code == asset_code || balances[i].code == asset_code){
               if (balances[i].issuer == issuer || balances[i].asset_issuer == issuer ){
                 return true;
               }
             }
           }
           return false;
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
       if (qr_export_mode.value == "Centaurus") {
         qrcode.makeCode(export_to_centaurus());
         qr_export_mode_span.textContent = "Centaurus";
       }else{
         qrcode.makeCode(seed.value);
         qr_export_mode_span.textContent = "Raw";
       }
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
             //console.log("start sendto: " + send_fed_to);
             var index_at = stellar_address.indexOf("@");
             var index_ast = stellar_address.indexOf("*");
             var fed_rev;
             //console.log("index_at: " + index_at);
             //console.log("index_ast: " + index_ast);
             console.log("stellar_address length: " + stellar_address.length);
             if (stellar_address.length != 56){
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
                  paths_destination_addressID.value = destination.value;
               } else {
                  console.log("pre set issuer: " + stellar_address);
               }
             } else {
                console.log("address length == 56, pre set issuer: " + stellar_address);
                console.log("reverse_federation_lookup: ");
                reverse_federation_lookup(stellar_address); 
                return;
             }

             forward_federation_lookup(stellar_address);
             
          }

          function forward_federation_lookup(stellar_address){
            StellarSdk.FederationServer.resolve(stellar_address)
            //StellarSdk.FederationServer.resolveAddress(stellar_address) no such function
            .then(function(federationRecord) {
               //destination.value = federationRecord.account_id;
               console.log("federationRecord: ");
               console.log(federationRecord);
               //console.log("federation_lookup results" + federationRecord.account_id);
               console.log("send_fed_to: " + send_fed_to);
               send_fed_destination(federationRecord.account_id);
               if (typeof federationRecord.memo != "undefined"){
                 memo.value = federationRecord.memo;
                 if (federationRecord.memo_type == "id"){
                   memo_mode.value = "memo.id";
                 } else if (federationRecord.memo_type == "hash"){
                   memo_mode.value = "memo.hash";
                 }else{
                   memo_mode.value = "memo.text";                
                 }
               }
            })
            .catch(function(err) {
               console.log("forward_federation_lookup error: " + err);
            });
          }
        

          function reverse_federation_lookup(accountId) {
            console.log("rev accountId: ");
            console.log(accountId);
            server.accounts()
             .accountId(accountId).call()
             .then(function (accountInfo) {
               console.log("accountInfo: ");
               console.log(accountInfo);
               if (accountInfo.home_domain) {
                 return StellarSdk.FederationServer.createForDomain(accountInfo.home_domain)
                 .then(function (federationServer) {
                   return federationServer.resolveAccountId(accountId);
                 });
               } else {
                 console.log("reverse_federation_lookup failed");
                 return "bad reverse lookup";
               }
            })
            .then(function (res) {
              console.log("reverse fed lookup: ");
              console.log(res.stellar_address);
              send_fed_destination(res.stellar_address);
            });
          }

         
          function send_fed_destination(fed_record){
            console.log("federation_lookup results" + fed_record);
            console.log("send_fed_to: " + send_fed_to);
            if (send_fed_to == "dest") {
               console.log("set dest");
               destination.value = clone(fed_record);
               paths_destination_addressID.value = destination.value;
            } else if (send_fed_to == "signer") {
               console.log("set signer");
               signer.value = fed_record;
            } else if (send_fed_to == "inflation_dest") {
               console.log("set inflation_dest");
               inflation_dest.value = fed_record;
            } else if (send_fed_to == "tissuer") {
               console.log("set tissuer");
               tissuer.value = clone(fed_record);
               issuer.value = clone(fed_record);
            } else if (send_fed_to == "issuer") {
               console.log("set issuer");
               issuer.value = clone(fed_record);
            } else if (send_fed_to == "selling_asset_issuer") {
               console.log("set selling_asset_issuer");
               selling_asset_issuer.value = fed_record;
            } else if (send_fed_to == "buying_asset_issuer") {
               console.log("set buying_asset_issuer");
               buying_asset_issuer.value = fed_record;
            } else if (send_fed_to == "merge_dest") {
               console.log("set merge_dest");
               merge_dest.value = fed_record;
            } else {
               console.log("bad fed destination");
            }
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
                //console.log("post balance_splice: effectResults");
                //console.log(effectResults);
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
           // not sure we need two of these, why not just use check_trust_exists2(), only takes out issuer on this one
           //example check_trust_exists("FUNT",2, displayEffect);
           // will return true if asset_code already exists or if max_count number of trustlines already exist
           // this allows setting max_count = 0 to disable adding trustlines
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
            console.log("effectHandler fromStream: " + fromStream);
            disable_change_key();
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
              play_alarm_sound();
              enable_change_key();
            } else {
              insertEffect(effect, fromStream)
                .then(function (displayEffect) {
                    //console.log("displayEffect: ");
                    //console.log(displayEffect);
                    if (fromStream) {
                        console.log("effect fromStream");
                        //applyToBalance(effect);
                        //$rootScope.$broadcast('accountInfoLoaded');                       
                    }
                    else {
                        enable_change_key();
                        //if (displayEffect.ef_type == "trade"){
                        if (displayEffect.type == "manage_offer"){
                          insert_trade_table(displayEffect);
                        }else {
                          insert_history_table(displayEffect)
                        }
                        console.log("effect_fromstream_flag: " + effect_fromstream_flag);
                        if (effect_fromstream_flag){
                          //console.log("displayEffect");
                          //console.log(displayEffect);
                          //console.log("params.trustlines");
                          //console.log(params.trustlines);
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
                            //console.log("array_opps");
                            //console.log(array_opps);
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
         }

    


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
                //details_op: op,
                //details_trx: trx,
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
        console.log("insert_history_table");
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
        //console.log(effect);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var white = '<font color="white">';
        var black = '<font color="black">';
        var font_color = black;
        ar[0] =  font_color + effect.details.offer_id + " </font>";
        //if (effect.sender == account.value){
        //  ar[1] = font_color + effect.receiver + " </font>";
        //} else {
        //  ar[1] = font_color + effect.sender + " </font>";
        //}
        if (effect.details.bought_asset_type == "native"){
          effect.details.bought_asset_code = "XLM";
          effect.details.bought_asset_issuer = "";
        }
        if (effect.details.sold_asset_type == "native"){
          effect.details.sold_asset_code = "XLM";
          effect.details.sold_asset_issuer = "";
        }
        ar[1] = font_color + effect.details.sold_asset_code + "</font>";
        ar[2] = font_color + effect.details.sold_asset_issuer + "</font>";
        ar[3] = font_color + deci_round(effect.details.sold_amount) + "</font>";
        ar[4] = font_color + effect.details.bought_asset_code + "</font>"; 
        ar[5] = font_color + effect.details.bought_asset_issuer + "</font>";
        ar[6] = font_color + deci_round(effect.details.bought_amount) + "</font>"; 
        ar[7] = font_color + effect.creationDate.toISOString() + "</font>";             
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
        ar[2] = font_color + deci_round(records_obj.destination_amount) + "</font>";
        ar[3] = font_color + records_obj.path[0].asset_code + "</font>"; 
        ar[4] = font_color + records_obj.path[0].asset_issuer + "</font>";  
        ar[5] = font_color + records_obj.source_asset_code + "</font>";
        ar[6] = font_color + records_obj.source_asset_issuer + "</font>";
        ar[7] = font_color + deci_round(records_obj.source_amount) + "</font>";                      
        insRow(ar,"table_paths");        
      } 
            
            //<th data-sort-method='number' >Price</th>
            //<th data-sort-method='number' >Price R</th>
            //<th data-sort-method='number' >Amount (qty ask/bid)</th>      

      function insert_orderbook_table_bid(records_obj){        
        //console.log("insert_orderbook_table");
        //console.log(records_obj);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var font_color = green;
        var price_r = Number(records_obj.price_r.d) / Number(records_obj.price_r.n);
        //console.log ("records_obj.price.d");
        //console.log(records_obj.price_r.d);
        //console.log("records_obj.price_r.n");
        //console.log(records_obj.price_r.n);        
        //ar[0] = font_color + deci_round(records_obj.price) + " </font>";      
        //ar[1] = font_color + deci_round(price_r) + "</font>";         
        //ar[2] = font_color + deci_round(records_obj.amount * records_obj.price) + "</font>"; 
     
        ar[0] = font_color + deci_round(price_r) + "</font>";         
        ar[1] = font_color + deci_round(records_obj.amount * records_obj.price) + "</font>";  
        ar[2] = font_color + deci_round(price_r * records_obj.amount * records_obj.price) + "</font>";                      
        insRow(ar,"table_orderbook_bid");        
      }  

      function insert_orderbook_table_ask(records_obj){        
        //console.log("insert_orderbook_table");
        //console.log(records_obj);
        var ar = [];
        var red = '<font color="red">';
        var green = '<font color="green">';
        var font_color = green;
        var price_r = Number(records_obj.price_r.d) / Number(records_obj.price_r.n);
        //console.log ("records_obj.price.d");
        //console.log(records_obj.price_r.d);
        //console.log("records_obj.price_r.n");
        //console.log(records_obj.price_r.n);        
        //ar[0] = font_color + deci_round(records_obj.price) + " </font>";      
        //ar[1] = font_color + deci_round(price_r) + "</font>";         
        //ar[2] = font_color + deci_round(records_obj.amount) + "</font>";
 
        //ar[0] = font_color + deci_round(records_obj.price) + " </font>";      
        ar[0] = font_color + deci_round(price_r) + "</font>";         
        ar[1] = font_color + deci_round(records_obj.amount) + "</font>";
        ar[2] = font_color + deci_round(price_r * records_obj.amount) + "</font>";                             
        insRow(ar,"table_orderbook_ask");        
      }

      function deci_round(num){
         return Number(num).toFixed(dec_round.value)
      }  

      function reset_horizon_server2() {
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

       function reset_horizon_server() {
        console.log("reset_horizon_server"); 
        //console.log("secure: " + secure.value);
        var tf = true;
        var protocol;
        if (secure.value == "false") { 
          tf = false;
        } else {
          protocol = "https"
        }  
        server = new StellarSdk.Server({     
          hostname: url.value,
          port: Number(port.value),
          protocol: protocol,
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
        console.log("get_account_info account: " + account);
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
        //message.textContent = JSON.stringify(param);
      }

       

      function update_balances_set(account_obj) {
        console.log("update_balances_set");
        clear_all_tables();
        get_offers();  
        if (account_obj.account_id == account.value){
          //console.log("account_obj");
          //console.log(account_obj);
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
        //console.log("get_native_balance");
        //console.log(account_obj);
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
          enable_change_key();
          return -1;
        }
      }

                      
      function update_key() {
        if (seed.value.length == 56) {
          key = StellarSdk.Keypair.fromSecret(seed.value);
          account.value = key.publicKey();          
        }else if (account.value.length == 56){
          console.log("update_key has no secret, creating key fromPublicKey");
          //key =  StellarSdk.Keypair.fromAccountId(account.value);
          key = StellarSdk.Keypair.fromPublicKey(account.value);
        }
        account_disp.textContent = account.value;
        account_disp2.textContent = account.value;
        account_tx.address = account.value;
        tx_status.textContent = "keypair updated";
        makeCode();
      }
      
     

      function update_balances() {       
        resetAccount();
        disable_change_key();
        enable_effecthandler = false;
        //clear_all_tables();
        //console.log("enable_effecthandler = false");
        if (server_mode === "mss_server"){
          console.log("update_balances mss mode");
          get_balance_updates_mss();
          return
        } 
        bal_disp.textContent = 0;
        //update_balances();
        //get_offers();           
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
        //var key = StellarSdk.Keypair.fromSecret(seed.value);
        if (asset.value == "native" || asset.value == "XLM") {
          //issuer.value = "";
          console.log("asset: native (XLM)");
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
          //message.textContent = "started payment: ";
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
          //key = StellarSdk.Keypair.fromSecret(seed.value);
          console.log(key.publicKey());
          var operation = accountMergeOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }      

      function setOptionsTransaction() {
          console.log("setOptionsTransaction");        
          //key = StellarSdk.Keypair.fromSecret(seed.value);
          console.log("key.accountId: ");
          console.log(key.publicKey());
          var operation = setOptionsOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }

     function manageOfferTransaction() {
          console.log("manageOfferTransaction");        
          //key = StellarSdk.Keypair.fromSecret(seed.value);
          console.log(key.publicKey());
          var operation = manageOfferOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }

     function cancelOfferTransaction_ID(offer_id){
       cancel_offer_flag = true;
       offerid.value = offer_id;
       try {
          manageOfferTransaction();
          cancel_offer_flag = false;
        } catch(err) {
          cancel_offer_flag = false;
          console.log("manageOfferTransaction error catch: " + err);
          alert("manageOfferTransaction error: "+ err);
        }   
     }

     function addSignerTransaction() {
          console.log("addSignerTransaction");        
          //key = StellarSdk.Keypair.fromSecret(seed.value);
          console.log(key.publicKey());
          var operation = addSignerOperation();
          console.log("operation created ok");
          createTransaction(key,operation);
        }

      function allowTrustTransaction(trustor,assetCode,authorize) {
          console.log("allowTrustTransaction");        
          //key = StellarSdk.Keypair.fromSecret(seed.value);
          console.log(key.publicKey());
          var operation = allowTrustOperation(trustor,assetCode,authorize)
          console.log("operation created ok");
          createTransaction(key,operation);
        }
      

     function submitTransaction_mss(transaction) {
       console.log("start submitTransaction_mss");
       var b64 = transaction.toEnvelope().toXDR().toString("base64");
       //envelope_b64.value = b64;
       fill_envelope_b64(b64);
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
       tx_status.textContent = "tx submited";
       var transaction = new StellarSdk.Transaction(b64_string);
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
          })
          .then(function (transactionResult) {
            console.log("tx_result");
            console.log(transactionResult);
            if (typeof transactionResult == "undefined") {
              console.log("tx res undefined");
              //tx_status.textContent = "tx res undefined";
            }            
          })
          .catch(function (err) {
            console.log(err);
            tx_status.textContent = "Transaction Error: " + err; 
          });
     }

     function get_seq(address) {
       var action = '{"action":"get_sequence", "account":"' + address + '"}'
       socket.send(action);
     }

     function createTransaction_mss_submit(operation,seq_num) {
       update_key();
       var account = new StellarSdk.Account(key.publicKey(), seq_num);
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
       get_seq(key.publicKey());
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
         update_key();
         createTransaction_array_for_keypair(array_of_operations,key,"no_op");        
       }

      function createTransaction_array_for_keypair(array_of_operations,keypair,post_callback) {
         console.log("start createTransaction_array_for_keypair");
         console.log("account: " + keypair.publicKey());
         if (array_of_operations.length == 0){
           console.log("operations array length is zero, nothing to do so return");
           return;
         }
         tx_status.textContent = "Processing";
         server.loadAccount(keypair.publicKey())
          .then(function (account) {
             transaction = new StellarSdk.TransactionBuilder(account)            
             array_of_operations.forEach(function (item) {
               transaction.addOperation(item);
             });
             transaction = transaction.build();
             transaction.sign(keypair); 
             console.log("horizon mode sending tx");                               
             server.submitTransaction(transaction).then(function(result) {              
               tx_status.textContent = "Completed OK";
               if (post_callback != "no_op"){
                 post_callback("");
               }
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
        update_key();
        tx_status.textContent = "Processing";        
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
        } else if (memo_mode.value == "memo.hash") {
          var memo_tr = StellarSdk.Memo.hash(memo.value);
        } else {
          console.log("manual memo.text");
          var memo_tr = StellarSdk.Memo.text(memo.value);
        }
        //attachToPaymentsStream('now');
        server.loadAccount(key.publicKey())
          .then(function (account) {
             //console.log("memo_tr typeof");
             //console.log(typeof memo_tr);
             transaction = new StellarSdk.TransactionBuilder(account,{fee:100, memo: memo_tr})            
            .addOperation(operation)                      
            .build();
            var key_has_secret = true;
            try { 
              key.secret();
            } catch(err){
              console.log("key had no secret: " + err);
              key_has_secret = false
              sign_tx.disabled = true;
            }
            if (key_has_secret){
              transaction.sign(key);
            }
           if ( email_flag != true && key_has_secret ) { 
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
            //envelope_b64.value = transaction.toEnvelope().toXDR().toString("base64");
            fill_envelope_b64(transaction.toEnvelope().toXDR().toString("base64"));
            try { 
              key.secret();
            } catch(err){
              tx_status.textContent = "tx created but not sent (no secret)";
            }
            
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
                 console.log("destination: " + destination.value);
                 console.log("amount: " + amount.value);               
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
                 console.log("start addSignerOperation");
                 console.log(signer.value);
                 console.log(Number(weight.value));
                 var opts = {};
                 opts.signer = {};
                 opts.signer[add_signer_type.value] = signer.value;
                 opts.signer.weight = Number(weight.value);
                 return StellarSdk.Operation.setOptions(opts);                 
               }

      function addTrustlineOperation(asset_type2, address, limit) {
                 //asset_type examples "USD", "CHP"
                 console.log("addTrustlineOperation");
                 //console.log(asset_type2);
                 //console.log(address);
                 //console.log(limit);
                 var asset3 = new StellarSdk.Asset(asset_type2, address);
                 if (limit.length == 0){
                   return StellarSdk.Operation.changeTrust({asset: asset3});
                 } else {
                   return StellarSdk.Operation.changeTrust({asset: asset3,limit: limit}); 
                 }
               }

      function allowTrustOperation(trustor,assetCode,authorize) {
              // trustor accountID of client you want to allowTrust
              // assetCode to allowTrust on
              // authorize set to true to unlock account,
              //   and false to lock account from any activity on this assetCode
              console.log("allowTrust trustor: " + trustor + " asset: " + assetCode + " auth: " + authorize);
              return StellarSdk.Operation.allowTrust({
                trustor: trustor,
                assetCode: assetCode,
                authorize: authorize
              });
            }

      function setOptionsOperation() {
                 console.log(Number(master_weight.value));
                 console.log(Number(threshold.value));
                 console.log("home_domain.value: ");
                 console.log(home_domain.value);
                 console.log("home_domain.value.length");
                 console.log(home_domain.value.length);
                 var opts = {};
                 //opts.inflationDest = "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7";
                 //opts.clearFlags = 1;
                 //opts.setFlags = 1;
                 var low;
                 var med;
                 if (Number(threshold.value) < 2){
                   low = 0;
                   med = 0;
                 } else {
                   med = Number(threshold.value) - 1;
                   low = 0;
                 }
                 console.log("high threshold: " + Number(threshold.value));
                 console.log("med threshold: " + med );
                 console.log("low threshold: " + low);
                 console.log("master weight: " + Number(master_weight.value));

                 opts.masterWeight = Number(master_weight.value);
                 opts.lowThreshold = low;
                 opts.medThreshold = med;
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
            selling_price_R.textContent = fix7dec(1.0 / selling_price.value);
            console.log("selling_price_R: " + selling_price_R.textContent);
            console.log("selling_price: " + fix7dec(selling_price.value));
            
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
            //opts.price = selling_price.textContent;
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
          //message.textContent = "Server Says: " + event.data;
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
          //message.textContent = "Error: " + event;
          console.log("socket error: " + event);
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
        console.log("start change_network_func");
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
          //message.textContent = "Sorry, your browser does not support Web Storage...";
          alert("Sorry, your browser does not support Web Storage...");
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
          if (pass_phrase.value.length == 0){
            save_seed("seed1", "", seed.value);
            signer_key.value = seed.value;
          }
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
        if (def_settings_json == null || reset_defaults) {
          // default setting for a users first time run on this browser          
          console.log("type null, restore nothing");
          default_asset_code.value = "XLM";
          default_issuer.value = "GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU";
          buying_asset_issuer.value = default_issuer.value;
          selling_asset_issuer.value = default_issuer.value;          
          network.value ="testnet_default";
          top_image_url.value = "logo.png";
          top_page_title.value = "Funtracker.site Wallet";
          sound_src.value = "sound/coin-drop-3.mp3";
          background_img.value = "";
          background_color.value = "#888";
          text_color.value = "#000";
          auto_trust.value = "6";
          change_network_func();
          set_default_colors();
          auto_allow_trust.checked = false;
          dec_round.value = 4;
          force_enable_change_key.value = "false";
          my_wallet_signer_url.value = "https://wallet.funtracker.site"; 
          lab_signer_url.value = "https://www.stellar.org/laboratory";
          save_default_settings();

          reset_defaults = false;         
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
        if (typeof obj.version != "undefined" && obj.version > 1.0 && reset_defaults != true){
          sound_src.value = obj.sound_src;
          default_asset_code.value = obj.default_asset_code;
          default_issuer.value = obj.default_issuer;
          buying_asset_issuer.value = default_issuer.value;
          selling_asset_issuer.value = default_issuer.value;
          auto_trust.value = obj.auto_trust;
          auto_allow_trust.checked = false;
          dec_round.value = obj.dec_round;
          force_enable_change_key.value = obj.force_enable_change_key;
          qr_export_mode.value = obj.qr_export_mode;
          my_wallet_signer_url.value = obj.my_wallet_signer_url; 
          lab_signer_url.value = obj.lab_signer_url;
        } else {
          sound_src.value = "sound/coin-drop-3.mp3";
          default_asset_code.value = "XLM";
          tasset.value = default_asset_code.value;
          default_issuer.value = "GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU";
          buying_asset_issuer.value = default_issuer.value;
          selling_asset_issuer.value = default_issuer.value;
          top_image_url.value = "logo.png";
          top_page_title.value = "Funtracker.site Wallet";
          background_img.value = "";
          auto_trust.value = "6";
          auto_allow_trust.checked = false;
          dec_round.value = 4;
          force_enable_change_key.value = "false"; 
          qr_export_mode.value = "Raw";
          my_wallet_signer_url.value = "https://wallet.funtracker.site"; 
          lab_signer_url.value = "https://www.stellar.org/laboratory";    
          save_default_settings(); 
        }       
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
        obj.sound_src = sound_src.value;
        obj.dec_round = dec_round.value;
        obj.force_enable_change_key = force_enable_change_key.value;
        obj.qr_export_mode = qr_export_mode.value;
        obj.my_wallet_signer_url = my_wallet_signer_url.value; 
        obj.lab_signer_url = lab_signer_url.value;
        obj.version = 1.01;    
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
       //message.textContent = result;
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
    console.log("id: " + id);
    var col_count = document.getElementById(id).rows[0].cells.length;
    console.log("col_count: " + col_count);        
    var myTable = document.getElementById(id);
    var rowCount = myTable.rows.length;
    console.log("rowCount: " + rowCount);
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
    ar[3] = font_color + deci_round(page[i].amount) + "</font>";  
    if (page[i].asset_code == "XLM" || page[i].asset_code == "native") {
      ar[4] =  font_color + deci_round(page[i].bal.native) + "</font>";
    } else {
      ar[4] = font_color + deci_round(find_asset_balance(page[i].bal.balances,page[i].asset_code,"")) + "</font>";
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
       //console.log(account_obj.balances);
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
         ar[2] = deci_round(account_obj.balances[i].balance);
         if (typeof account_obj.balances[i].limit !== "undefined"){
           ar[3] = Number(account_obj.balances[i].limit).toFixed(0);
         } else {
           ar[3] = account_obj.balances[i].limit;
         }  
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
	    address : key.publicKey(),
	    //secret : key.seed()
        secret : key.secret()
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
           //ar[2] = offer_obj.records[i].selling.asset_issuer.substring(0, 5)+"...";
           ar[2] = offer_obj.records[i].selling.asset_issuer;  
         }                
         ar[3] = deci_round(offer_obj.records[i].amount);
         ar[4] = deci_round(offer_obj.records[i].price); 
         //ar[5] = deci_round(offer_obj.records[i].price); 
         ar[5] = deci_round(offer_obj.records[i].price * offer_obj.records[i].amount);           
         if (offer_obj.records[i].buying.asset_type == "native") {
           ar[6] = "XLM";
           ar[7] = "";
         } else {     
           ar[6] = offer_obj.records[i].buying.asset_code;
           //ar[7] = offer_obj.records[i].buying.asset_issuer.substring(0, 5)+"...";
           ar[7] = offer_obj.records[i].buying.asset_issuer;
         }
         ar[8] = '<img src="../images/delete.png" onclick="confirm_delete_offer(this)" /> ';
         //console.log("ar[7]: " );
         //console.log(ar[7]);
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
 
    //var best_bid = 0;
    //var best_ask  = 9999999999;
    var best_bid = 9999999999;
    var best_ask  = 0;

    function check_orderbook() {
      console.log("check_orderbook");
      clear_table("table_orderbook_ask");
      clear_table("table_orderbook_bid");
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
      asset_pair_span.textContent = orderbook_sell_asset.value +"/"+ orderbook_buy_asset.value;
      server.orderbook(buy_asset,sell_asset)
     //.trades()
     .call()
     .then(function(result) {
        console.log("check_orderbook results");
        console.log(result);
        var price_r;
        // I'm not really sure why but it seems return from stellar sdk has ask and bid reversed
        // in any case this seems to work for me this way at least at the moment, I may later look back at this as stupid    
        for (var i = 0; i < result.asks.length; i++) {         
          price_r = Number(result.asks[i].price_r.d)/Number(result.asks[i].price_r.n);            
          if (best_bid > price_r ){
             best_bid = price_r; 
          }  
          insert_orderbook_table_bid(result.asks[i])
        }

        for (var i = 0; i < result.bids.length; i++) {                 
          if (best_ask < Number(1.0 / result.bids[i].price)){
               best_ask = Number(1.0 / result.bids[i].price);
          }
          insert_orderbook_table_ask(result.bids[i])
        }
        console.log("best_bid: " + best_bid);
        console.log("best_ask: " + best_ask);  
      })
     .catch(function(err) { console.log(err); });
    }

    function better_bid_ask_function(bid_ask) {
// orderbook_buy_asset, orderbook_buy_issuer, orderbook_sell_asset, orderbook_sell_issuer
//selling_asset_code.value, selling_asset_issuer.value, buying_asset_code.value, buying_asset_issuer.value, selling_amount.value, selling_price.value      
      console.log("sell asset code:");
      console.log(orderbook_sell_asset.value);

      if (bid_ask == "bid"){
        //selling_price.textContent = fix7dec(1.0 / (best_bid + (best_bid * (Number(better_bid_ask.value)/100))));
        //selling_price_R.value = fix7dec((best_bid + (best_bid * (Number(better_bid_ask.value)/100))));
        console.log("best_bid: " + best_bid);
        selling_price.value = fix7dec(1.0 / (best_bid + (best_bid * (Number(better_bid_ask.value)/100))));
        selling_price_R.textContent = fix7dec((best_bid + (best_bid * (Number(better_bid_ask.value)/100))));
        console.log("selling_price: " + selling_price.value);
        console.log("selling_price_R: " + selling_price_R.textContent);
        selling_asset_code.value = orderbook_buy_asset.value;      
        selling_asset_issuer.value = orderbook_buy_issuer.value;
        buying_asset_code.value = orderbook_sell_asset.value;
        buying_asset_issuer.value = orderbook_sell_issuer.value;
      } else {
        console.log("best_ask " + best_ask);
        selling_price.value = fix7dec((best_ask + (best_ask * (Number(better_bid_ask.value)/100))));
        selling_price_R.textContent = fix7dec(1.0 / (best_ask + (best_ask * (Number(better_bid_ask.value)/100))));
        console.log("selling_price: " + selling_price.value);
        console.log("selling_price_R: " + selling_price_R.textContent);
        selling_asset_code.value = orderbook_sell_asset.value;      
        selling_asset_issuer.value = orderbook_sell_issuer.value;
        buying_asset_code.value = orderbook_buy_asset.value;
        buying_asset_issuer.value = orderbook_buy_issuer.value;
      }
      //location.href = "#create_offer";
    }

    function disable_change_key(){
      console.log("start disable_change_key");
      if (force_enable_change_key.value == "true"){
        console.log("force_enable_change_key set true, will disable disable_change_key()");
        enable_change_key();
        return
      }
      swap_seed_dest.disabled = true;
      select_seed.disabled = true; 
      restore.disabled = true;
      change_network.disabled = true;
    }

    function enable_change_key(){
      console.log("start enable_change_key");
      swap_seed_dest.disabled = false;
      select_seed.disabled = false;
      restore.disabled = false;
      change_network.disabled = false; 
    }
    
function bin2hex (s) {
  // From: http://phpjs.org/functions
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Linuxworld
  // +   improved by: ntoniazzi (http://phpjs.org/functions/bin2hex:361#comment_177616)
  // *     example 1: bin2hex('Kev');
  // *     returns 1: '4b6576'
  // *     example 2: bin2hex(String.fromCharCode(0x00));
  // *     returns 2: '00'

  var i, l, o = "", n;

  s += "";

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16)
    o += n.length < 2 ? "0" + n : n;
  }

  return o;
}

  function toHexString(arr) {
    console.log("tohexstring");
    var s = '';
    var e = '';
    for (var i = 0; i < arr.length; i++) {
      e = arr[i].toString(16);
      if (e.length == 1){
        e = "0" + e;
      }
      s += e;
    };
    return s
  }

   //triger the event of readSingleFile when file-input browse button is clicked and a file selected
     //this event reads the data from a local disk file and restores it's contents to the LocalStorage
     // the file selected is assumed to be in seed_save_recover backup format.
     document.getElementById('file-input').addEventListener('change', readSingleFile, false);

     

     lock_account.onchange=function(){
       console.log("change in lock_account detected");
       tissuer.value = clone(destination.value);
     }

     
      select_seed.onchange=function(){ //run some code when "onchange" event fires
        var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
        if (chosenoption.value!="nothing"){
          console.log("selected value: " + chosenoption.value);
          restore_seed_option(chosenoption.value);
          sign_tx.disabled = false;
        }
      }

      send_tx_multisig.addEventListener("click", function(event) {
         console.log("send_tx_multisig click detected");
         var tx_sign_obj = {};
         tx_sign_obj.tx_id = remote_txData.content.tx.id;
         tx_sign_obj.signer = key.publicKey();
         tx_sign_obj.tx_xdr = envelope_b64.value;
         console.log(tx_sign_obj);
         sign_remote_tx(multisig_url.value, tx_sign_obj);
      });

      gen_random.addEventListener("click", function(event) {
        console.log("gen_random");
        var keypair = StellarSdk.Keypair.random();
        fill_key_info(keypair); 
      });

      function fill_key_info(keypair){
        console.log("fill_key_info");
        var unencodedBuffer = keypair.rawPublicKey();
        var unencodedBuffer_secret = keypair.rawSecretKey();
        var unencoded_publickey = unencodedBuffer.toString();
        var seed = keypair._secretSeed;
        var publickey = keypair._publicKey;
        var publickey_hex = toHexString(unencodedBuffer);
        key = keypair;
        sign_tx.disabled = false;
        signer_key.value = keypair.secret();
        seed.value = keypair.secret();
        secret_key.textContent = keypair.secret();
        console.log("keypair");
        console.log(keypair);
        console.log(publickey.length);
        console.log(unencoded_publickey.length);
        console.log("unencodedBuffer");
        console.log(unencodedBuffer);
        console.log("unecnoded_publickey");
        console.log(unencoded_publickey);
        console.log("seed hex");
        console.log(bin2hex(seed));
        
        console.log("unencoded_publickey hex");
        console.log(bin2hex(unencoded_publickey));
        console.log("add_signer_type.value");
        console.log(add_signer_type.value);
        secret_key_hex.textContent = bin2hex(seed);
        var encoded_key;
        if (add_signer_type.value == "preAuthTx"){
          encoded_key = StellarSdk.StrKey.encodePreAuthTx(seed);
          encoded_publickey = StellarSdk.StrKey.encodePreAuthTx(unencodedBuffer);
          console.log("preauthtx_key");
          console.log(encoded_key);
          signer.value = publickey_hex;
          public_key_coded.textContent = encoded_publickey;     
        }        
        if (add_signer_type.value == "sha256Hash"){
          encoded_key = StellarSdk.StrKey.encodeSha256Hash(seed);
          var encoded_publickey = StellarSdk.StrKey.encodeSha256Hash(unencodedBuffer);
          console.log("encoded_publickey");
          console.log(encoded_publickey);
          console.log("hashx_key");
          console.log(encoded_key);
          public_key_coded.textContent = encoded_publickey;
          signer.value = publickey_hex;
        }
        if (add_signer_type.value == "ed25519PublicKey"){
          encoded_key = StellarSdk.StrKey.encodeEd25519SecretSeed(seed);
          console.log("ed25519secret_key");
          console.log(encoded_key);
          signer.value = keypair.publicKey();
          signer_key.value = encoded_key;          
        }
      }

      gen_passphrase_key.addEventListener("click", function(event) {
        var seed = StellarSdk.hash(passphrase.value);
        console.log("seed.length");
        console.log(seed.length);
        var keypair = StellarSdk.Keypair.fromRawSeed(seed);
        fill_key_info(keypair);       
      });

      better_ask_button.addEventListener("click", function(event) {
        //check_orderbook("ask");
        better_bid_ask_function("ask");
        to_trade_page();
      });

      better_bid_button.addEventListener("click", function(event) {
        //check_orderbook("ask");
        better_bid_ask_function("bid");
        to_trade_page();
      });
              

      check_orderbook_button.addEventListener("click", function(event) {
        check_orderbook();
      });

      update_offers_button.addEventListener("click", function(event) {
        clear_table("table_offers");
        get_offers();
      });

      check_paths.addEventListener("click", function(event) {
        check_paths_function();
      });   

      gen_random_dest.addEventListener("click", function(event) {
        console.log("gen_random");         
        var new_keypair = StellarSdk.Keypair.random();
        destination.value = new_keypair.publicKey();
        paths_destination_addressID.value = destination.value;
        dest_seed.value = new_keypair.secret();
        //update_balances();
        amount.value = 20.1;
        //issuer.value = "";
        memo.value = "";
        memo_mode.value = "memo.text";
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
          //asset.value = tasset.value; 
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

      add_all_trustlines.addEventListener("click", function(event) {
        try { 
          add_trusted_issuer(tissuer.value)
        } catch(err){
          alert("add_all_trustlines failed error: " + err);
        }
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
        } catch(err){
          alert("add_signer error: " + err);
        }
      });

      allowTrust.addEventListener("click", function(event) {
        console.log("click allowTrust");
        try {
          var authorize;
          if (lock_account.checked){
            authorize = false;
          } else {
            authorize = true;
          }
          //console.log("issuer: " + tissuer.value + " asset: " + tasset.value + " tf: " + authorize);
          allowTrustTransaction(tissuer.value,tasset.value,authorize);
        } catch(err){
          alert("allowTrust error: " + err);
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
        //swap_seed_dest.disabled = true; 
        var seed_swap = seed.value;
        var accountId_swap = account.value
        seed.value = dest_seed.value;
        signer_key.value = seed.value;
        dest_seed.value = seed_swap;
        account.value = destination.value;
        account_tx.address = account.value;
        destination.value = accountId_swap;
        paths_destination_addressID.value = destination.value;         
        update_key();        
        if (dest_seed.value.length == 56) {
          //var temp_key = StellarSdk.Keypair.fromSecret(dest_seed.value);
          var temp_key = StellarSdk.Keypair.fromSecret(dest_seed.value);
          destination.value = temp_key.publicKey();
          paths_destination_addressID.value = destination.value;
          merge_dest_key.value = dest_seed.value;
          merge_dest.value = destination.value;
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
          signer_key.value = seed.value;
        } else {
          alert("bad pass phrase for decrypt_seed");
        }
      });

      encrypt_seed.addEventListener("click", function(event) {
        seed.value = CryptoJS.AES.encrypt(seed.value, pass_phrase.value);
        signer_key.value = "";  
      });

      sign_tx.addEventListener("click", function(event) {
        try {
          if (signer_key.value.length > 0){
            key = StellarSdk.Keypair.fromSecret(signer_key.value);
          } else {
            update_key();
          }
          var b64 = sign_b64_tx(envelope_b64.value,key);
          console.log("signer accountId: " + key.publicKey());
          console.log("b64: " + b64);
          //envelope_b64.value = b64;
          fill_envelope_b64(b64);
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

  // rule #1 don't repeat code FIX ME!! (duplicate fed_lookup...)
  // rule #2 if it works don't fix it?
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

    
       save.addEventListener("click", function(event) {         
        if (typeof(Storage) !== "undefined") {
          var encrypted = CryptoJS.AES.encrypt(seed.value, pass_phrase.value);       
          // Store
          localStorage.setItem(seed_nick.value, encrypted);
          //seed.value = "seed saved to local storage"
          //save.disabled = true;
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
        signer_key.value = seed.value;
        update_seed_select();
        update_key();
        update_balances();
        sign_tx.disabled = false;
      });

       // Create a new connection when the Connect button is clicked
      open.addEventListener("click", function(event) {
        create_socket();
      });

      merge_accounts.addEventListener("click", function(event) {
        accountMergeTransaction();
      }); 

      merge_all_assets.addEventListener("click", function(event) {
        merge_all_assets_Tx();
      });      

      // Close the connection when the Disconnect button is clicked
      close.addEventListener("click", function(event) {
        console.log("closed socket");
        //close.disabled = true;
        close.disabled = false;
        open.disabled = false;
        //message.textContent = "";
        //socket.close();
        
      });

      change_network.addEventListener("click", function(event) {
        console.log("change_network click detected");
        change_network_func();
        set_default_colors();
        asset.value = clone(default_asset_code.value);
        issuer.value = clone(default_issuer.value);
        tissuer.value = clone(default_issuer.value);
        makeCode();
        if (default_asset_code.value != "native"){
          tasset.value = default_asset_code.value;
        } else {
          //tasset.value = "";
        }
        save_default_settings();               
      });

      test_sound.addEventListener("click", function(event) {
        play_alarm_sound();
      }); 

      reset_default_button.addEventListener("click", function(event) {
        reset_defaults = true;
        restore_default_settings();
      }); 

      regen_keypair_button.addEventListener("click", function(event) {
        update_key();
        update_balances();
        sign_tx.disabled = false;
      }); 



  });

  // this bellow start outside that inits before the rest of the above code to allow cancel order to work
  // I'm sure there is an easier way I'm just stupid and couldn't find any other way in the time provided

      

    function confirm_delete_offer(o) {
      console.log("confirm_delete_offer");
      //console.log("o: ");
      //console.log(o);
      var p=o.parentNode.parentNode;
      //console.log("p: ");
      //console.log(p);
      var offer_id = p.firstChild.innerHTML;
      var col_data = p.innerHTML.replace(/<td>/g,'');
      col_data = col_data.split("</td>");
      //console.log("col_data: ");
      //console.log(col_data);      
      //console.log("offer_id: " + offer_id);
      var r = confirm("Confirm Delete Order Offer ID: " + offer_id + " ??");
      if (r == true) {
        console.log("You pressed OK! deleted Offer ID: " + offer_id );
        offerTrans(col_data[0],col_data[1],col_data[2],"0",col_data[5],col_data[6],col_data[7]);
        //var p=o.parentNode.parentNode;
        p.parentNode.removeChild(p);
      } else {
         console.log("You pressed Cancel!");
      }      
    }
 
  function offerTrans(offer_id, selling_asset, selling_issuer, amount, price, buying_asset, buying_issuer){
    console.log("cancaelOfferTrans");
    var opts = {};
    if (selling_asset == "XLM") {
      console.log("selling_asset native");
      opts.selling = new StellarSdk.Asset.native();
    } else {
      opts.selling = new StellarSdk.Asset(selling_asset, selling_issuer); 
    }
    if (buying_asset == "XLM") {
      opts.buying = new StellarSdk.Asset.native();
      console.log("buying_asset native");
    } else {
      console.log("buying_asset");
      console.log(buying_asset);
      console.log("buying_issuer");
      console.log(buying_issuer);
      opts.buying = new StellarSdk.Asset(buying_asset, buying_issuer);
    }
    opts.price = price;
    opts.offerId = offer_id;
    opts.amount = amount;
    var operation = StellarSdk.Operation.manageOffer(opts);
    console.log("ready to run createTransaction_outside"); 
    createTransaction_outside(operation);
  }
  
  function createTransaction_outside(operation) {
         //tx_status.textContent = "Processing";
         //update_key();
         server.loadAccount(key.publicKey())
          .then(function (account) {
             transaction = new StellarSdk.TransactionBuilder(account)            
             //array_of_operations.forEach(function (item) {
             //  transaction.addOperation(item);
             //});
             transaction.addOperation(operation);
             transaction = transaction.build();
             transaction.sign(key); 
             console.log("horizon mode sending tx");                               
             server.submitTransaction(transaction).then(function(result) {              
               //tx_status.textContent = "Completed OK";
               console.log("Transaction Completed OK");
               alert("Cancel Order Completed OK ");
             }).catch(function(e) {
               console.log("submitTransaction error");
               console.log(e);
               //tx_status.textContent = "Transaction failed";
               var error_report = "Transaction Failed";
               if (e.extras.result_codes.transaction == "tx_bad_auth"){
                  //tx_status.textContent = "Transaction error: tx_bad_auth";
                  error_report = error_report + ": Transaction error: tx_bad_auth"
               } else {           
                 //tx_status.textContent = "Transaction error: " + e.extras.result_codes.operations[0];
                 error_report = error_report + "Transaction error: " + e.extras.result_codes.operations[0];
               }
               console.log(error_report);
               alert(error_report);
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
            //tx_status.textContent = "Transaction Error: " + err; 
          });
       }

    

