var fc = (function () {

	var gle = [
			'Unknown error.',
			'Permission denied. This is all about location, can\'t go without it.',
			'Position unavailable, try again later. Some devices require GPS to be turned on.',
			'Timeout'
		];

	var baseURL = '';

	var user = {}, currentPosition = {}, lastPosition = {},
		hasGeoLocation = false, hasLocalStorage = false,
		posWatch = null, d = new Date();

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

		hasGeoLocation: hasGeoLocation,

		hasLocalStorage: hasLocalStorage,

		baseURL: baseURL,

		getPosition: function(){

			if (hasGeoLocation){

				var me = this;

				if(posWatch){
					this.stopPosWatch();
				}

				posWatch = navigator.geolocation.watchPosition(

					function (position) {

						lastPosition = currentPosition;
						currentPosition = position;
						$(document).trigger("data:position", position);

					},
					// next function is the error callback
					function (error) {
						if(error.code != 2){
							var error_message = gle[error.code];
							$(document).trigger("error:other", error_message);
						}
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
			if (hasGeoLocation){
				navigator.geolocation.clearWatch(posWatch);
			}
		},

		getAddress: function(){

			if(!currentPosition.address){

				var latlng = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
				geocoder = new google.maps.Geocoder();
				geocoder.geocode({'latLng': latlng}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {

							var address = {};
							address.formattedAddress = results[0].formatted_address;

							for(var c in results[0].address_components){
								var component = results[0].address_components[c];
								for( t in component.types ){
									var type = component.types[t];
									switch(type){
										case 'street_number':
											address.streetNumber = component.long_name;
											break;
										case 'route':
											address.street = component.long_name;
											break;
										case 'locality':
											address.city = component.long_name;
											break;
										case 'administrative_area_level_1':
											address.region = component.long_name;
											break;
										case 'country':
											address.country = component.long_name;
											address.countryCode = component.short_name;
											break;
										case 'postal_code':
											address.postalCode = component.long_name;
											break;
									}
								}
							}

							//currentPosition.address = address;

							$(document).trigger("data:address", address);

						}
					}
				});

			}
			else{
				var address = currentPosition.address;
				$(document).trigger("data:address", address);
			}

		},

		getVenues: function(q){

			if(!currentPosition.coords){
				$(document).trigger("error:other", 'There is no position information available yet.');
				return;
			}

			var url = baseURL + 'ajax.php?action=venues&intent=checkin&limit=50&ll=' + currentPosition.coords.latitude + ',' + currentPosition.coords.longitude;
			if(currentPosition.coords.accuracy !== null){
				url += '&llAcc=' + currentPosition.coords.accuracy;
			}
			if(q != undefined && q !== ''){
				url += '&query=' + q;
			}
			url += '&utf8=✓';

			$.ajax({
				url: url,
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code != 200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

						$(document).trigger("data:venues", data.response);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});

		},

		getVenue: function(id){

			if(hasLocalStorage){
				var venues = window.localStorage.getItem('venue:' + id);
				if(venues && venues != 'undefined'){
					var venue = JSON.parse(venues);
					var now = d.getTime() / 1000;
					if(venue.meta.timestamp > now - 24*60*60){
						$(document).trigger("data:venue", venue.response);
						return;
					}
				}
			}

			$.ajax({
				url: baseURL + 'ajax.php?action=venue&venue=' + id + '&utf8=✓',
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code != 200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

						data.meta.timestamp = d.getTime() / 1000;

						if(hasLocalStorage){
							localStorage.setItem('venue:' + id, JSON.stringify(data));
						}

						$(document).trigger("data:venue", data.response);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});

		},

		addVenue: function(data){

			var url = baseURL + 'ajax.php?action=addVenue&ll=' + currentPosition.coords.latitude + ',' + currentPosition.coords.longitude;

			for(var a in data){
				if(data[a] != undefined && data[a] != ''){
					url = url  + '&' + a + '=' + encodeURIComponent(data[a]);
				}
			}
			url += '&utf8=✓';
	
			$.ajax({
				url: url,
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code!=200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

						data.meta.timestamp = d.getTime() / 1000;

						if(hasLocalStorage){
							localStorage.setItem('venue:' + data.response.id, JSON.stringify(data));
						}

						$(document).trigger("data:venue", data.response);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);
					}

			});

		},

		getTips: function(id, venueName){

			if(hasLocalStorage){
				var stips = window.localStorage.getItem('tips:' + id);
				if(stips && stips != 'undefined'){
					var tips = JSON.parse(stips);
					var now = d.getTime() / 1000;
					if(tips.meta.timestamp > now - 60*60){
						$(document).trigger("data:tips", tips.response);
						return;
					}
				}
			}

			$.ajax({
				url: baseURL + 'ajax.php?action=tips&venue=' + id + '&utf8=✓',
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code != 200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

						data.response.venueName = venueName;
						data.meta.timestamp = d.getTime() / 1000;

						if(hasLocalStorage){
							localStorage.setItem('tips:' + id, JSON.stringify(data));
						}

						$(document).trigger("data:tips", data.response);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});

		},


		getUser: function(){

			var me = this;

			if(hasLocalStorage){
				var users = window.localStorage.getItem('user');
				if(users && users != 'undefined'){
					me.user = JSON.parse(users);
					$(document).trigger("data:user", me.user);
					return;
				}
			}

			$.ajax({
				url: baseURL + 'ajax.php?action=user&utf8=✓',
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code != 200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

						me.user = data.response;
						$(document).trigger("data:user", me.user);

						if(hasLocalStorage){
							localStorage.setItem('user', JSON.stringify(me.user));
						}

						me.getSettings();

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});

		},

		getSettings: function(){

			var me = this;

			if(hasLocalStorage){
				if(me.user && typeof(me.user != 'undefined') && typeof(me.user.settings) != 'undefined'){
					return;
				}
			}

			$.ajax({
				url: baseURL + 'ajax.php?action=settings&utf8=✓',
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						me.user.settings = data.response.settings;

						if(hasLocalStorage){
							localStorage.setItem('user', JSON.stringify(me.user));
						}

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});

		},

		getFriends: function(){

			$.ajax({
				url: baseURL + 'ajax.php?action=friends&utf8=✓',
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code != 200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

						$(document).trigger("data:friends", data.response);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});

		},

		getFriend: function(id){

			$.ajax({
				url: baseURL + 'ajax.php?action=friend&friend=' + id + '&utf8=✓',
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code != 200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

						$(document).trigger("data:friend", data.response);

					},
				error: function(XMLHttpRequest, textStatus, errorThrown){

						$(document).trigger("error:http", XMLHttpRequest);

					}

			});

		},


		checkin: function(venue, shout){

			var url = baseURL + 'ajax.php?action=checkin&venueId=' + venue + '&ll=' + currentPosition.coords.latitude + ',' + currentPosition.coords.longitude;
			if(currentPosition.coords.accuracy !== null){
				url = url  + '&llAcc=' + currentPosition.coords.accuracy;
			}
			if(shout){
				url = url + '&shout=' + encodeURIComponent(shout);
			}
			url += '&utf8=✓';

			var bcast = 'public';
			/*
			if(this.user.settings && this.user.settings.sendToTwitter){
				bcast =  bcast + ',twitter';
			}
			if(this.user.settings && this.user.settings.sendToFacebook){
				bcast =  bcast + ',facebook';
			}
			*/

			url = url + '&broadcast=' + bcast;
			url += '&utf8=✓';

			$.ajax({
				url: url,
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){

						if( data.meta.code!=200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}

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

	var d = new Date();

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

	$(document).bind("data:friends", function(e, data){
	
		$('#friends-list').html('<menu><button type="button" data-action="action:getfriends">refresh</button></menu>');
		
		var i = 0, nameparts = [], friend = {};

		var friendsCount = data.friends.count;

		var ul = document.createElement('ul');
		var $ul = $(ul);

		for(i = 0; i < friendsCount; i += 1){

			friend = data.friends.items[i];
			nameparts = [];

			if(friend.firstname != ''){
				nameparts.push(friend.firstName);
			}
			if(friend.lastname != ''){
				nameparts.push(friend.lastName);
			}
			if(nameparts.length<2 && friend.contact.twitter){
				nameparts.push('@' + friend.contact.twitter);
			}

			$ul.append('<li id="friend-' + friend.id + '"><h3>' + nameparts.join(' ') + '</h3><p></p></li>');

			fc.getFriend(friend.id);

		}

		$('#friends-list').append($ul);
		$('#app-content section').not('#friends-list').hide();
		$('#friends-list').show();

		$('#friends-list').data('updated', d.getTime());

	});

	$(document).bind("data:friend", function(e, data){

		var friend = data.user;
		var nameparts = [];

		if(friend.firstname != ''){
			nameparts.push(friend.firstName);
		}
		if(friend.lastname != ''){
			nameparts.push(friend.lastName);
		}
		if(nameparts.length<2 && friend.contact.twitter){
			nameparts.push('@' + friend.contact.twitter);
		}

		if(friend.checkins.items && friend.checkins.items.length > 0){

			var lastCheckin = friend.checkins.items[0];
			var venue = lastCheckin.venue;
			var address = [];
			if (venue.location.address) address.push(venue.location.address);
			if (venue.location.city) address.push(venue.location.city);
			var categories = [];
			var cats = venue.categories.length;
			for(var c = 0; c < cats; c += 1){
				categories.push(venue.categories[c].name);
			}

			var checkinTime = lastCheckin.createdAt;
			var now = d.getTime() / 1000;
			var minutes = Math.round((now - checkinTime) / 60);
			var hours = Math.floor(minutes/60);
			minutes = minutes - hours * 60;
			var days = Math.floor(hours/24);
			hours = hours - days * 24;

			var before = '';
			if(days > 1){
				before = days + ' days';
			}
			else if(days == 1){
				before = days + ' day';
			}
			else if (hours > 6){
				before = hours + ' hours';
			}
			else if (hours == 0){
				before = minutes + ' minutes';
			}
			else{
				before = hours + 'h ' + minutes + 'min';
			}

			var lastChekinText = 'was @ <strong>' + venue.name + '</strong> before ' + before + '</p><p>' + categories.join(', ') + '</p><p>' + address.join(', ') + '';

		}
		else{
			var lastChekinText = 'hasn\'t checked in yet.';
		}

		$('#friend-' + friend.id).html('<h3>' + nameparts.join(' ') + '</h3><p>' + lastChekinText + '</p></li>');

	});


	$(document).bind("data:position",function(e, position){

		$('header span.location').html('[' +  position.coords.latitude + ', ' + position.coords.longitude + ' (' + position.coords.accuracy + ')]');
		if(position.coords.accuracy < 500 || position.coords.accuracy == null){
			fc.stopPosWatch();
			fc.getVenues();
		}
		else{
			$(document).trigger("message:info", 'Although we got your position coordinates, the accuracy (' + position.coords.accuracy + 'm) is not good enough for the application to work correctly. Please, wait till we get a better position. <button type="button" data-action="action:getvenues">Get venues anyway</button>');
		}

	});

	$(document).bind("data:venues", function(e, data){

		$('#venues-list').html('<menu><button type="button" data-action="action:getposition">refersh</button></menu>');
		
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

				var specials = '';
				if(typeof(venue.specials) != 'undefined' && venue.specials.length > 0){
					specials = '; ' + venue.specials.length + ' specials for this venue';
				}

				var hereNow = '';
				if(typeof(venue.hereNow) != 'undefined' && venue.hereNow > 0){
					hereNow = '; ' + venue.hereNow + ' people here';
				}

				var $li = $('<li></li>');
				var vh = '<a href="' + fc.baseURL + 'ajax.php?action=venue&amp;venue=' + venue.id + '" data-action="action:getvenue" data-venue="' + venue.id + '">' +
					'<h3>' + venue.name + '</h3>' +
					'<p>' + categories.join(', ') + hereNow + specials + '</p>' +
					'<p>' + address.join(', ') + '&nbsp;</p>' +
					'</a>' +
					'<menu>' +
						'<button type="button" data-action="action:checkin" data-venue="' + venue.id + '">checkin</button>' + 
					'</menu>';
				$li.html(vh);

				$li.attr('data-venue', JSON.stringify(venue) );

				$ul.append($li);

			}

			$('#venues-list').append($ul);

			$('#venues-list').append('<h2>Venue not in the list?</h2> <form action="#" data-action="action:getvenues"> <label for="q">Venue name</label> <input name="q" id="q" type="text" required="required" /> <button type="submit">search venues</button> <button type="button" data-action="action:addvenueform">add venue</button> </form>');

			$('#app-content section').not('#venues-list').hide();
			$('#venues-list').show();

			$('#venues-list').data('updated', d.getTime());

		}

	});

	$(document).bind("action:checkedin", function(e, data){

		$('#message').html('');

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

		if(checkin.badges && checkin.badges.length>0){
			var b = checkin.badges.length;
			for( var i = 0; i < b; i += 1 ){
				var badge = checkin.badges[i].badge;
				$div.append('<h4>You\'ve unlocked  ' + badge.name + '</h4><p>' + badge.description + '</p>');
			}
		}

		$('#message').append($div);
		$('#app-content section').not('#message').hide();
		$('#message').show();

		fc.getTips(data.response.checkin.venue.id, data.response.checkin.venue.name);

	});


	$(document).bind("data:venue", function(e, data){

		var venue = data.venue;

		var $m = $('#message');

		$m.html('<h2>' + venue.name + '</h2>');

		var address = [];
		if (venue.location.address) address.push(venue.location.address);
		if (venue.location.city) address.push(venue.location.city);
		var categories = [];
		var cats = venue.categories.length;
		for(var c = 0; c < cats; c += 1){
			categories.push(venue.categories[c].name);
		}

		$m.append('<p>' + categories.join(', ') + '</p><p>' + address.join(', ') + '</p><p><button type="button" data-action="action:checkin" data-venue="' + venue.id + '">checkin here</button><button type="button" data-action="action:shoutcheckin" data-venue="' + venue.id + '" data-vname="' + venue.name.replace('"','&quote;') + '">checkin with shout</button></p>');
		
		var mayor = venue.mayor;
		if(mayor.count>0){
			var nameparts = [];
			if(mayor.user.firstname != ''){
				nameparts.push(mayor.user.firstName);
			}
			if(mayor.user.lastname != ''){
				nameparts.push(mayor.user.lastName);
			}
			$m.append('<h3>Mayor</h3><p>' + nameparts.join(' ') + ' from ' + mayor.user.homeCity + '</p>');
		}
		else{
			$m.append("<h3>Mayor</h3><p>This venue doesn't have a mayour yet.</p>");
		}

		if(venue.specials.length > 0){
			$m.append('<h3>Specials</h3>');

				var specials = venue.specials;

				var ul = document.createElement('ul');
				var $ul = $(ul);

				var specialsCount = specials.length;
				for( var i = 0; i < specialsCount; i++ ){
					var sp = specials[i];
					$ul.append('<li><h4> ' + sp.title + '</h4><p>' + sp.message + '</p><p>' + sp.description + '</p></li>');
				}

				$m.append($ul);

		}


		if(venue.tips.count > 0){

			var groups = venue.tips.groups.length;

			for(g = 0; g < groups; g++){

				var group = venue.tips.groups[g];

				$m.append('<h3>' + group.name + '</h3>');

				var ul = document.createElement('ul');
				var $ul = $(ul);

				var tipsCount = group.items.length;
				for( var i = 0; i < tipsCount; i++ ){
					var tip = group.items[i];
					var user = tip.user;
					var nameparts = [];

					if(user.firstName != ''){
						nameparts.push(user.firstName);
					}
					if(user.lastName != ''){
						nameparts.push(user.lastName);
					}
					$ul.append('<li><strong>' + nameparts.join(' ') + '</strong> from ' + user.homeCity + ' says:<p>' + tip.text + '</p></li>');
				}

				$m.append($ul);

			}

		}
		
		$('#app-content section').not('#message').hide();
		$m.show();

	});

	$(document).bind("data:tips", function(e, data){

		if( $('#message div.checked-in').size() == 0 ){
			$('#message').html('');
		}

		$('#message').append('<h2>Tips for ' + data.venueName + '</h2>');

		if(data.tips.count > 0){
			var ul = document.createElement('ul');
			var $ul = $(ul);

			var tipsCount = data.tips.items.length;
			for( var i = 0; i < tipsCount; i++ ){
				var tip = data.tips.items[i];
				var user = tip.user;
				var nameparts = [];

				if(user.firstName != ''){
					nameparts.push(user.firstName);
				}
				if(user.lastName != ''){
					nameparts.push(user.lastName);
				}
				$ul.append('<li><strong>' + nameparts.join(' ') + '</strong> from ' + user.homeCity + ' says:<p>' + tip.text + '</p></li>');
			}
			$('#message').append($ul);
		}
		else{
			$('#message').append('<p>No tips for this venue.</p>');
		}
		
		$('#app-content section').not('#message').hide();
		$('#message').show();

	});


	$(document).bind("error:http", function(e, XMLHttpRequest){

		if(XMLHttpRequest.status == 403 || XMLHttpRequest.status == 401){

			if(fc.hasLocalStorage){
				localStorage.removeItem('user');
			}
			var data = $.parseJSON( XMLHttpRequest.responseText );
			document.location = data.loginurl;

		}
		else{
			
			var errorText = '';
			try{
				data = JSON.parse(XMLHttpRequest.responseText);
				errorText = data.meta.errorDetail;
			}
			catch(e){
				errorText = XMLHttpRequest.responseText;
			}

			$('#message').html('<div class="error"><h3>HTTP status ' + XMLHttpRequest.status + '</h3><p>' + errorText + '</p></div>');
			$('#app-content section').not('#message').hide();
			$('#message').show();
		}

	});

	$(document).bind("error:other", function(e, error_message){

		$('#message').html('<div class="error"><h3>Error</h3><p>' + error_message + '</p></div>');
		$('#app-content section').not('#message').hide();
		$('#message').show();

	});

	$(document).bind("message:info", function(e, message_text){

		$('#message').html('<p>' + message_text + '</p>');
		$('#app-content section').not('#message').hide();
		$('#message').show();

	});
	
	$(document).bind("message:loading", function(e, message_text){

		$('#message').html('<div class="loading"><p>' + message_text + '</p></div>');
		$('#app-content section').not('#message').hide();
		$('#message').show();

	});
	
	$(document).delegate('a[data-action], button[data-action]', 'click', function(e){

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
			$(document).trigger("message:loading", '');
			fc.checkin(venue, shout);
		}

	});

	$(document).bind("action:shoutcheckin", function(e, data){

		var venue = data.venue;
		var vname = data.vname;
		$('#venue').val(venue);
		$('#shoutForm h2').html('Checkin to ' + vname);
		$('#app-content section').not('#shoutForm').hide();
		$('#shoutForm').show();

	});

	$(document).bind("action:addvenueform", function(e, data){

		var vname = data.q;

		$('#name').val(vname);

		fc.getAddress();

		$('#app-content section').not('#addvenue').hide();
		$('#addvenue').show();

	});

	$(document).bind("action:addvenue", function(e, data){

		$(document).trigger("message:loading", '');

		fc.addVenue(data);

	});

	$(document).bind("data:address", function(e, address){
		var fd = '';
		if(address.formattedAddress){
			fd = address.formattedAddress;
		}
		else{
			fd = ((address.streetNumber)?address.streetNumber + ' ':'') + address.street;
		}
		$('#address').val(fd);
		$('#city').val(address.city);
		$('#state').val(address.country);
		$('#zip').val(address.postalCode);
	});

	$(document).bind("action:getvenues", function(e, data){

		$(document).trigger("message:loading", 'Looking up venues.');
		
		fc.stopPosWatch();
		fc.getVenues(data.q);

	});

	$(document).bind("action:getvenue", function(e, data){

		$(document).trigger("message:loading", 'Loading venue details.');

		var venue = data.venue;
		fc.getVenue(venue);

	});

	$(document).bind("action:gettips", function(e, el){

		var venue = $(el).data('venue');
		var venueName = $(el).data('venueName');

		$(document).trigger("message:loading", 'Loading tips for ' + venueName);

		fc.getTips(venue, venueName);

	});

	$(document).bind("action:getposition", function(e, el){

		$(document).trigger("message:loading", 'Acquiring position.');

		fc.getPosition();

	});

	$(document).bind("action:getfriends", function(e, el){

		$(document).trigger("message:loading", 'Locating friends.');

		fc.getFriends();

	});

	$('header nav a, a.tab').live('click', function(){

		var $tab = $(this.hash);
		$('#app-content section').not($tab).hide();
		$tab.show();


		var n = d.getTime();
		var l = $tab.data('updated');
		var a = $tab.data('update-action');

		if(a && n - l > 600000){
			$(document).trigger(a, this);
		}

		return false;

	});

	if(fc.hasGeoLocation){
		$(document).trigger("message:loading", 'Wait...');
		fc.getUser();
	}
	else{
		$(document).trigger("error:other", 'Your browser does not support GeoLocation, sorry. You better use <a href="http://m.foursquare.com">Foursquare mobile site</a>.');
	}

});

