#!/bin/sh

exec npm start &
exec nginx
