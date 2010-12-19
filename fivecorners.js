var fc = (function () {

	var gle = [
			'Unknown error.',
			'Permission denied. This is all about location, can\'t go without it.',
			'Position unavailable, try again later. Some devices require GPS to be turned on.',
			'Timeout'
		];
	
	return {

		getVenues: function(){

			if (navigator.geolocation){
				navigator.geolocation.getCurrentPosition(
		
					function (position) {  

						$(document).trigger("data:position", position);
					
						var url = 'ajax.php?action=venues&l=20&geolat=' + position.coords.latitude + '&geolong=' + position.coords.longitude;
				
						$.ajax({
							url: url, 
							dataType: 'json',
							success: function(data, textStatus, XMLHttpRequest){
							
									$(document).trigger("data:venues", data);

								},
							error: function(XMLHttpRequest, textStatus, errorThrown){

									$(document).trigger("error:http", XMLHttpRequest);

								}
		
						});
				
					},
					// next function is the error callback
					function (error) {
						var error_message = gle[error.code];
						$(document).trigger("error:other", error_message);
					},
					{
						enableHighAccuracy: true
					}
				);
			}
			else{
				$(document).trigger("error:other", 'Your browser does not support GeoLocation, sorry.');
			}
		},

		getUser: function(){

			$.ajax({
				url: 'ajax.php?action=user', 
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){
				
						$(document).trigger("data:user", data);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});
		
		},
	
		checkin: function(venue){

			var url = 'ajax.php?action=checkin&venue=' + venue;

			$.ajax({
				url: url, 
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){
				
						$(document).trigger("action:checkedin", data);
									
					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);
					}

			});

		}

	}	

})();

$(document).ready(function(){
	
	$(document).bind("data:user", function(e, data){

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

		$(document).trigger("action:getvenues");

	});

	$(document).bind("data:position",function(e, position){

		$('header span.location').html('[' +  position.coords.latitude + ', ' + position.coords.longitude + ']');
		$('#app-content').data('geolat', position.coords.latitude);
		$('#app-content').data('geolong', position.coords.longitude);

	});
	
	$(document).bind("data:venues", function(e, data){

		$('#app-content').html('');

		var groups = data.groups.length;
	
		for (g = 0; g<groups; g++){
		
			$('#app-content').append('<h2>' + data.groups[g].type + '</h2>');
			
			var venues = data.groups[g].venues;

			var v = venues.length;
	
			var ul = document.createElement('ul');
			var $ul = $(ul);
	
			for(i = 0; i<v; i++){
				var venue = venues[i];
				$ul.append('<li><h3>' + venue.name + '</h3><p>' + venue.address + ', ' + venue.city + '</p><nav><a href="ajax.php?action=checkin&amp;vid=' + venue.id + '" data-action="action:checkin" data-venue="' + venue.id + '">checkin</a></nav></li>');
			}

			$('#app-content').append($ul);

		}

	});
	
	$(document).bind("action:checkedin", function(e, data){

		$('#app-content').html('');
	
		var $div = $('<div class="checked-in"></div>');
		$div.append('<h3>' + data.checkin.message + '</h3>');
		if(data.checkin.mayor){
			$div.append('<p>' + data.checkin.mayor.message + '</p>');
		}
	
		if(data.checkin.badges){
			$div.append('<img class="badge" alt="" src="' + data.checkin.badges.badge.icon + '" /><h3>You just won ' + data.checkin.badges.badge.name + ' badge.</h3><p>' + data.checkin.badges.badge.description + '</p>');
		}
	
		$('#app-content').append($div);

	});
	
	$(document).bind("error:http", function(e, XMLHttpRequest){

		if(XMLHttpRequest.status == 401){

			var data = $.parseJSON( XMLHttpRequest.responseText );
			document.location = data.loginurl;

		}
		else{
			$('#app-content').html('<div class="error"><h3>HTTP status ' + XMLHttpRequest.status + '</h3><p>' + XMLHttpRequest.responseText + '</p></div>');
		}

	});

	$(document).bind("error:other", function(e, error_message){

		$('#app-content').html('<div class="error"><h3>Error</h3><p>' + error_message + '</p></div>');

	});
	
	$(document).delegate('a[data-action]', 'click', function(e){
		
		e.preventDefault();
		var action = $(this).data('action');
		$(document).trigger(action, this);
	
	});
	

	$(document).bind("action:checkin", function(e, el){

		var venue = $(el).data('venue');
		fc.checkin(venue);

	});
	
	$(document).bind("action:getvenues", function(e, el){

		fc.getVenues();

	});
	

	fc.getUser();


});

