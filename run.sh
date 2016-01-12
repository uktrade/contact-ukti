#!/bin/sh

cp -r /app/public/* /public/
exec npm start
