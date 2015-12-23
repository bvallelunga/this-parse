#!/bin/bash

if [ -z "$1" ]; then
  parse deploy
else
  for var in "$@"; do
    if [ "$var" == "all" ]; then
      parse deploy debug
      parse deploy release
    else
      parse deploy $var
    fi
  done
fi
