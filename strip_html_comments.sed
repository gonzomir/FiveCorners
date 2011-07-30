#!/bin/sed -f
# Delete HTML comments
# i.e. everything between <!-- and -->
# by Stewart Ravenhall <stewart.ravenhall@ukonline.co.uk>

/<!--/!b
:a
/-->/!{
	N
	ba
}

s/<!--.*-->//
/<script type="text\/javascript">/!b
:sc
/<\/script>/!{
	N
	bsc
}
s/<script type="text\/javascript">.*<\/script>//

