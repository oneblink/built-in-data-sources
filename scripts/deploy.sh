#!/bin/bash

echo 'Starting deployment for environment' $1

echo 'Starting OneBlink Deployment'
export ONEBLINK_ACCESS_KEY=$OB_ACCESS_KEY
export ONEBLINK_SECRET_KEY=$OB_SECRET_KEY

npx oneblink api scope oneblink-data-sources.api.oneblink.io

npx oneblink api deploy --force --env $1
