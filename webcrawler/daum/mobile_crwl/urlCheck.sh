#!/bin/bash

export PATH=$PATH:/usr/local/bin

DMOBILE_SRCS=`ls /projects/GiantEagle/webcrawler/daum/mobile_crwl/*.in`

for src in $DMOBILE_SRCS
do
	while read line
	do
		tmp=`wget --spider -S $line 2>&1 | grep "HTTP/" | awk '{print $2}'`
		set -- $tmp
		IFS=" "; declare -a tokens=($*)
		echo length = ${#tokens[@]}
	done < $src
done
