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
					
						var url = 'ajax.php?action=venues&limit=20&ll=' + position.coords.latitude + ',' + position.coords.longitude + '&llAcc=' + position.coords.accuracy;
				
						$.ajax({
							url: url, 
							dataType: 'json',
							success: function(data, textStatus, XMLHttpRequest){
							
									$(document).trigger("data:venues", data.response);

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
				
						$(document).trigger("data:user", data.response);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});
		
		},
	
		checkin: function(venue){

			var url = 'ajax.php?action=checkin&broadcast=public&venueId=' + venue;

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
			nameparts.push(data.user.firstName);
		}
		if(data.user.lastname != ''){
			nameparts.push(data.user.lastName);
		}
		if(nameparts.length<2 && data.user.contact.twitter){
			nameparts.push('@' + data.user.contact.twitter);
		}
		$('header span.user').html(nameparts.join(' ') + ' (' + data.user.homeCity + ')');

		$(document).trigger("action:getvenues");

	});

	$(document).bind("data:position",function(e, position){

		$('header span.location').html('[' +  position.coords.latitude + ', ' + position.coords.longitude + ']');
		$('#app-content').data('geolat', position.coords.latitude);
		$('#app-content').data('geolong', position.coords.longitude);

	});
	
	$(document).bind("data:venues", function(e, data){

		$('#app-content').html('');
		
		if( data.error ){
			$(document).trigger("error:other", data.error);
			return false;
		}

		var groups = data.groups.length;
	
		for (g = 0; g<groups; g++){
		
			$('#app-content').append('<h2>' + data.groups[g].type + '</h2>');
			
			var venues = data.groups[g].items;

			var v = venues.length;
	
			var ul = document.createElement('ul');
			var $ul = $(ul);
	
			for(var i = 0; i < v; i += 1){
				var venue = venues[i];
				var address = [];
				if (venue.location.address) address.push(venue.location.address);
				if (venue.location.city) address.push(venue.location.city);
				$ul.append('<li><h3>' + venue.name + '</h3><p>' + address.join(', ') + ' &nbsp;</p><menu><a href="ajax.php?action=checkin&amp;vid=' + venue.id + '" data-action="action:checkin" data-venue="' + venue.id + '">checkin</a><ul><li><a href="ajax.php?action=checkin&amp;vid=' + venue.id + '" data-action="action:shoutcheckin" data-venue="' + venue.id + '">add shout</a></li><li><a href="ajax.php?action=tips&amp;vid=' + venue.id + '" data-action="action:gettips" data-venue="' + venue.id + '">tips</a></li></ul></menu></li>');
			}

			$('#app-content').append($ul);

		}

	});
	
	$(document).bind("action:checkedin", function(e, data){

		$('#app-content').html('');
	
		if( data.meta.code!=200 ){
			$(document).trigger("error:other", data.error);
			return false;
		}

		var $div = $('<div class="checked-in"></div>');
		
		var checkin = {};
		checkin.badges = [];
		
		var notifications = data.notifications;
		var n = notifications.length;
		for( var i = 0; i < n; i += 1 ){
			var notification = notifications[i];
			switch(notification.type){
				case "message":
					checkin.message = notification.item.message;
					break;
				case "mayorship":
					checkin.mayor = notification.item.message;
					break;
				case "badge":
					checkin.badges.push(notification.item);
					break;
			}
		}
		
		$div.append('<h3>' + checkin.message + '</h3>');
		
		if(checkin.mayor){
			$div.append('<p>' + checkin.mayor + '</p>');
		}
	
		/*
		if(checkin.badges && checkin.badges.length>0){
			var b = checkin.badges.length;
			for( var i = 0; i < b; i += 1 ){
				$div.append('<img class="badge" alt="" src="' + checkin.badges[i].image + '" /><h3>You\'ve unlocked  ' + checkin.badges[i].name + '</h3><p>' + checkin.badges[i].description + '</p>');
			}
		}
		*/

		$('#app-content').append($div);

	});
	
	$(document).bind("error:http", function(e, XMLHttpRequest){

		if(XMLHttpRequest.status == 401 || XMLHttpRequest.status == 403){

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
	

	$('menu').live('click', function(e){
		
		$('menu ul:visible').not($('ul',this)).hide();
		$('ul',this).toggle();
	
	});
	
	$('menu').live('blur', function(e){
		
		$('ul',this).hide();
	
	});
	

	fc.getUser();


});

