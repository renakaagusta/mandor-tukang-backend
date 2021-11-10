# Show All Data

Memberikan data sesuai dengan id yang diberikan.

**URL** : `/api/v1/player/:id`

**URL Parameters** : `id=[hex string]` dimana `id` adalah ID dari data.

**Method** : `GET`

**Auth required** : YES

**Data constraints** : `{}`

## Success Responses

**Kondisi** : User dapat melihat detail dari player sesuai dengan id yang diberikan

**Code** : `200 OK`

**Content** :

```json
{
    "status": 200,
    "message": "player Detail Loading...",
    "data": [
        {
            "updated_at": "2021-04-12T09:24:26.899Z",
            "_id": "6052cc4189999e12d56a4771",
            "ID": "27",
            "Name": "J. Cole",
            "Age": "33",
            "OVA": "71",
            "Nationality": "England",
            "Club": "Coventry City",
            "BOV": "71",
            "BP": "CAM",
            "Position": "CAM RM RW LM",
            "Player Photo": "https://cdn.sofifa.com/players/000/027/16_120.png",
            "Club Logo": "https://cdn.sofifa.com/teams/1800/light_60.png",
            "Flag Photo": "https://cdn.sofifa.com/flags/gb-eng.png",
            "POT": "71",
            "Team & Contract": "Coventry City 2016 ~ 2020",
            "Height": "5'9\"",
            "Weight": "161lbs",
            "foot": "Right",
            "Growth": "0",
            "Joined": "Jan 7, 2016",
            "Loan Date End": null,
            "Value": "€1.1M",
            "Wage": "€15K",
            "Release Clause": "€0",
            "Contract": "2016 ~ 2020",
            "Attacking": "337",
            "Crossing": "80",
            "Finishing": "64",
            "Heading Accuracy": "41",
            "Short Passing": "77",
            "Volleys": "75.0",
            "Skill": "387",
            "Dribbling": "79",
            "Curve": "84.0",
            "FK Accuracy": "77",
            "Long Passing": "69",
            "Ball Control": "78",
            "Movement": "295",
            "Acceleration": "48",
            "Sprint Speed": "42",
            "Agility": "71.0",
            "Reactions": "59",
            "Balance": "75.0",
            "Power": "284",
            "Shot Power": "72",
            "Jumping": "58.0",
            "Stamina": "29",
            "Strength": "56",
            "Long Shots": "69",
            "Mentality": "317",
            "Aggression": "69",
            "Interceptions": "39.0",
            "Positioning": "69.0",
            "Vision": "74.0",
            "Penalties": "66",
            "Composure": null,
            "Defending": "99",
            "Marking": "35",
            "Standing Tackle": "34",
            "Sliding Tackle": "30.0",
            "Goalkeeping": "51",
            "GK Diving": "9",
            "GK Handling": "6",
            "GK Kicking": "13",
            "GK Positioning": "16",
            "GK Reflexes": "7",
            "Total Stats": "1770",
            "Base Stats": "354",
            "W/F": "4 ★",
            "SM": "4★",
            "A/W": "Medium",
            "D/W": "Low",
            "IR": "2 ★",
            "PAC": "45",
            "SHO": "68",
            "PAS": "76",
            "DRI": "77",
            "DEF": "36",
            "PHY": "52",
            "Hits": "11",
            "LS": "64+0",
            "ST": "64+0",
            "RS": "64+0",
            "LW": "70+0",
            "LF": "69+0",
            "CF": "69+0",
            "RF": "69+0",
            "RW": "70+0",
            "LAM": "71+0",
            "CAM": "71+0",
            "RAM": "71+0",
            "LM": "68+0",
            "LCM": "66+0",
            "CM": "66+0",
            "RCM": "66+0",
            "RM": "68+0",
            "LWB": "52+0",
            "LDM": "54+0",
            "CDM": "54+0",
            "RDM": "54+0",
            "RWB": "52+0",
            "LB": "47+0",
            "LCB": "46+0",
            "CB": "46+0",
            "RCB": "46+0",
            "RB": "47+0",
            "GK": "15+0",
            "Gender": "Male"
        }
    ]
}
```

## Error Response

**Kondisi** : Ke [jwt.md](./jwt.md)

**Code** : Ke [jwt.md](./jwt.md)

**Content** : Ke [jwt.md](./jwt.md)

> Atau

**Kondisi** : Jika player tidak ditemukan

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "message": "Data Not Found"
}
```
