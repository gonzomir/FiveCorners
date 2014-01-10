#!/bin/bash

# W3C Widget / Opera Widget
mkdir fivecorners
cp config.xml index.html jquery.js json2.js geolocation.js fivecorners.js style.css loading.gif icon_*.png license.txt fivecorners/
./strip_html_comments.sed < index.html | ./strip_html_inline_scripts.sed > fivecorners/index.html
zip -D fivecorners.wgt fivecorners/config.xml fivecorners/index.html fivecorners/jquery.js fivecorners/json2.js fivecorners/geolocation.js fivecorners/fivecorners.js fivecorners/style.css fivecorners/icon_*.png fivecorners/license.txt
rm -rf fivecorners


# Nokia Web Runtime Widget
mkdir fivecorners
cp info.plist index.html icon.png *.js style.css loading.gif license.txt fivecorners/
sed -e 's/<!--BEGIN.*//g' -e 's/.*END-->//g' < index.html > fivecorners/index.html
zip fivecorners.wgz fivecorners/*
rm -rf fivecorners

