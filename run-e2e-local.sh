#!/bin/bash

docker-compose -f docker-compose.e2e.yaml up -d

# テスト実行
docker-compose -f docker-compose.e2e.yaml run --rm frontend_test sh -c 'sh e2e-entrypoint.sh && npm run e2e'

# テスト用DBのリセット
docker-compose -f docker-compose.e2e.yaml run --rm db mysql -h db -u root -p -e "DROP DATABASE react_router_v7_practice_test; CREATE DATABASE react_router_v7_practice_test;"
docker-compose -f docker-compose.e2e.yaml run --rm api_server_test sh -c 'cd db && godotenv -f /app/.env.test.local sql-migrate up -env="mysql"'
