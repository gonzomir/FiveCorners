#!/bin/bash

# W3C Widget / Opera Widget
zip fivecorners.wgt config.xml index.html *.js style.css icon_*.png license.txt

# Nokia Web Runtime Widget
mkdir fivecorners
cp info.plist index.html icon.png *.js style.css license.txt fivecorners/
sed -e 's/<!--BEGIN.*//g' -e 's/.*END-->//g' < index.html > fivecorners/index.html
zip fivecorners.wgz fivecorners/*
#rm -rf fivecorners

