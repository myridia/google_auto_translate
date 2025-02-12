#!/bin/bash
domain='*.translate.local'
_domain='_.translate.local'

rm $_domain  -Rf
./minica --domains $domain
cat ./$_domain/cert.pem ./$_domain/key.pem > ./$_domain/all.pem
cp ./$_domain/* ../etc/nginx/conf.d/certs/ -Rf
