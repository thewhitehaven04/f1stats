#!/bin/sh
echo 'VITE_API_ROOT_URL='$API_ROOT_URL | tee .env.production
echo '\nVITE_PRIVATE_API_ROOT_URL='$PRIVATE_API_ROOT_URL | tee -a .env.production