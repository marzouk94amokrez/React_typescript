# Analyse API 0.4 demat

## `GET /definitions`

### Response

```json
{
  "success": "success",
  "data": [
    "users",
    "entities",
    "invoices",
    "extractions",
    "purchase_orders",
    "type"
  ],
  "message": ""
}
```

- Le champ `status` n'est pas présent dans le corps de la réponse.

## `GET /definitions/{object}`

- Le retour n'est pas uniforme. En cas de succès un champ `success` est présent dans la réponse alors que si l'objet n'existe pas, un champ `status` est retourné

### Définition d'objets individuels

### `GET /definitions/entities`

- Retour: OK. 
- Champs `monoval`: `type` et `status`
- La valeur `source` du champ `status` est `null`
  - `20230629` : l'accès à l'endpoint `definitions/type` retourne une erreur 500.

### `GET /definitions/invoices`

- Retour: OK.
- Champs `monoval`: `document_type`
- La valeur de la propriété `source` du champ `document_type` est `null`
- Pas de champ avec la propriété `status` égale à `true` (timeline)

### `GET /definitions/extractions`

- Retour: OK.
- Champs `monoval`: `document_type`

### `GET /definitions/type`

- `Internal server error`


### `GET /definitions/status`

Definition `undefined`

## `GET /objects`

- La structure des réponses n'est pas valide (tableau au lieu d'un objet avec champs `status`, `data`, `message`)

## `GET /objects/entities`

- Retour: `OK`
- La propriété `status` est marquée comme `monoval` dans les définitions mais une chaine est retournée à la place
- La propriété `type` est marquée comme `monoval` mais un entier est retourné à la place. Une requête `GET https://apidemat24.nopadema.dematrust.com/v0.4/objects/type` retourne

```json
{
    "status": "success",
    "data": {
        "records": [
            {
                "name": "owner"
            },
            {
                "name": "supplier"
            },
            {
                "name": "client"
            }
        ],
        "limit": 100,
        "offset": 0,
        "count": 3,
        "total_count": 3
    },
    "message": ""
}
```

Ce qui rend impossible/instable la correspondance entre l'entier et la liste retournée.
