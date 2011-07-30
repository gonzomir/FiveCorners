#!/bin/sed -f
# Delete inline scripts in HTML
# by Milen Petrinski <gonzo@greatgonzo.net>

s/<!--.*-->//
/<script type="text\/javascript">/!b
:sc
/<\/script>/!{
	N
	bsc
}
s/<script type="text\/javascript">.*<\/script>//

