# Register

Digunakan untuk memverifikasi email user. Id yang digunakan parameter pada enpoint ini telah dienkripsi untuk menghindari hal-hal yang tidak dinginkan.

**URL** : `/api/v1/auth`

**Method** : `POST`

**Auth required** : NO

**Auth superadmin** : YES

**Data example** : -

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "status": 200,
    "message": "User Added Successfully",
    "data": [
        {
            "_id": "60571935c997d43830a03d65",
            "verification": 1,
            "roles": [
                "6056cd754f892430703ef28e",
                "6056cd754f892430703ef28c"
            ],
            "username": "admin",
            "email": "renakaagusta@gmail.com",
            "password": "$2a$08$rfDI9ttneWIPCtLEGFFKGu71oY78xrU4MGPHh0urhufAroGbsSzNW"
        },
        {
            "_id": "6073fe016037b85754bc94d1",
            "verification": 0,
            "roles": [
                "6056cd754f892430703ef28d",
                "6056cd754f892430703ef28c"
            ],
            "username": "halo3",
            "email": "renakaagusta28@gmail.com",
            "password": "$2a$08$VMe9aeyhMEsaU8mVEEUKW.ZbqXLUeaoNUUEW4NWnJUGG3tkHO29Se"
        }
    ]
}
```