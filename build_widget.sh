#!/bin/bash

# W3C Widget / Opera Widget
zip fivecorners.wgt config.xml index.html *.js style.css icon_*.png license.txt

# Nokia Web Runtime Widget
mkdir fivecorners
cp info.plist index.html icon.png *.js style.css license.txt fivecorners/
zip fivecorners.wgz fivecorners/*
rm -rf fivecorners

