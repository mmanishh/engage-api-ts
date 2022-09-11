# Engage REST API using Typescript

## Clone Repo

clone this repo with `https` / `ssh` / `github cli`

```sh
git clone https://github.com/mmanishh/engage-api.git
```

After cloning this repo, make sure you have `duplicated` the `.env.local` file to `.env`, don't let the .env.example file be deleted or renamed.

```sh
cp .env.local .env
```

Update your DB configs in  ``.env`` file

## Install Dependencies

```sh
npm install
```

## Bootstrap DB

To create database run: 
```sh
npm run db:reset
```

## Start Server

```sh
npm run start
```

## Features Implemented

- CRUD API for Employees, Companies 
- Use of DB transactions when creating employee along with company payload
- Basic payload validaiton for all methods for all entities

## TODO

- Basic JWT Authentication
- Register and Login user
- CRUD for user
- Tests
- Dockerization of app
