#!/bin/bash

docker exec payroll_demo /bin/sh -c "npm install -g mongo-seeding-cli && npm i @types/node && seed -u 'mongodb://mongodb:27017/payroll' --drop-database /usr/src/app/seed/data"
