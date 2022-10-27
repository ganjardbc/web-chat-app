#!/usr/bin/env sh

# abort on errors
set -e

# remove folder
rm -rf dist/
rm -rf docs/

# build
npm run build

# rename folder from dist to docs
mv dist/ docs/

# navigate into the build output directory
# cd docs

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# git init
git add docs/*
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:ganjardbc/Sajiin-UI.git main:gh-pages

# cd ..

git push origin master