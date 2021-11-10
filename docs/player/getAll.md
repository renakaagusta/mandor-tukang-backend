# Show All Data

Memberikan response berupa seluruh data pemain namun dengan field terbatas

**URL** : `/api/v1/player`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : `{}`

## Success Responses

**Kondisi** : User dapat melihat semua player

**Code** : `200 OK`

**Content** :

```json
{
    "status": 200,
    "message": "Player Added Successfully",
    "data": [
        {
            "_id": "6052cc4189999e12d56a4771",
            "ID": "27",
            "Name": "J. Cole",
            "Nationality": "England",
            "Club": "Coventry City"
        },
        {
            "_id": "6052cc4189999e12d56a4777",
            "ID": "244",
            "Name": "G. Neville  B",
            "Nationality": "England",
            "Club": "Manchester United"
        },
        {
            "_id": "6052cc4189999e12d56a4778",
            "ID": "246",
            "Name": "P. Scholes",
            "Nationality": "England",
            "Club": "Manchester United"
        },
        {
            "_id": "6052cc4189999e12d56a4779",
            "ID": "249",
            "Name": "P. Neville",
            "Nationality": "England",
            "Club": "Everton"
        },
        {
            "_id": "6052cc4189999e12d56a477a",
            "ID": "250",
            "Name": "D. Beckham",
            "Nationality": "England",
            "Club": null
        },
        {
            "_id": "6052cc4189999e12d56a477b",
            "ID": "330",
            "Name": "R. Keane",
            "Nationality": "Republic of Ireland",
            "Club": "LA Galaxy"
        },
        {
            "_id": "6052cc4189999e12d56a477c",
            "ID": "388",
            "Name": "S. Campbell",
            "Nationality": "England",
            "Club": "Newcastle United"
        },
        {
            "_id": "6052cc4189999e12d56a477d",
            "ID": "488",
            "Name": "O. Kahn",
            "Nationality": "Germany",
            "Club": "FC Bayern München"
        },
        {
            "_id": "6052cc4189999e12d56a477e",
            "ID": "496",
            "Name": "D. Hamann",
            "Nationality": "Germany",
            "Club": "Milton Keynes Dons"
        },
        {
            "_id": "6052cc4189999e12d56a477f",
            "ID": "570",
            "Name": "A. Okocha",
            "Nationality": "Nigeria",
            "Club": "Hull City"
        },
        {
            "_id": "6052cc4189999e12d56a4780",
            "ID": "670",
            "Name": "Zulu",
            "Nationality": "Brazil",
            "Club": "Pohang Steelers"
        },
        {
            "_id": "6052cc4189999e12d56a4781",
            "ID": "684",
            "Name": "M. Schwarzer",
            "Nationality": "Australia",
            "Club": "Leicester City"
        },
        {
            "_id": "6052cc4189999e12d56a4782",
            "ID": "805",
            "Name": "J. Lehmann",
            "Nationality": "Germany",
            "Club": "VfB Stuttgart"
        },
        {
            "_id": "6052cc4189999e12d56a4783",
            "ID": "1001",
            "Name": "G. Király",
            "Nationality": "Hungary",
            "Club": "Hungary"
        },
        {
            "_id": "6052cc4189999e12d56a4784",
            "ID": "1040",
            "Name": "Roberto Carlos",
            "Nationality": "Brazil",
            "Club": "FC Anzhi Makhachkala"
        },
        {
            "_id": "6052cc4189999e12d56a4785",
            "ID": "1041",
            "Name": "J. Zanetti",
            "Nationality": "Argentina",
            "Club": "Inter"
        },
        {
            "_id": "6052cc4189999e12d56a4786",
            "ID": "1075",
            "Name": "A. Del Piero",
            "Nationality": "Italy",
            "Club": "Sydney FC"
        },
        {
            "_id": "6052cc4189999e12d56a4787",
            "ID": "1088",
            "Name": "A. Nesta",
            "Nationality": "Italy",
            "Club": "Montreal Impact"
        },
        {
            "_id": "6052cc4189999e12d56a4788",
            "ID": "1109",
            "Name": "P. Maldini",
            "Nationality": "Italy",
            "Club": "Milan"
        },
        {
            "_id": "6052cc4189999e12d56a4789",
            "ID": "1179",
            "Name": "G. Buffon",
            "Nationality": "Italy",
            "Club": "Juventus"
        },
        {
            "_id": "6052cc4189999e12d56a478a",
            "ID": "1183",
            "Name": "F. Cannavaro",
            "Nationality": "Italy",
            "Club": "Juventus"
        },
        {
            "_id": "6052cc4189999e12d56a478b",
            "ID": "1186",
            "Name": "Couto",
            "Nationality": "Portugal",
            "Club": "Parma"
        },
        {
            "_id": "6052cc4189999e12d56a478c",
            "ID": "1198",
            "Name": "F. Inzaghi",
            "Nationality": "Italy",
            "Club": "Milan"
        },
        {
            "_id": "6052cc4189999e12d56a478d",
            "ID": "1219",
            "Name": "C. Abbiati",
            "Nationality": "Italy",
            "Club": "Milan"
        },
        {
            "_id": "6052cc4189999e12d56a478e",
            "ID": "1222",
            "Name": "Marco Paulo",
            "Nationality": "Portugal",
            "Club": "CF Estrela da Amadora"
        },
        {
            "_id": "6052cc4189999e12d56a478f",
            "ID": "1238",
            "Name": "F. Totti",
            "Nationality": "Italy",
            "Club": "Roma"
        },
        {
            "_id": "6052cc4189999e12d56a4790",
            "ID": "1256",
            "Name": "C. Seedorf",
            "Nationality": "Netherlands",
            "Club": "Botafogo"
        },
        {
            "_id": "6052cc4189999e12d56a4791",
            "ID": "1419",
            "Name": "P. Vieira",
            "Nationality": "France",
            "Club": "Manchester City"
        },
        {
            "_id": "6052cc4189999e12d56a4792",
            "ID": "1615",
            "Name": "L. Thuram",
            "Nationality": "France",
            "Club": "FC Barcelona"
        },
        {
            "_id": "6052cc4189999e12d56a4793",
            "ID": "1625",
            "Name": "T. Henry",
            "Nationality": "France",
            "Club": null
        },
        {
            "_id": "6052cc4189999e12d56a4794",
            "ID": "1668",
            "Name": "C. Makélelé",
            "Nationality": "France",
            "Club": "Paris Saint-Germain"
        },
        {
            "_id": "6052cc4189999e12d56a4795",
            "ID": "1747",
            "Name": "G. Coupet",
            "Nationality": "France",
            "Club": "Paris Saint-Germain"
        },
        {
            "_id": "6052cc4189999e12d56a4796",
            "ID": "1845",
            "Name": "O. Solskjær",
            "Nationality": "Norway",
            "Club": "Manchester United"
        },
        {
            "_id": "6052cc4189999e12d56a4797",
            "ID": "2062",
            "Name": "L. Bowyer",
            "Nationality": "England",
            "Club": "Ipswich Town"
        },
        {
            "_id": "6052cc4189999e12d56a4798",
            "ID": "2147",
            "Name": "M. Stekelenburg",
            "Nationality": "Netherlands",
            "Club": "Ajax"
        },
        {
            "_id": "6052cc4189999e12d56a4799",
            "ID": "2148",
            "Name": "H. Trabelsi",
            "Nationality": "Tunisia",
            "Club": "Manchester City"
        },
        {
            "_id": "6052cc4189999e12d56a479a",
            "ID": "2196",
            "Name": "R. Weidenfeller",
            "Nationality": "Germany",
            "Club": "Borussia Dortmund"
        },
        {
            "_id": "6052cc4189999e12d56a479b",
            "ID": "2231",
            "Name": "E. Heskey",
            "Nationality": "England",
            "Club": "Bolton Wanderers"
        },
        {
            "_id": "6052cc4189999e12d56a479c",
            "ID": "2492",
            "Name": "Eliseu",
            "Nationality": "Portugal",
            "Club": "SL Benfica"
        },
        {
            "_id": "6052cc4189999e12d56a479d",
            "ID": "2651",
            "Name": "S. Given",
            "Nationality": "Republic of Ireland",
            "Club": "Stoke City"
        },
        {
            "_id": "6052cc4189999e12d56a479e",
            "ID": "2702",
            "Name": "K. Ellison",
            "Nationality": "England",
            "Club": "Newport County"
        },
        {
            "_id": "6052cc4189999e12d56a479f",
            "ID": "2837",
            "Name": "R. Delap",
            "Nationality": "Republic of Ireland",
            "Club": "Burton Albion"
        },
        {
            "_id": "6052cc4189999e12d56a47a0",
            "ID": "2956",
            "Name": "S. Petrov",
            "Nationality": "Bulgaria",
            "Club": "Aston Villa"
        },
        {
            "_id": "6052cc4189999e12d56a47a1",
            "ID": "3281",
            "Name": "Tarantini",
            "Nationality": "Portugal",
            "Club": "Rio Ave FC"
        },
        {
            "_id": "6052cc4189999e12d56a47a2",
            "ID": "3395",
            "Name": "S. Wright-Phillips",
            "Nationality": "England",
            "Club": "New York Red Bulls"
        },
        {
            "_id": "6052cc4189999e12d56a47a3",
            "ID": "3467",
            "Name": "Yuri",
            "Nationality": "Brazil",
            "Club": "SD Ponferradina"
        },
        {
            "_id": "6052cc4189999e12d56a47a4",
            "ID": "3484",
            "Name": "J. O'Shea",
            "Nationality": "Republic of Ireland",
            "Club": "Reading"
        },
        {
            "_id": "6052cc4189999e12d56a47a5",
            "ID": "3622",
            "Name": "Ricardo Carvalho",
            "Nationality": "Portugal",
            "Club": "Portugal"
        },
        {
            "_id": "6052cc4189999e12d56a47a6",
            "ID": "3647",
            "Name": "M. Ballack",
            "Nationality": "Germany",
            "Club": "Bayer 04 Leverkusen"
        },
        {
            "_id": "6052cc4189999e12d56a47a7",
            "ID": "3712",
            "Name": "Dida",
            "Nationality": "Brazil",
            "Club": "Internacional"
        },
        {
            "_id": "6052cc4189999e12d56a47a8",
            "ID": "3922",
            "Name": "B. Schneider",
            "Nationality": "Germany",
            "Club": "Bayer 04 Leverkusen"
        },
        {
            "_id": "6052cc4189999e12d56a47a9",
            "ID": "4077",
            "Name": "Simão",
            "Nationality": "Portugal",
            "Club": "RCD Espanyol"
        },
        {
            "_id": "6052cc4189999e12d56a47aa",
            "ID": "4114",
            "Name": "A. Radomski",
            "Nationality": "Poland",
            "Club": "Cracovia"
        },
        {
            "_id": "6052cc4189999e12d56a47ab",
            "ID": "4202",
            "Name": "G. Gattuso",
            "Nationality": "Italy",
            "Club": "FC Sion"
        },
        {
            "_id": "6052cc4189999e12d56a47ac",
            "ID": "4233",
            "Name": "C. Reyna",
            "Nationality": "United States",
            "Club": "New York Red Bulls"
        },
        {
            "_id": "6052cc4189999e12d56a47ad",
            "ID": "5003",
            "Name": "Cafu",
            "Nationality": "Brazil",
            "Club": "Milan"
        },
        {
            "_id": "6052cc4189999e12d56a47ae",
            "ID": "5203",
            "Name": "M. Oddo B",
            "Nationality": "Italy",
            "Club": "Lecce"
        },
        {
            "_id": "6052cc4189999e12d56a47af",
            "ID": "5231",
            "Name": "B. Mendy",
            "Nationality": "France",
            "Club": "Stade Brestois 29"
        },
        {
            "_id": "6052cc4189999e12d56a47b0",
            "ID": "5419",
            "Name": "M. Owen",
            "Nationality": "England",
            "Club": "Stoke City"
        },
        {
            "_id": "6052cc4189999e12d56a47b1",
            "ID": "5459",
            "Name": "M. Bagayoko",
            "Nationality": "Mali",
            "Club": "Doncaster Rovers"
        },
        {
            "_id": "6052cc4189999e12d56a47b2",
            "ID": "5467",
            "Name": "J. Carragher",
            "Nationality": "England",
            "Club": "Liverpool"
        },
        {
            "_id": "6052cc4189999e12d56a47b3",
            "ID": "5471",
            "Name": "F. Lampard",
            "Nationality": "England",
            "Club": "New York City FC"
        },
        {
            "_id": "6052cc4189999e12d56a47b4",
            "ID": "5479",
            "Name": "Casillas",
            "Nationality": "Spain",
            "Club": "FC Porto"
        },
        {
            "_id": "6052cc4189999e12d56a47b5",
            "ID": "5589",
            "Name": "Figo",
            "Nationality": "Portugal",
            "Club": "Inter"
        },
        {
            "_id": "6052cc4189999e12d56a47b6",
            "ID": "5672",
            "Name": "E. Davids",
            "Nationality": "Netherlands",
            "Club": "Barnet"
        },
        {
            "_id": "6052cc4189999e12d56a47b7",
            "ID": "5673",
            "Name": "J. Litmanen",
            "Nationality": "Finland",
            "Club": "Finland"
        },
        {
            "_id": "6052cc4189999e12d56a47b8",
            "ID": "5680",
            "Name": "P. Kluivert",
            "Nationality": "Netherlands",
            "Club": "LOSC Lille"
        },
        {
            "_id": "6052cc4189999e12d56a47b9",
            "ID": "5740",
            "Name": "J. Stam",
            "Nationality": "Netherlands",
            "Club": "Ajax"
        },
        {
            "_id": "6052cc4189999e12d56a47ba",
            "ID": "5744",
            "Name": "E. Gudjohnsen",
            "Nationality": "Iceland",
            "Club": "Molde FK"
        },
        {
            "_id": "6052cc4189999e12d56a47bb",
            "ID": "5809",
            "Name": "N. Anelka",
            "Nationality": "France",
            "Club": "West Bromwich Albion"
        },
        {
            "_id": "6052cc4189999e12d56a47bc",
            "ID": "5879",
            "Name": "A. Gilardino",
            "Nationality": "Italy",
            "Club": "Spezia"
        },
        {
            "_id": "6052cc4189999e12d56a47bd",
            "ID": "5984",
            "Name": "D. Trezeguet",
            "Nationality": "France",
            "Club": "Newell's Old Boys"
        },
        {
            "_id": "6052cc4189999e12d56a47be",
            "ID": "6083",
            "Name": "M. Jankulovski",
            "Nationality": "Czech Republic",
            "Club": "Milan"
        },
        {
            "_id": "6052cc4189999e12d56a47bf",
            "ID": "6235",
            "Name": "P. Nedved",
            "Nationality": "Czech Republic",
            "Club": "Juventus"
        },
        {
            "_id": "6052cc4189999e12d56a47c0",
            "ID": "6826",
            "Name": "G. Barry",
            "Nationality": "England",
            "Club": "West Bromwich Albion"
        },
        {
            "_id": "6052cc4189999e12d56a47c1",
            "ID": "6908",
            "Name": "D. Stanković",
            "Nationality": "Serbia",
            "Club": "Inter"
        },
        {
            "_id": "6052cc4189999e12d56a47c2",
            "ID": "6975",
            "Name": "F. Ljungberg",
            "Nationality": "Sweden",
            "Club": "Celtic"
        },
        {
            "_id": "6052cc4189999e12d56a47c3",
            "ID": "7142",
            "Name": "K. Kaladze",
            "Nationality": "Georgia",
            "Club": "Genoa"
        },
        {
            "_id": "6052cc4189999e12d56a47c4",
            "ID": "7289",
            "Name": "R. Ferdinand",
            "Nationality": "England",
            "Club": "Queens Park Rangers"
        }
    ]
}
```

## Error Response

**Kondisi** : Ke [jwt.md](./jwt.md)

**Code** : Ke [jwt.md](./jwt.md)

**Content** : Ke [jwt.md](./jwt.md)
