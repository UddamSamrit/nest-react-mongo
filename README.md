# Nest-Next-Mongo
## Author Samrit Uddam

## Install

```bash
https://github.com/UddamSamrit/nest-react-mongo.git
cd nest-react-mongo  
```
```bash
docker compose up -d  
```

## Back end 
- Use with Nest js build on top Express.js

```bash
cd back-end-nest
```
or 
```bash
docker exec -it back-end-nest /bin/bash
```
create .env

```bash
APP_URL=http://localhost:3001
JWT_SECRET=9693ebac8b30c2e796bc9324da8c3797588c53a8e4eadce2c872feee02b82e1a
JWT_EXPIRATION_TIME=15m
REFRESH_SECRET=9693ebac8b30c2e796bc9324da8c3797588c53a8e4eadce2c872feee02b82e1a
REFRESH_EXPIRATION_TIME=7d
```


## Front end
- Use with Next.js build on top React
