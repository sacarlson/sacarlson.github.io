# "Scotty's Wallet" aka my_wallet Features

* Send funds of any asset type to another accountId.
* Create Random accountId destination accounts 
* Create new account option checkbox to fund unfunded accounts
* Receive funds of any type from another AccountId with QRcode support.
* Federation support to use names instead of long accountID numbers for sending funds.
* Auto generation of AccountId on new users that is saved in local browser storage.
* Memo support for both number and text for send fund transactions
* Table display page of Transaction History.
* Table display page of list of presetly held assets.
* Save encrypted secret key list in local browser storage.
* Select and change from one key account to another from local browser storage keysets.
* Import/Export encrypted secret keysets to and from local file system.
* Export secret keyset using QRcode to the Centaurus wallet android app.
* TX Status of transaction and error condition displayed at top of screen. 
* Balance of accountId in Lumens (XLM) at top of screen updated in realtime by stream link.
* Generate, Send and recieve links to and from email or other sources to send transactions or prefunded accounts or links to submit request for funds from another account holder.
* Advanced (section)
 * Change Network settings 
   * Change URL address and port pointing to private/custom Horizon servers.
   * Change Network Passphrase for private/custom networks. 
   * Change from Horizon to Mss-server supported API format.
 * Add Trustlines to AccountId
 * Sign base64 tx envelope transaction and mail to next signer or submit to Net.
 * Merge accountId with another targeted accountId.
 * Change AccountId advanced settings
  * Add or remove signers from accountId and set/change signer weights.
  * Change signing weight thresholds and master weight signer weights.
  * Change Inflation Destination pointing of accountId.
 * View table of open order offers of trading assets on this accountID.
 * Create offers to submit buy and sell orders to trade from one asset issuer for another.
* Software Security Features
  * All CDN libs have SHA-384 Subresource Integrity setup to verify authenticity and safety per https://www.w3.org/TR/SRI/ (not supported on all browser versions).
  * All code for my_wallet is transparant and open sourced to be openly audited by all here on github.


# Screen Shots

### Send Funds
[[screenshots/Screenshot.png]]

### Recieve Funds
[[screenshots/Screenshot1.png]]

### Transaction History
[[screenshots/Screenshot2.png]]

### List Assets
[[screenshots/Screenshot3.png]]

### Export/Import Secret keysets
[[screenshots/Screenshot5.png]]

### Change Network Settings
[[screenshots/Screenshot6.png]]

### Add Trustlines
[[screenshots/Screenshot7.png]]

### Sign TX transactions for multisig
[[screenshots/Screenshot8.png]]

### Merge AccountId with target AccountId
[[screenshots/Screenshot9.png]]

### Advanced Account settings for multisig
[[screenshots/Screenshot10.png]]

### View table of accountid present active asset trade offers
[[screenshots/Screenshot11.png]]

### Create asset trade offer
[[screenshots/Screenshot12.png]]

### Email links of transactions or funded accounts
[[screenshots/Screenshot13.png]]
