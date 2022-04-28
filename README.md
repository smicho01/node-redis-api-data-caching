# node-redis-api-data-caching

Simple app to test Redis db API data caching

## Start Redis as Docker container

From the project root, run command `docker compose up -d`

## Run app

`node app.js`

#### Run Redis CLI within the container

`redis-cli`

#### Authenticate with the password (set in docker-composer.yml)

`AUTH jshdf43t67_ywdh+g432i7fywhefugvytf&*`

#### Check all existing cache keys

`keys *`

#### Evict all caches

`flushdb`
