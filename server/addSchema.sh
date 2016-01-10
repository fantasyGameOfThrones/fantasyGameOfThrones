#!/bin/bash
p=''
if [ "$1" = "-p" ]; then
  p='-p'
fi;

mysql -u root $p < ./db/schema.sql