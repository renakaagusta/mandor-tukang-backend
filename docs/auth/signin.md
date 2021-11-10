# Login

Digunakan untuk meng-autentikasi user, apabila berhasil maka akan diberikan response berupakan token yang digunakan untuk mengakses endpoint player

**URL** : `/api/v1/auth/signin`

**Method** : `POST`

**Auth required** : NO

**Data example** :

```json
{
    "username": "renakaagusta",
    "password": "renakaagusta"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "status": 200,
    "message": "Success Login!",
    "data": {
        "id": "6073dc7f2695b6100bf17bd8",
        "username": "renakaagusta",
        "verification": 0,
        "email": "renakaagusta28@gmail.com",
        "roles": [
            "user",
            "participant"
        ],
        "accessToken": "95fc881c0eeb286d639897f34c1bff506e676bb8350a1ec7fb80c777a393290ecb76bda94f1fc96e5fa889d2c3aba5909f09428ba2c44d7a6cfd063abcd70661e74ceef9b62ca6431e69e35b8ae27aea0b3389308ebfe8c26c00f31b37501f8e090e5105ed83dbaba988cf85c24df3207af4b5b78c54f2270dc149e6a6ba761893df0e2d28b76a469260d5777a3129b9cefe76f7d0385402ef8ca1072dc40ba40ce15c7f42e9562861fe69cfcc5b27a00ba821fcca6d20f48047c9432a5082518a5023c0fac08d56bee122896f753df9ceb37c2dfa69cc0e00c0a34c4e6efe02026e426852f57a33f8876e8a2a5dc607b6ad402d900c31e369e8cdacc252048a5fef87762998b03ebbcb58"
    }
}
```

## Error Response

**Kondisi** : Jika username atau sandi salah

**Code** : `404 UNAUTHORIZED`

**Content** :

```json
{
    "status": 404,
    "message": "User was not found!",
    "data": null
}
```
