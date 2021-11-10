# Register

Digunakan untuk mendaftarkan user baru, password akan di hash menggunakan HMAC-SHA256 kemudian di enkripsi menggunakan bcrypt.

**URL** : `/api/v1/auth/register`

**Method** : `POST`

**Auth required** : NO

**Data example** :

```json
{
    "username": "renaka",
    "email": "renakaagusta@gmail.com",
    "password": "renaka"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "status": 200,
    "message": "User was registered successfully!",
    "data": null
}
```

## Error Response

**Kondisi** : Jika username yang diberikan sudah terdaftar

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "message": "This username has been used",
    "data": null
}
```
> Atau

**Kondisi** : Jika email yang diberikan sudah terdaftar

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "message": "This email has been used",
    "data": null
}
```
