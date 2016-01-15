<!DOCTYPE html>
<html lang="en">
<head>
  <title>Stellar mini transaction client </title>
  <meta charset="UTF-8" />
  <script src="js/stellar-sdk.js"></script> 
</head>
<body>
<script>

function create_random_key_set(){
  var key = StellarSdk.Keypair.random();
  console.log("key");
  console.log(key);
  return key.address() + ":" + key.seed();
}

</script>

<?php
function get_account_id($keyset){
  $array = explode(":",$keyset);
  return $array[0];
}

function get_seed($keyset){
  $array = explode(":",$keyset);
  return $array[1];
}

$key_set = "<script>document.writeln(create_random_key_set());</script>";
//$key_set = 'GB2JH43C6B2UYVHPY2TRYNIS6FC3L7QG3DO7IOOLVBK7OR67RCFO3WME:SA7PAIMLIJCG7WL5LDIHSAZFK2R6BD3TEXXTKJF2FJRYE4JKSCM3OF5D';

//echo gettype($key_set);
//echo get_account_id($key_set);
//echo get_seed($clean);
//echo get_seed("test:this");
//echo get_account_id("test:this") ;
echo $key_set;
?>


</body>
</html>
