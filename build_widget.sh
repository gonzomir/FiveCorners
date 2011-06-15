#!/bin/bash

# W3C Widget / Opera Widget
zip fivecorners.wgt config.xml index.html jquery.js json2.js geolocation.js fivecorners. style.css icon_*.png license.txt

# Nokia Web Runtime Widget
mkdir fivecorners
cp info.plist index.html icon.png *.js style.css license.txt fivecorners/
sed -e 's/<!--BEGIN.*//g' -e 's/.*END-->//g' < index.html > fivecorners/index.html
sed -e "s|var baseURL = ''|var baseURL = 'http://greatgonzo.net/fivecorners/'|g" < fivecorners.js > fivecorners/fivecorners.js
zip fivecorners.wgz fivecorners/*
#rm -rf fivecorners

