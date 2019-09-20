# LoopBack4-GraphQL-challenge

## 必須

- node.js

## セットアップ

`npm install pm2 -g`
`npm i -g openapi-to-graphql-cli`
`npm i`
`npm start`

# 前提

- cakephp はhttp://localhost:8082/で起動している

# openapi-to-graphql 起動

`openapi-to-graphql http://[::1]:3001/openapi.json -u http://[::1]:3001 --cors`

# graphql playground 起動

http://localhost:3001/withAnimation.html?endpoint=http://localhost:3000/graphql

# loopback + GraphQL に関して何か制限はないのか？

- 認証
  - basic 認証と api key 認証しかないよ
    - https://github.com/ibm/openapi-to-graphql/tree/master/packages/openapi-to-graphql#authentication
