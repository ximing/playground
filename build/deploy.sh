#!/bin/bash
cd dist
ls
git init
git add .
dateAndMonth=`date "+%b %Y"`
git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
git remote add origin https://ximing:${GH_TOKEN}@github.com/ximing/playground.git > /dev/null 2>&1
git checkout -b gh-pages
git push origin gh-pages --force
curl
curl -H "Content-Type:application/json" -X POST -d '{"token":"'"$DX_TOKEN"'", "text":"[playground] travis build success","id":"64011782718"}' https://mall.meituan.com/wx/service/dx/sendToGroup
