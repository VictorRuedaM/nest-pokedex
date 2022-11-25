<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Nest Pokemon API

<p align="center">
  <a href="#" target="blank"><img src="https://camo.githubusercontent.com/90f24316b24433bf0a2778d95ca93ad264093645a71d2eb9f569cdbc34fbfc6d/68747470733a2f2f6372797374616c2d63646e322e6372797374616c636f6d6d657263652e636f6d2f70686f746f732f363333303536352f73706c61736842616e6e65725f706f6b656d6f6e2e6a7067" width="500" alt="Pokemon Logo" /></a>
</p>


## Run in development
1. Clone the repository
2. Run 
```
npm install 
```
3. Install Nest CLI
```
npm i -g @nestjs/cli
```
4. Lift the database using Docker
```
docker-compose up -d
```
5. Run data seed to load the DB
```
localhost:3000/api/v2/seed
```


## Used Stack
* NestJS
* MongoDB