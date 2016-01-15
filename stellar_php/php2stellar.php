
<?php
function create_account($from_seed, $to_account_id, $start_balance, $memo) {
  $command = "node ./create_account.js " + $to_account_id . " " + $start_balance . " " + $memo + " " $from_seed ;
  exec($command, $output);
  echo $output[0];
  return $output[0];
}

function create_account_eqd($start_balance_native, $start_balance_eqd, $from_seed){
  $command = "node ./create_account_eqd.js " . $start_balance_native . " " . $start_balance_eqd . " " . $from_seed;
  exec($command, $output);
  echo $output[0];
  return $output[0];

}

function gen_random_keyset(){
  $command = "node ./gen_random_keyset.js " . $account_id;
  exec($command, $output);
  //echo $output[0];
  return $output[0];
}

function get_balance_native($account_id){
  $command = "node ./get_balance_native.js " . $account_id;
  exec($command, $output);
  echo $output[0];
  return $output[0];
}

function get_balance_asset($account_id,$asset_code, $issuer){
  $command = "node ./get_balance_asset.js " . $account_id . " " . $asset_code . " " . $issuer;
  exec($command, $output);
  echo $output[0];
  return $output[0];

}

function send_native($to_account_id, $amount, $memo, $from_seed) {
  $command = "node ./send_native.js " . $to_account_id . " " . $amount . " " . $memo . " " . $from_seed ;
  exec($command, $output);
  echo $output[0];
  return $output;
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


 echo "start <br />";
 $keyset = gen_random_keyset();
 echo $keyset . "<br />";
 echo get_account_id($keyset) . "<br />";
 echo get_seed($keyset) . "<br />";
 //get_balance_native("xxx_account_id_xxx");

?>
