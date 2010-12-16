function getVenues(){

	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(
		
			function (position) {  

				$('#app-content').html('');
				$('header span.location').html('[' +  position.coords.latitude + ', ' + position.coords.longitude + ']');
	 			
	 			$('#app-content').attr('data-geolat', position.coords.latitude);
	 			$('#app-content').attr('data-geolong', position.coords.longitude);
	 			
				var url = 'ajax.php?action=venues&l=20&geolat=' + position.coords.latitude + '&geolong=' + position.coords.longitude;

				
				$.ajax({
					url: url, 
					dataType: 'json',
					success: function(data, textStatus, XMLHttpRequest){
							
							//alert(XMLHttpRequest.status + '\n' + XMLHttpRequest.responseText);
							
							var groups = data.groups.length;
							
							//alert(groups);
							
							for (g = 0; g<groups; g++){
								
								$('#app-content').append('<h2>' + data.groups[g].type + '</h2>');
								
								var venues = data.groups[g].venues;
					
								var v = venues.length;
							
								//$('#app-content').append('<p>'+data.groups[0].venues.toString()+'</p>');
							
								var ul = document.createElement('ul');
								var $ul = $(ul);
							
								for(i = 0; i<v; i++){
									var venue = venues[i];
									$ul.append('<li><h3>' + venue.name + '</h3><p>' + venue.address + ', ' + venue.city + '</p><nav><a href="ajax.php?action=checkin&amp;vid=' + venue.id + '" class="checkin">checkin</a></nav></li>');
								}
		
								$('#app-content').append($ul);
							}
						
						},
					error: function(XMLHttpRequest, textStatus, errorThrown){

							if(XMLHttpRequest.status == 401){

								var data = $.parseJSON( XMLHttpRequest.responseText );
								//$('#app-content').append('<div class="login"><a href="' + data.loginurl + '">Login Via Foursquare</a></div>');
								document.location = data.loginurl;

							}
							else{
								//alert(XMLHttpRequest.status + '\n' + XMLHttpRequest.responseText);
								$('#app-content').html('<div class="error"><h3>HTTP status ' + XMLHttpRequest.status + '</h3><p>' + XMLHttpRequest.responseText + '</p></div>');
							}
		
						}
		
				});
				
			},
			// next function is the error callback
			function (error) {
				switch(error.code) {
					case error.TIMEOUT:
						//alert ('Timeout');
						$('#app-content').html('<div class="error">Timeout</div>');
						break;
					case error.POSITION_UNAVAILABLE:
						//alert ('Position unavailable');
						$('#app-content').html('<div class="error">Position unavailable, try again later. Some devices require GPS to be turned on.</div>');
						break;
					case error.PERMISSION_DENIED:
						//alert ('Permission denied');
						$('#app-content').html('<div class="error">Permission denied. This is all about location, can\'t go without it. </div>');
						break;
					case error.UNKNOWN_ERROR:
						//alert ('Unknown error');
						$('#app-content').html('<div class="error">Unknown error.</div>');
						break;
				}
			}
		);
	}
	else{
		$('#app-content').html('<div class="error">Your browser does not support GeoLocation, sorry.</div>');
	}
}

function getUser(){

		$.ajax({
			url: 'ajax.php?action=user', 
			dataType: 'json',
			success: function(data, textStatus, XMLHttpRequest){
					
					var nameparts = [];
					if(data.user.firstname != ''){
						nameparts.push(data.user.firstname);
					}
					if(data.user.lastname != ''){
						nameparts.push(data.user.lastname);
					}
					if(nameparts.length<2 && data.user.twitter){
						nameparts.push('@' + data.user.twitter);
					}
					$('header span.user').html(nameparts.join(' ') + ' (' + data.user.homecity + ')');
					
					getVenues();
				
				},
			error: function(XMLHttpRequest, textStatus, errorThrown){

					if(XMLHttpRequest.status == 401){

						var data = $.parseJSON( XMLHttpRequest.responseText );
						document.location = data.loginurl;

					}
					else{
						$('#app-content').html('<div class="error"><h3>HTTP status ' + XMLHttpRequest.status + '</h3><p>' + XMLHttpRequest.responseText + '</p></div>');
					}

				}

		});
			
}
	
$(document).ready(function(){

	$('a.checkin').live('click', function(){
	
			$.ajax({
				url: this.href, 
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){
						
						$('#app-content').html('');
						
						var $div = $('<div class="checked-in"></div>');
						$div.append('<h3>' + data.checkin.message + '</h3>');
						$div.append('<p>' + data.checkin.mayor.message + '</p>');
						
						/*
						if(data.checkin.badges.length>0){
							$div.append('<img class="badge" alt="" src="' + data.checkin.badges.badge.icon + '" /><h3>You just won ' + data.checkin.badges.badge.name + ' badge.</h3><p>' + data.checkin.badges.badge.description + '</p>');
						}
						*/
						
						$('#app-content').append($div);
					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						if(XMLHttpRequest.status == 401){

								var data = $.parseJSON( XMLHttpRequest.responseText );
								//$('#app-content').append('<div class="login"><a href="' + data.loginurl + '">Login Via Foursquare</a></div>');
								document.location = data.loginurl;

						}
						else{
							//alert(XMLHttpRequest.status + '\n' + XMLHttpRequest.responseText);
							$('#app-content').html('<div class="error"><h3>HTTP status ' + XMLHttpRequest.status + '</h3><p>' + XMLHttpRequest.responseText + '</p></div>');
						}
	
					}
	
			});
			
			return false;
			
	});
	
	$('header nav a').click(getVenues);
	
	getUser();
	//getVenues();


});


