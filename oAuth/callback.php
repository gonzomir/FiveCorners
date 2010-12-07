<?php

//Put in the key and secret for your Foursquare app
//Your values will be different than mine
$consumer_key = "KWYHM31YGHLDECVLA0AR0D4S5VWRBS0YD3IT5KDXDJCJBOZA";
$consumer_secret = "POL2G2MIGYF54XMYILXVKBO5MBVX4DM5CEU3ONFGVZ50R5YO";

//Includes the foursquare-asyc library files
require_once('EpiCurl.php');
require_once('EpiOAuth.php');
require_once('EpiFoursquare.php');

session_start();
$foursquareObj = new EpiFoursquare($consumer_key, $consumer_secret);
$foursquareObj->setToken($_REQUEST['oauth_token'],$_SESSION['secret']);
$token = $foursquareObj->getAccessToken();

$_SESSION['oauth_token'] = $token->oauth_token;
$_SESSION['oauth_token_secret'] = $token->oauth_token_secret;

$foursquareObj->setToken($token->oauth_token, $token->oauth_token_secret);

try {
   //Making a call to the API
   $foursquareTest = $foursquareObj->get_user();
   print_r($foursquareTest->response);
 } catch (Exception $e) {
   echo "Error: " . $e;
 }

?>
