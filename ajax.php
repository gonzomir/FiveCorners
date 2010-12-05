<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

switch($_GET['action']){
	
	case 'venues':
	
		if($_GET['geolat']!='' && $_GET['geolong']!=''){
			$q = '?geolat='.$_GET['geolat'].'&geolong='.$_GET['geolong'];
		}
		$url = 'https://api.foursquare.com/v1/venues.json'.$q;

		echo file_get_contents($url);
	
		break;
		
	default:
		echo "no action";
}

?>
