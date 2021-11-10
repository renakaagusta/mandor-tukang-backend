# Delete User's Account

Hapus salah satu player sesuai dengan id yang diberikan. Endpoint ini memerlukan user dengan role admin.

**URL** : `/api/v1/player/:id`

**URL Parameters** : `id=[hex string]` dimana `id` adalah id dari data yang mau dihapus

**Method** : `DELETE`

**Auth required** : YES

**Data** : `{}`

## Success Response

**Kondisi** : Jika data ada

**Code** : `200 OK`

**Content** :

```json
{
    "status": 200,
    "message": "Player was deleted successfully",
    "data": null
}
```

## Error Responses

**Kondisi** : Jika data tidak ada

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "message": "Data Not Found"
}
```

> Atau

**Kondisi** : Ke [jwt.md](./jwt.md)

**Code** : Ke [jwt.md](./jwt.md)

**Content** : Ke [jwt.md](./jwt.md)
