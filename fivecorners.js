var fc = (function () {

	var gle = [
			'Unknown error.',
			'Permission denied. This is all about location, can\'t go without it.',
			'Position unavailable, try again later. Some devices require GPS to be turned on.',
			'Timeout'
		];
		
	var baseURL = 'http://greatgonzo.net/fivecorners/';
	//var baseURL = '';
	
	var currentPosition = {}, lastPosition = {}, hasGeoLocation = false, hasLocalStorage = false, posWatch = null;

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
			if (navigator.geolocation){
				navigator.geolocation.clearWatch(posWatch);
			}
		},
		
		getVenues: function(){
			
			if(!currentPosition.coords){
				$(document).trigger("error:other", 'There is no position information available yet.');
				return;
			}
			
			var url = baseURL + 'ajax.php?action=venues&limit=30&ll=' + currentPosition.coords.latitude + ',' + currentPosition.coords.longitude;
			if(currentPosition.coords.accuracy !== null){
				url +=  '&llAcc=' + currentPosition.coords.accuracy;
			}
	
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

		getTips: function(id, venueName){
			
			if(hasLocalStorage){
				var stips = window.localStorage.getItem('tips:' + id);
				if(stips && stips != 'undefined'){
					var tips = JSON.parse(stips);
					var d = new Date();
					var now = d.getTime() / 1000;
					if(tips.meta.timestamp > now - 60*60){
						$(document).trigger("data:tips", tips.response);
						return;
					}
				}
			}

			$.ajax({
				url: baseURL + 'ajax.php?action=tips&venue=' + id, 
				dataType: 'json',
				success: function(data, textStatus, XMLHttpRequest){
					
						if( data.meta.code != 200 ){
							$(document).trigger("error:other", data.meta.errorDetail);
							return false;
						}
					
						data.response.venueName = venueName;
						var d = new Date();
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
					url: baseURL + 'ajax.php?action=user', 
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
	
		getFriends: function(){
			
			$.ajax({
				url: baseURL + 'ajax.php?action=friends', 
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
				url: baseURL + 'ajax.php?action=friend&friend=' + id, 
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

			var url = baseURL + 'ajax.php?action=checkin&broadcast=public&venueId=' + venue + '&ll=' + currentPosition.coords.latitude + ',' + currentPosition.coords.longitude;
			if(currentPosition.coords.accuracy !== null){
				url = url  + '&llAcc=' + currentPosition.coords.accuracy;
			}
			if(shout){
				url = url + '&shout=' + encodeURIComponent(shout);
			}

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
	
		$('#friends-list').html('<menu><a href="http://greatgonzo.net/fivecorners/ajax.php?action=friends" data-action="action:getfriends">refresh</a></menu>');
		
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
		$('#app-content section:visible').not('#friends-list').hide();
		$('#friends-list').show();
		
		var d = new Date();
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
		var d = new Date();
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

		$('#friend-' + friend.id).html('<h3>' + nameparts.join(' ') + '</h3><p>was @ <strong>' + venue.name + '</strong> before ' + before + '</p><p>' + categories.join(', ') + '</p><p>' + address.join(', ') + '</p></li>');
			
	});


	$(document).bind("data:position",function(e, position){

		$('header span.location').html('[' +  position.coords.latitude + ', ' + position.coords.longitude + ' (' + position.coords.accuracy + ')]');
		if(position.coords.accuracy < 500 || position.coords.accuracy == null){
			fc.stopPosWatch();
			fc.getVenues();
		}
		else{
			$(document).trigger("error:other", 'Although we got your position coordinates, the accuracy (' + position.coords.accuracy + 'm) is not good enough for the application to work correctly. Please, wait till we get a better position. If you are in a hurry, we can show you <a href="http://greatgonzo.net/fivecorners/ajax.php?action=venues" data-action="action:getvenues">venues nearby this position.</a>');
		}

	});
	
	$(document).bind("data:venues", function(e, data){

		$('#venues-list').html('<menu><a href="http://greatgonzo.net/fivecorners/ajax.php?action=venues" data-action="action:getposition">refersh</a></menu>');
		
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

				var $li = $('<li></li>');
				$li.html('<h3>' + venue.name + '</h3><p>' + categories.join(', ') + '; ' + venue.hereNow.count + ' people here</p><p>' + address.join(', ') + '&nbsp;</p><menu><a href="' + fc.baseURL + 'ajax.php?action=checkin&amp;vid=' + venue.id + '" data-action="action:checkin" data-venue="' + venue.id + '">checkin</a> &#9660; <ul><li><a href="' + fc.baseURL + 'ajax.php?action=checkin&amp;vid=' + venue.id + '" data-action="action:shoutcheckin" data-venue="' + venue.id + '" data-vname="' + venue.name.replace('"','&quote;') + '">add shout</a></li><li><a href="' + fc.baseURL + 'ajax.php?action=tips&amp;venue=' + venue.id + '" data-action="action:gettips" data-venue="' + venue.id + '" data-venueName="' + venue.name.replace('"','&quot;') + '">tips</a></li></ul></menu>');
				
				$li.attr('data-venue', JSON.stringify(venue) );
				
				$ul.append($li);
				
			}

			$('#venues-list').append($ul);
			$('#app-content section:visible').not('#venues-list').hide();
			$('#venues-list').show();

			var d = new Date();
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
		
		fc.getTips(data.response.checkin.venue.id, data.response.checkin.venue.name);

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
		
		$('#app-content section:visible').not('#message').hide();
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

		$('#message').html('<div class="loading"></div>');
		$('#app-content section:visible').not('#message').hide();
		$('#message').show();

		fc.getVenues();

	});
	
	$(document).bind("action:gettips", function(e, el){

		$('#message').html('<div class="loading"></div>');
		$('#app-content section:visible').not('#message').hide();
		$('#message').show();

		var venue = $(el).data('venue');
		var venueName = $(el).data('venueName');
		fc.getTips(venue, venueName);

	});

	$(document).bind("action:getposition", function(e, el){

		$('#message').html('<div class="loading"></div>');
		$('#app-content section:visible').not('#message').hide();
		$('#message').show();

		fc.getPosition();

	});
	
	$(document).bind("action:getfriends", function(e, el){

		$('#message').html('<div class="loading"></div>');
		$('#app-content section:visible').not('#message').hide();
		$('#message').show();

		fc.getFriends();

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
		
		var d = new Date();
		var n = d.getTime();
		var l = $tab.data('updated');
		var a = $tab.data('update-action');
		
		if(n - l > 600000){
			$(document).trigger(a, this);
		}
		
		return false;
	});
	
	if(fc.hasGeoLocation){
		fc.getUser();
	}
	else{
		$(document).trigger("error:other", 'Your browser does not support GeoLocation, sorry. You better use <a href="http://m.foursquare.com">Foursquare mobile site</a>.');
	}

});

