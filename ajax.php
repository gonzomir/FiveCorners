<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors',0);

$consumer_key = "KWYHM31YGHLDECVLA0AR0D4S5VWRBS0YD3IT5KDXDJCJBOZA";
$consumer_secret = "POL2G2MIGYF54XMYILXVKBO5MBVX4DM5CEU3ONFGVZ50R5YO";

require_once('oAuth/EpiCurl.php');
require_once('oAuth/EpiOAuth.php');
require_once('oAuth/EpiFoursquare.php');

session_start();

if( $_SESSION['access_token'] == '' || $_SESSION['access_token_secret'] == '' ){

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
		
		if( $_SERVER['X_REQUESTED_WITH'] == 'XMLHttpRequest' ){
			header('HTTP/1.1 401 Unauthorized');
			echo json_encode( array( 'loginurl' => $loginurl ) ); //json_encode( array("url" => $loginurl) );
		}
		else{
			header('Location:'.$loginurl);
		}
		
		exit();
		
	}
	else{

		$foursquareObj->setToken($_REQUEST['oauth_token'],$_SESSION['secret']);
		$token = $foursquareObj->getAccessToken();

		$_SESSION['access_token'] = $token->oauth_token;
		$_SESSION['access_token_secret'] = $token->oauth_token_secret;
		
		header('Location:index.html');
		exit();

	}

}

$foursquareObj = new EpiFoursquare($consumer_key, $consumer_secret, $_SESSION['access_token'], $_SESSION['access_token_secret']);

switch($_GET['action']){
	
	case 'user':
	
		$venues = $foursquareObj->get_user();
		echo $venues->responseText;
		
		break;
		
	case 'venues':
	
		unset($_GET['action']);
		
		$venues = $foursquareObj->get_venues($_GET);
		echo $venues->responseText;
		
		break;
		
	case 'checkin':
		
		unset($_GET['action']);
		
		$checkin = $foursquareObj->post_checkin($_GET);
		echo $checkin->responseText;
		
		break;
				
	default:
		header('HTTP/1.1 501 Unimplemented');
		echo 'Method not implemented';

}

?>
