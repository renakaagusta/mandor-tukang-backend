# Dokumentasi FIFA-Backend

API ini dikembangkan untuk memenuhi tugas bakti LAB B201. API ini mengolah dan menyediakan data yang  bersumber dari pemain - pemain yang ada di game FIFA 2021. Dikembangkan berbasis NodeJS [https server](https://nodejs.org/api/https.html), seluruh endpoint pada API ini memberikan response dalam format JSON [JSON](https://www.json.org/json-en.html). 

## Endpoint terbuka

Endpoint ini tidak memerlukan Autentikasi

* [SIGN IN](docs/auth/signin.md) : `POST /api/v1/auth/signin`
* [SIGN UP](docs/auth/signup.md) : `POST /api/v1/auth/signup`

## Endpoint yang memerlukan autentikasi

Endpoint ini memerlukan token yang valid yang diletakkan pada header dari request. Token didapatkan dari endpoint login. Token yang digunakan adalah JWT.

### Endpoint Privat

Endpoint ini memerlukan autentikasi, role sebagai admin, dan token sebagai super admin.

* [GET ALL USERS](docs/auth/getAll.md) : `POST /api/v1/auth`
* [MAKE ADMIN](docs/auth/makeAdmin.md) : `POST /api/v1/auth/:id/grant-admin`

### User related

* [CONFIRM EMAIL](docs/auth/confirmEmail.md) : `POST /api/v1/auth/:id/confirm-email`

### Player related

Endpoint yang berkaitan dengan data player. Setiap endpoint membutuhkan jwtToken

* [GET ALL PLAYERS](docs/player/getAll.md) : `GET /api/v1/player`
* [GET PLAYERS BY PAGE](docs/player/getPage.md) : `GET /api/v1/player`
* [GET PLAYER BY ID](docs/player/getId.md) : `GET /api/v1/player/:id`
* [CREATE PLAYER](docs/player/post.md) : `POST /api/v1/player`
* [UPDATE PLAYER](docs/player/put.md) : `PUT /api/v1/player/:id`
* [DELETE PLAYER](docs/player/delete.md) : `DELETE /api/v1/player/:id`


### Penggunaan Docker

[Docker](docs/docker.md)

### Dokumentasi POSTMAN

[Postman](docs/B201Baktilab.postman_collection.json)
