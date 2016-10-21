I made the first version of the wallet_forwarder  http://sacarlson.github.io/wallet_forwarder/forwarder.html that if it's never been setup before will provide a setup page to choose a desired wallet web app URL.  After setup on future visits it will branch forward to the users setup default wallet.  It will also forward the ?json=  contents to the forwarded wallet to perform needed tasks or trade setup and other.  To reset forwarder to a new URL address after it's already been set add ?set=true to the link as seen in the example bellow:

http://sacarlson.github.io/wallet_forwarder/forwarder.html?set=true

After the forwarder is setup you can test it with this test trade setup link:

http://sacarlson.github.io/wallet_forwarder/forwarder.html?json=%7B%22selling_asset_code%22:%22USD%22,%22selling_asset_issuer%22:%22GBEK5BFCXBYPZ5JAP2XUWM637PYBQNTL5Y2MVZYV2NBRH6OYS4HCWTWO%22,%22selling_price%22:%221.34%22,%22buying_asset_code%22:%22FUNT%22,%22buing_asset_issuer%22:%22GBEK5BFCXBYPZ5JAP2XUWM637PYBQNTL5Y2MVZYV2NBRH6OYS4HCWTWO%22,%22selling_amount%22:%221.123%22%7D

Todo:
Needs better documentation that a new user can understand.  Needs some css code or other to make it pritty with a better user interface.
Might want to add some method of security to it with like a picture link or sound that as it passes the forwarder makes a sound or shows a pic 
that only the user would know. This would come from data in the users browser local storage.  Or come up with some other ideas to make it more secure.

