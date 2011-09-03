FiveCorners
===========

FIveCorners is a Foursw=quare web-app client with focus on fast checkin. 

It uses GeoLocation API to show nearby venues, which means it will work on most of
the modern smartphones. Since Nokia's browser still does not support GeoLocation, 
I have packed the app as a Symbian Web Runtime Widget, which can be downloaded from 
[http://greatgonzo.net/fivecorners/fivecorners.wgz](http://greatgonzo.net/fivecorners/fivecorners.wgz).


Credits
-------

Well, I realy need to learn how to use git submodiules, but since then I will list
the stuff I use here:

*	[foursquare-async](https://github.com/jmathai/foursquare-async)

*	[Geolocation-API-Polyfill ](https://github.com/manuelbieh/Geolocation-API-Polyfill)

	I added support for Symbian WRT to this, but as I said, I lack some git-fu to do it properly.

*	[JSON-js](https://github.com/douglascrockford/JSON-js)

	Again for the Symbian WRT, which is lacking behind the other WebKit browsers.
