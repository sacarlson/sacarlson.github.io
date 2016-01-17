
<?php
function create_account($from_seed, $to_account_id, $start_balance, $memo) {
  $command = "node ./create_account.js " + $to_account_id . " " . $start_balance . " " . $memo . " " . $from_seed ;
  exec($command, $output);
  echo $output[0];
  return $output[0];
}

function create_account_eqd($start_balance_native, $start_balance_eqd, $from_seed){
  $command = "node ./create_account_eqd.js " . $start_balance_native . " " . $start_balance_eqd . " " . $from_seed;
  exec($command, $output);
  //echo $output[0];
  return $output[0];

}

function gen_random_keyset(){
  $command = "node ./gen_random_keyset.js ";
  exec($command, $output);
  //echo $output[0];
  return $output[0];
}

function get_balance_native($account_id){
  return get_balance_asset($account_id,"native", "");  
}

function get_balance_asset($account_id,$asset_code, $issuer){
  $command = "node ./get_balance_asset.js " . $account_id . " " . $asset_code . " " . $issuer;
  exec($command, $output);
  echo $output[0];
  return $output[0];

}

function send_native($to_account_id, $amount, $memo, $from_seed) {
  send_asset($to_account_id, $amount, $memo, "native", '',$from_seed);  
}

function send_eqd($to_account_id,$amount, $from_seed) {
  send_asset($to_account, $amount, "EQD", "xxx_issuer_account_id_xxxx", $from_seed);
}

function send_asset($to_account_id, $amount, $memo, $asset_code, $issuer,$from_seed){
  $command = "node ./send_asset.js " . $to_account_id . " " . $amount . " " . $memo. " " . $asset_code . " " . $issuer . " " . $from_seed;
  exec($command, $output);
  echo $output[0];
  return $output[0];

}

function get_account_id($keyset){
  $array = explode(":",$keyset);
  return $array[0];
}

function get_seed($keyset){
  $array = explode(":",$keyset);
  return $array[1];
}

function create_payment_link($wallet_url, $to_account_id, $amount, $asset_code, $issuer, $invoice_no) {
//http://zipperhead.ddns.net/stellar_min_client.html?json={%22accountID%22:%22abcde%22,%22env_b64%22:%22test%22,%22seed%22:%22thisc%22} 
  $json = "?json={%22destination%22:%22" . $to_account_id . "%22,%22amount%22:%22" . $amount . "%22,%22asset%22:%22" . $asset_code . "%22,%22issuer%22:%22" . $issuer . "%22,%22memo%22:%22" . $invoice_no . "%22}";
  $link = $wallet_url . $json;
  return $link;
}

function create_payment_native_link($wallet_url, $to_account_id, $amount, $invoice_no) {
  return create_payment_link($wallet_url, $to_account_id, $amount, "native", "", $invoice_no);
}

function create_prefunded_wallet_link($wallet_url,$secret_seed) {
  $json = "?json={%22seed%22:%22" . $secret_seed . "%22}";
  $link = $wallet_url . $json;
  return $link;
}

function create_env_b64_tx_link($wallet_url, $env_b64){
  $json = "?json={%22env_b64%22:%22" . $env_b64 . "%22}";
  $link = $wallet_url . $json;
  return $link;
}

 echo "start <br />";
 $keyset = gen_random_keyset();
 echo $keyset . "<br />";
 echo get_account_id($keyset) . "<br />";
 echo get_seed($keyset) . "<br />";
 //get_balance_native("xxx_account_id_xxx");
 //$wallet_url = "https://equid.co/my-account/index.php";
 $wallet_url = "http://zipperhead.ddns.net/transaction_tools.html";
 $to_account_id = "sacarlson";
 $amount = "2.34";
 $invoice_no = "12344321";
 $link = create_payment_native_link($wallet_url, $to_account_id, $amount, $invoice_no);
 $html = '<a href="' . $link . '">' . $link . '</a>';
 echo $html;
?>
