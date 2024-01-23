Les actions à afficher par écran seront renvoyées par le serveur en même temps que la disposition d'affichage de ces écrans.

### Structure de la liste des actions

La liste des actions à afficher sera recherchée dans la propriété **`actions`** de l'élément **`screens`** parent. L'entrée **`actions`** devra contenir les entrées:

- **`list`**: Objet contenant les actions disponibles pour l'écran en utilisant une identification unique pour chaque action;
- **`conditions`**: Liste des conditions d'affichage pour les actions. Si la condition est satisfaite alors l'action correspondante sera affichée si elle n'a pas déjà été sélectionnée par une condition précédente.

### Structure des actions

Chaque action est caractérisée par :

- Un identifiant unique pour l'action;
- Une des propriétés:
  - **`screen`** : Ayant comme valeur l'identifiant d'un écran de l'objet
  - **`endpoint`** Pointant vers un endpoint qui sera utilisé pour envoyer l'action, avec en option
    - Une propriété **`endpoint_method`** mentionnant la méthode HTTP à utiliser lors de l'envoi de l'action (par défaut **`POST`**);
- Un tableau de **`structure`** de la même forme que la **`structure`** des objets, permettant de définir les champs attendus par l'endpoint;
- Un objet **`elements`** permettant de définir la disposition des champs de l'action. Il a la même structuration que pour les **`screens`** des objets.

Exemple d'action vers écran:

```json
...
"validation": {
  "label": "Valider la facture",
  "type": "screen",
  "screen": "validation",
  "structure": [
    {
      "field_name": "commentaire",
      "field_type": "mediumtext",
      "changeable": true,
      "mandatory": false
    }
  ],
  "elements": [
    {
      "type": "separator_bloc",
      "elements": [
        {
          "type": "field",
          "label": "Commentaire",
          "field": "commentaire"
        }
      ]
    }
  ]
},
...
```

Exemple d'action avec endpoint:

```json
...
"demander_pieces_complementaires": {
  "label": "Demander des pièces complémentaires",
  "endpoint": "objects/object_endpoint/{uid}/action",
  "endpoint_method": "POST",
  "structure": [
    {
      ...
      "field_name": "documents",
      "field_type": "multival"
      ...
    },
    {
      ...
      "field_name": "commentaire",
      "field_type": "mediumtext",
      "required": true
      ...
    }
  ],
    "elements": [
      {
        "type": "separateur_bloc",
        "elements": [
          {
            "type": "field",
            "field": "documents"
          },
          {
            "type": "field",
            "field": "commentaire"
          }
        ]
      }
    ]
},
...
```

### Structure des conditions

Chaque entrée de condition pourra être composée :

- D'une liste (facultative) des **`habilitations`** nécessaires à l'utilisateur pour pouvoir afficher l'action;
- D'un objet **`fields`** contenant les champs sur lesquels des tests de comparaisons seront effectués. La condition sera satisfaite s'il y a une correspondance entre la valeur du champ et la valeur mise en paramètre. Il est possible d'utiliser des valeurs de la forme **`{champ_objet}`**, qui sera remplacée par la valeur du champ correspondant dans l'objet en cours. Ceci permettra de comparer des champs entre eux;
- D'une entrée **`action`** à ajouter si toutes les conditions sont vraies.

Tous les éléments d'une conditions doivent être évalués à **`vrai`** pour que la condition soit vraie (opérateur **`ET`**).

Exemple de condition:

```json
{

  /**
   * @type array : Liste des droits d'accès à tester
   */
  "rights": ["can_perform_action"],
  /**
   * @type object : Liste des champs ainsi que les valeurs qu'ils doivent avoir. Eventuellement un opérateur pourra être utilisé
   */
  "fields": {
    /**
     * @type array | string|int|boolean|{object_field} : Valeur de l'élément à tester ou nom de champ de l'objet à évaluer
     */
    "object_field": ["=", "field_value"],
    "object_field": ["<", "{object_field}"],
  },
  /**
   * @type: action_id : identifiant de l'action à rajouter
   */
  "action": "action_to_add"
}
```

Exemple de définitions d'actions :

```json
{
    // Propriétés de l'objet
    "screens": {
        ... // Autres écrans de l'objet
        "consult": {
            "type": "surcharge_suivi_referencement",
            "actions": {
                "list": {
                    "demander_pieces_complementaires": {
                        "label": "Demander des pièces complémentaires",
                        "endpoint": "objects/object_endpoint/{uid}/action",
                        "endpoint_method": "POST",
                        "structure": [
                            {
                                "field_name": "documents",
                                "field_type": "multival"
                            },
                            {
                                "field_name": "commentaire",
                                "field_type": "mediumtext",
                                "required": true
                            }
                        ],
                        "elements": [
                            {
                                "type": "separateur_bloc",
                                "elements": [
                                    {
                                        "type": "field",
                                        "field": "documents"
                                    },
                                    {
                                        "type": "field",
                                        "field": "commentaire"
                                    }
                                ]
                            }
                        ]
                    },
                    "refuser_demande": {
                        "label": "Refuser la demande de référencement",
                        "endpoint": "objects/referencing/{uid}/action",
                        "endpoint_method": "POST",
                        "requires": ["can_act"],
                        "structure": [
                            {
                                "field_name": "commentaire",
                                "field_type": "mediumtext"
                            }
                        ],
                        "elements": [
                            {
                                "type": "separateur_bloc",
                                "elements": [
                                    {
                                        "type": "field",
                                        "field": "commentaire"
                                    }
                                ]
                            }
                        ]
                    },
                    "accepter_demande": {
                        "label": "Accepter la demande de référencement",
                        "endpoint": "objects/referencing/{uid}/action",
                        "endpoint_method": "POST",
                        "requires": ["can_act"],
                        "structure": [
                            {
                                "field_name": "commentaire",
                                "field_type": "mediumtext"
                            }
                        ],
                        "elements": [
                            {
                                "type": "separateur_bloc",
                                "elements": [
                                    {
                                        "type": "field",
                                        "field": "commentaire"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "conditions": [
                    {
                        "rights": ["can_act"],
                        "action": "demander_pieces_complementaires"
                    },
                    {
                        "fields": {
                            "status_code": ["=", "OBJECT_STATUS_PENDING"]
                        },
                        "action": "demander_pieces_complementaires"
                    }
                ]
            },
            "elements": []
        },
        ...
    }
}
```

