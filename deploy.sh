#!/usr/bin/env sh

# stop publication on error
set -e

# build app
pnpm run build

# open dist directory
cd dist

# repository init
git init
git checkout -b gh-pages
git add .
git commit -m 'deploy'

git push -f git@github.com:Alaladdin/vue-app-init.git gh-pages

cd ../
