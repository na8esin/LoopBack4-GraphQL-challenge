# gaina_v2_api
## 必須
- node.js

## セットアップ
`npm install pm2 -g`
`npm i -g openapi-to-graphql-cli`
`npm i`
`npm start`

# 前提
- cakephpはhttp://localhost:8082/で起動している

# openapi-to-graphql起動
`openapi-to-graphql http://[::1]:3001/openapi.json -u http://[::1]:3001 --cors`

# graphql playground起動
http://localhost:3001/withAnimation.html?endpoint=http://localhost:3000/graphql