# Grant Admin

Digunakna untuk menjadikan user menjadi admin.

**URL** : `/api/v1/auth/:id/grant-admin`

**Method** : `POST`

**Auth required** : YES

**Auth superadmin** : YES

**Data example** : -

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "status": 200,
    "message": "User has successfully granted as admin!",
    "data": {
        "verification": 1,
        "roles": [
            "6056cd754f892430703ef28e",
            "6056cd754f892430703ef28c"
        ],
        "created_at": "2021-04-12T07:59:45.483Z",
        "updated_at": "2021-04-12T07:59:45.483Z",
        "_id": "6073fe016037b85754bc94d1",
        "username": "halo3",
        "email": "renakaagusta28@gmail.com",
        "password": "$2a$08$VMe9aeyhMEsaU8mVEEUKW.ZbqXLUeaoNUUEW4NWnJUGG3tkHO29Se",
        "__v": 1
    }
}
```