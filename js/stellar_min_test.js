"use strict";
   
    // Initialize everything when the window finishes loading
    window.addEventListener("load", function(event) {
     
      var text = document.getElementById("text");
      var message = document.getElementById("message");
      var account = document.getElementById("account");
      var destination = document.getElementById("destination");
      var seed = document.getElementById("seed");
      var amount = document.getElementById("amount");
      var asset_obj = new StellarSdk.Asset.native();
      amount.value = "1";      
     
      seed.value = 'SDHOAMBNLGCE2MV5ZKIVZAQD3VCLGP53P3OBSBI6UN5L5XZI5TKHFQL4'; 
      destination.value = 'GA6U5X6WOPNKKDKQULBR7IDHDBAQKOWPHYEC7WSXHZBFEYFD3XVZAKOO';
      //var server = new stellar.Server({
      var server = new StellarSdk.Server({     
        hostname: 'horizon-testnet.stellar.org',
        port: 443,
        secure: true
      });

      StellarSdk.Network.useTestNet();

      var key = StellarSdk.Keypair.fromSeed(seed.value);
      account.value = key.address();
      
      save.addEventListener("click", function(event) {         
        if (typeof(Storage) !== "undefined") {
          var encrypted = CryptoJS.AES.encrypt(seed.value, pass_phrase.value);       
          // Store
          localStorage.setItem(seed_nick.value, encrypted);
          seed.value = "seed saved to local storage"        
        } else {
          seed.value = "Sorry, your browser does not support Web Storage...";
        }

      });

      restore.addEventListener("click", function(event) {         
        if (typeof(Storage) !== "undefined") {
          // Retrieve
          var encrypted = localStorage.getItem(seed_nick.value);
          seed.value = CryptoJS.AES.decrypt(encrypted, pass_phrase.value).toString(CryptoJS.enc.Utf8);
        } else {
          seed.value = "Sorry, your browser does not support Web Storage...";
        }

      });


      send_tx.addEventListener("click", function(event) {         
        message.textContent = "started";
        key = StellarSdk.Keypair.fromSeed(seed.value);
        if (asset.value== "native") {
          var asset_obj = new StellarSdk.Asset.native();
        }else {
          var asset_obj = new StellarSdk.Asset(asset.value, issuer.value);
        }
        //account.value = key.address();
        function createContractAccount(key) {
          server.loadAccount(key.address())
          .then(function (account) {
            var transaction = new StellarSdk.TransactionBuilder(account,{fee:100})
            .addOperation(StellarSdk.Operation.payment({
              destination: destination.value,
              amount: amount.value,
              asset: asset_obj,
            }))          
           .addSigner(key)
           .build();
          
           console.log(transaction.toEnvelope().toXDR().toString("base64"));
           message.textContent = transaction.toEnvelope().toXDR().toString("base64");
           //return server.submitTransaction(transaction);           
          })
          .then(console.log)
          .catch(console.log);
        }
        createContractAccount(key);
      });

    });
