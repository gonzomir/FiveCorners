<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors',0);

$consumer_key = "KWYHM31YGHLDECVLA0AR0D4S5VWRBS0YD3IT5KDXDJCJBOZA";
$consumer_secret = "POL2G2MIGYF54XMYILXVKBO5MBVX4DM5CEU3ONFGVZ50R5YO";

require_once('oAuth/EpiCurl.php');
require_once('oAuth/EpiOAuth.php');
require_once('oAuth/EpiFoursquare.php');

session_start();

if( $_SESSION['oauth_token'] == '' || $_SESSION['oauth_token_secret'] == '' ){

	$foursquareObj = new EpiFoursquare($consumer_key, $consumer_secret);

	if( $_SESSION['secret'] == '' || $_REQUEST['oauth_token'] == '' ){
		$loginurl = "";

		//Includes the foursquare-asyc library files
		try{
		  $results = $foursquareObj->getAuthorizeUrl();
		  $loginurl = $results['url'] . "?oauth_token=" . $results['oauth_token'];
		  $_SESSION['secret'] = $results['oauth_token_secret'];
		} catch (Execption $e) {
		  //If there is a problem throw an exception
		}
		
		header('HTTP/1.1 401 Unauthorized');
		
		echo $loginurl; //json_encode( array("url" => $loginurl) );
		
		exit();
		
	}
	else{

		$foursquareObj->setToken($_REQUEST['oauth_token'],$_SESSION['secret']);
		$token = $foursquareObj->getAccessToken();

		$_SESSION['oauth_token'] = $token->oauth_token;
		$_SESSION['oauth_token_secret'] = $token->oauth_token_secret;
		
		header('Location:index.html');
		exit();

	}

}

$foursquareObj = new EpiFoursquare($consumer_key, $consumer_secret, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

/*
try {
   //Making a call to the API
   $foursquareTest = $foursquareObj->get_user();
   print_r($foursquareTest->response);
} catch (Exception $e) {
   echo "Error: " . $e;
}
*/

switch($_GET['action']){
	
	case 'venues':
	
		unset($_GET['action']);
		
		$venues = $foursquareObj->get_venues($_GET);
		echo $venues->responseText;
		
		/*
		if($_GET['geolat']!='' && $_GET['geolong']!=''){
			$q = '?geolat='.$_GET['geolat'].'&geolong='.$_GET['geolong'];
		}
		
		$url = 'https://api.foursquare.com/v1/venues.json'.$q;
		echo file_get_contents($url);
		*/
	
		break;
		
	case 'checkin':
		
		echo '{

    "checkins":[
        {
            "id":286939,
            "user":{
                "id":467,
                "firstname":"Sarah",
                "lastname:"Simmons",
                "photo":"http://foursquare.com/userpix/467_1237171998.jpg",
                "gender":"female"
            },
            venue:{
                "id":44379,
                "name":"Topshop",
                "address":"478 Broadway",
                "crossstreet":"at Broome",
                "geolat":40.7215,
                "geolong":-74.0001
            },
            "distance":2382,
            "display":"Sarah S. @ Topshop",
            "shout":"Just tried on a dress ...",
            "created":"Thu, 21 May 09 18:09:22 +0000"
        }
    ]
}';
	
	default:
		echo "no action";
}

?>
