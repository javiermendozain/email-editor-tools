#!/usr/bin/env sh

sh -c " 🔄Installing NPM"
npm install

sh -c "🔄🎯Building"
npm run build:"$SERVER"

sh -c "🔄Installing firebase"
npm install -g firebase-tools

sh -c "✅Deply to $SERVER"
firebase deploy -P "$SERVER" --token "$TOKEN"

