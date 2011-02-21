var fc = (function () {

	var gle = [
			'Unknown error.',
			'Permission denied. This is all about location, can\'t go without it.',
			'Position unavailable, try again later. Some devices require GPS to be turned on.',
			'Timeout'
		];
	
	var currentPosition = {}, lastPosition = {}, hasGeoLocation = false, hasLocalStorage = false;

	if (navigator.geolocation){
		hasGeoLocation = true;
	}
	
	function supports_html5_storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
	
	hasLocalStorage = supports_html5_storage();
	
	return {

		getPosition: function(){

			if (hasGeoLocation){
		
				var me = this;
	
				this.posWatch = navigator.geolocation.watchPosition(

					function (position) {  

						lastPosition = currentPosition;
						currentPosition = position;
						$(document).trigger("data:position", position);
			
					},
					// next function is the error callback
					function (error) {
						var error_message = gle[error.code];
						$(document).trigger("error:other", error_message);
					},
					{
						enableHighAccuracy: true,
						timeout: 60000
					}
				);

			}
			else{

				$(document).trigger("error:other", 'Your browser does not support GeoLocation, sorry.');

			}

		},
		
		stopPosWatch: function(){
			if (navigator.geolocation){
				navigator.geolocation.clearWatch(this.posWatch);
			}
		},
		
		getVenues: function(){
			
			if(!currentPosition.coords){
				$(document).trigger("error:other", 'There is no position information available yet.');
				return;
			}
			
			var url = 'ajax.php?action=venues&limit=30&ll=' + currentPosition.coords.latitude + ',' + currentPosition.coords.longitude + '&llAcc=' + currentPosition.coords.accuracy;
	
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

		getUser: function(){
			
			var data = false;
			
			if(hasLocalStorage){
				var user = window.localStorage.getItem('user');
				if(user && user != 'undefined'){
					data = $.parseJSON(user);
					$(document).trigger("data:user", data.response);
				}
			}
			if(!data){

				$.ajax({
					url: 'ajax.php?action=user', 
					success: function(d, textStatus, XMLHttpRequest){
				
							if(hasLocalStorage){
								localStorage.setItem('user', XMLHttpRequest.responseText);
							}

							data = $.parseJSON(XMLHttpRequest.responseText);
							$(document).trigger("data:user", data.response);

						},
					error: function(XMLHttpRequest, textStatus, errorThrown){

							$(document).trigger("error:http", XMLHttpRequest);

						}

				});
			
			}
		
		},
	
		checkin: function(venue, shout){

			var url = 'ajax.php?action=checkin&broadcast=public&venueId=' + venue + '&ll=' + currentPosition.coords.latitude + ',' + currentPosition.coords.longitude + '&llAcc=' + currentPosition.coords.accuracy;
			if(shout){
				url = url + '&shout=' + encodeURIComponent(shout);
			}

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

		$(document).trigger("action:getposition");

	});

	$(document).bind("data:position",function(e, position){

		$('header span.location').html('[' +  position.coords.latitude + ', ' + position.coords.longitude + ' (' + position.coords.accuracy + ')]');
		if(position.coords.accuracy < 500){
			fc.stopPosWatch();
			fc.getVenues();
		}
		else{
			$(document).trigger("error:other", 'Although we got your position coordinates, the accuracy (' + position.coords.accuracy + 'm) is not good enough for the application to work correctly. Please, wait till we get a better position. If you are in a hurry, we can show you <a href="ajax.php?action=venues" data-action="action:getvenues">venues nearby this position.</a>');
		}

	});
	
	$(document).bind("data:venues", function(e, data){

		$('#venues-list').html('');
		
		if( data.error ){
			$(document).trigger("error:other", data.error);
			return false;
		}

		var groups = data.groups.length;
	
		for (var g = 0; g<groups; g++){
		
			$('#venues-list').append('<h2>' + data.groups[g].name + '</h2>');
			
			var venues = data.groups[g].items;

			var v = venues.length;
	
			var ul = document.createElement('ul');
			var $ul = $(ul);
	
			for(var i = 0; i < v; i += 1){
				var venue = venues[i];
				var address = [];
				if (venue.location.address) address.push(venue.location.address);
				if (venue.location.city) address.push(venue.location.city);
				var categories = [];
				var cats = venue.categories.length;
				for(var c = 0; c < cats; c += 1){
					categories.push(venue.categories[c].name);
				}
				$ul.append('<li><h3>' + venue.name + '</h3><p>' + categories.join(', ') + '; ' + venue.hereNow.count + ' people here</p><p>' + address.join(', ') + '&nbsp;</p><menu><a href="ajax.php?action=checkin&amp;vid=' + venue.id + '" data-action="action:checkin" data-venue="' + venue.id + '">checkin</a> &#9660; <ul><li><a href="ajax.php?action=checkin&amp;vid=' + venue.id + '" data-action="action:shoutcheckin" data-venue="' + venue.id + '" data-vname="' + venue.name.replace('"','&quote;') + '">add shout</a></li><li><a href="ajax.php?action=tips&amp;vid=' + venue.id + '" data-action="action:gettips" data-venue="' + venue.id + '">tips</a></li></ul></menu></li>');
			}

			$('#venues-list').append($ul);
			$('#app-content section:visible').not('#venues-list').hide();
			$('#venues-list').show();

		}

	});
	
	$(document).bind("action:checkedin", function(e, data){

		$('#message').html('');
	
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

		$('#message').append($div);
		$('#app-content section:visible').not('#message').hide();
		$('#message').show();

	});
	
	$(document).bind("error:http", function(e, XMLHttpRequest){

		if(XMLHttpRequest.status == 401 || XMLHttpRequest.status == 403){

			if(hasLocalStorage){
				localStorage.removeItem('user');
			}
			var data = $.parseJSON( XMLHttpRequest.responseText );
			document.location = data.loginurl;

		}
		else{
			$('#message').html('<div class="error"><h3>HTTP status ' + XMLHttpRequest.status + '</h3><p>' + XMLHttpRequest.responseText + '</p></div>');
			$('#app-content section:visible').not('#message').hide();
			$('#message').show();
		}

	});

	$(document).bind("error:other", function(e, error_message){

		$('#message').html('<div class="error"><h3>Error</h3><p>' + error_message + '</p></div>');
		$('#app-content section:visible').not('#message').hide();
		$('#message').show();

	});
	
	$(document).delegate('a[data-action]', 'click', function(e){
		
		e.preventDefault();
		e.stopPropagation();
		var action = $(this).data('action');
		var data = $(this).data();
		$(document).trigger(action, data);
		return false;
	
	});
	
	$(document).delegate('form', 'submit', function(e){
		
		e.preventDefault();
		e.stopPropagation();
		var action = $(this).data('action');

		var els = this.elements.length;
		var el = {};
		var data = {};
		for(var i = 0; i < els; i += 1){
			el = this.elements[i];
			if(el.name!=''){
				data[el.name] = el.value;
			}
		}
		
		$(document).trigger(action, data);
		return false;
	
	});
	

	$(document).bind("action:checkin", function(e, data){

		var venue = data.venue;
		var shout = data.shout;
		if(venue){
			fc.checkin(venue, shout);
		}

	});
	
	$(document).bind("action:shoutcheckin", function(e, el){

		var venue = $(el).data('venue');
		var vname = $(el).data('vname');
		$('#venue').val(venue);
		$('#shoutForm h2').html('Checkin to ' + vname);
		$('#app-content section:visible').not('#shoutForm').hide();
		$('#shoutForm').show();

	});

	$(document).bind("action:getvenues", function(e, el){

		fc.getVenues();

	});
	
	$(document).bind("action:getposition", function(e, el){

		fc.getPosition();

	});
	

	$('menu').live('click', function(e){
		
		e.stopPropagation();
		$('menu ul:visible').not($('ul',this)).hide();
		$('ul',this).toggle();
		return false;
	
	});

	$(document).delegate('*', 'click', function(e){

		if(e.target.nodeName != 'MENU'){
			$('menu ul:visible').not($(e.target)).hide();
		}

	});
	
	$('header nav a').click(function(){
		var $tab = $(this.hash);
		$('#app-content section:visible').not($tab).hide();
		$tab.show();
		return false;
	});
	

	fc.getUser();


});

