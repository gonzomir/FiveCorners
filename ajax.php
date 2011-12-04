<?php
ini_set('error_reporting', E_ALL & ~E_NOTICE);
ini_set('display_errors',1);

$consumer_key = "KWYHM31YGHLDECVLA0AR0D4S5VWRBS0YD3IT5KDXDJCJBOZA";
$consumer_secret = "POL2G2MIGYF54XMYILXVKBO5MBVX4DM5CEU3ONFGVZ50R5YO";

$redirectUri = 'http://greatgonzo.net/fivecorners/ajax.php';

require_once('oAuth/EpiCurl.php');
require_once('oAuth/EpiFoursquare.php');

$foursquareObj = new EpiFoursquare($consumer_key, $consumer_secret);

if( !isset($_COOKIE['access_token']) &&  !isset($_GET['code'])  ){

	$loginurl = "";

	//Includes the foursquare-asyc library files
	try{
		$loginurl = $foursquareObj->getAuthorizeUrl($redirectUri);
		$_SESSION['secret'] = $results['oauth_token_secret'];
		header('HTTP/1.1 403 Forbidden');
		echo json_encode( array( 'loginurl' => $loginurl ) );
	} catch (EpiFoursquareBadRequestException $e){
		header('HTTP/1.1 400 Bad Request');
		echo $e->getMessage();
	} catch (EpiFoursquareNotAuthorizedException $e){
		header('HTTP/1.1 403 Forbidden');
		echo $e->getMessage();
	} catch (EpiFoursquareException $e){
		header('HTTP/1.1 '.$e->getCode());
		echo $e->getCode().'  '.$e->getMessage();
	} catch (Exception $e) {
		header('HTTP/1.1 500 Internal Server Error');
		echo $e->getCode().'  '.$e->getMessage();
	}

	exit();

}

if( !isset($_COOKIE['access_token']) ) {

	try{

		$token = $foursquareObj->getAccessToken($_GET['code'], $redirectUri);

		setcookie('access_token', $token->access_token, time() + 30*24*3600);
		$_COOKIE['access_token'] = $token->access_token;

		header('Location:index.html');

	} catch (EpiFoursquareBadRequestException $e){
		header('HTTP/1.1 400 Bad Request');
		echo $e->getMessage();
	} catch (EpiFoursquareNotAuthorizedException $e){
		header('HTTP/1.1 403 Forbidden');
		echo $e->getMessage();
	} catch (EpiFoursquareException $e){
		header('HTTP/1.1 '.$e->getCode());
		echo $e->getCode().'  '.$e->getMessage();
	} catch (Exception $e) {
		header('HTTP/1.1 500 Internal Server Error');
		echo $e->getCode().'  '.$e->getMessage();
	}

	exit();


}

$foursquareObj->setAccessToken($_COOKIE['access_token']);

try{

	switch($_GET['action']){

		case 'user':

			$user = $foursquareObj->get('/users/self');
			echo $user->responseText;

			break;

		case 'settings':

			$user = $foursquareObj->get('/settings/all');
			echo $user->responseText;

			break;

		case 'friends':

			unset($_GET['action']);

			$friends = $foursquareObj->get('/users/self/friends');
			echo $friends->responseText;

			break;

		case 'friend':

			unset($_GET['action']);

			$friends = $foursquareObj->get('/users/'.$_GET['friend']);
			echo $friends->responseText;

			break;

		case 'venues':

			unset($_GET['action']);

			$venues = $foursquareObj->get('/venues/search',$_GET);
			echo $venues->responseText;

			break;

		case 'venue':

			unset($_GET['action']);

			$venue = $foursquareObj->get('/venues/'.$_GET['venue']);
			echo $venue->responseText;

			break;

		case 'addVenue':

			unset($_GET['action']);

			$venue = $foursquareObj->post('/venues/add', $_GET);
			echo $venue->responseText;

			break;

		case 'tips':

			unset($_GET['action']);

			$tips = $foursquareObj->get('/venues/'.$_GET['venue'].'/tips', array('sort'=>'recent') );
			echo $tips->responseText;

			break;

		case 'checkin':

			unset($_GET['action']);

			$checkin = $foursquareObj->post('/checkins/add',$_GET);
			file_put_contents('tests.txt', stripslashes($checkin->responseText)."\n", FILE_APPEND);
			echo $checkin->responseText;

			break;

		default:
			header('HTTP/1.1 501 Unimplemented');
			echo 'Method not implemented';

	}

} catch (EpiFoursquareBadRequestException $e){
	header('HTTP/1.1 400 Bad Request');
	echo $e->getMessage();
} catch (EpiFoursquareNotAuthorizedException $e){
	header('HTTP/1.1 403 Forbidden');
	echo $e->getMessage();
} catch (EpiFoursquareException $e){
	header('HTTP/1.1 '.$e->getCode());
	echo $e->getCode().'  '.$e->getMessage();
} catch (Exception $e) {
	header('HTTP/1.1 500 Internal Server Error');
	echo $e->getCode().'  '.$e->getMessage();
}

?>
