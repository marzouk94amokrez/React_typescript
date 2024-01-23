# Analyse API 0.5 demat : Problèmes pouvant empêcher l'API de marcher correctement avec le client

## Authentification

### Conséquence

Impossibilité de se connecter à l'API

### Problème

Il faudrait une petite documentation ou des informations permettant de connaître les paramètres de connexion au serveur d'authentification. Il a été convenu que l'application allait se connecter sur un serveur d'authentification oauth/openid avec le flux "Authorization Code + PKCE". De ce fait l'application a besoin des propriétés:

```env
REACT_APP_CLIENT_ID=
REACT_APP_AUTHORIZATION_ENDPOINT=
REACT_APP_LOGOUT_ENDPOINT=
REACT_APP_TOKEN_ENDPOINT=
REACT_APP_SCOPE=[]
```

## Définition des objets

### Champs monoval

#### Conséquence

Les champs ne vont pas s'afficher correctement sur l'interface. ex impossibilité d'afficher les `monoval` ou de les éditer.

#### Problème

Certaines propriétés des champs ne sont pas renseignés correctement. Les champs "monoval/multival" doivent avoir les propriétés (propriété `source` du champ `channel` des `entities`, propriété `source` du champ `document_type` des `invoices`):

- **source** : Cette propriété doit contenir l'endpoint servant à charger les résultats à afficher dans la liste
- **value_field** : Cette propriété est optionnelle. Elle renseigne le nom du champ de l'objet lié à utiliser comme clé. Elle doit être renseignée si sa valeur est différente de la propriété renseignée sur la variable **`OBJECTS_ID_FIELD`**. Cette propriété permet d'éviter l'interrogation de la définition de l'objet lié lors de l'affichage de ses valeurs mais aussi de paramétrer une propriété différente par liaison.
- **title_field** : Cette propriété est optionnelle. Elle renseigne le nom du champ de l'objet lié à utiliser comme libellé sur la liste. Elle doit être renseignée si sa valeur est différente de **`name`**

#### Détails

- `definitions/entities`:
  - La propriété `source` du champ `channel` est `NULL`
  - La propriété `source` du champ `status` est `NULL`
- `definitions/invoices`:
  - La propriété `source` du champ `document_type` est `NULL`

### Champs process

#### Conséquence

La zone timeline ne sera pas affichée.

#### Problème

Aucun champ process n'est présent sur les objets, limitant l'affichage des `statuts` et des `timelines`.


#### Détail

En l'état le client attend un objet de la forme ci après pour afficher les `statuts` et `timeline` :

```json
{
  ...
  "steps": {
    "INVOICE_REJECTED": {
      "id": "INVOICE_REJECTED",
      "name": "Rejetée",
      "external": "Rejetée",
      "status": "INVOICE_REJECTED",
      "color": "#E0F2FE",
      "auto": true,
      "mandatory": true
    },
    "INVOICE_RECEIVED": {
      "id": "INVOICE_RECEIVED",
      "name": "Réceptionnée",
      "external": "Pris en charge",
      "status": "INVOICE_RECEIVED",
      "color": "#A5B4FC",
      "auto": true,
      "mandatory": true
    },
  },
  "workflow" : {
    "steps": [
      {
        "date": "2023-06-20T08:48:25+00:00",
        "step": "INVOICE_REJECTED"
      },
      {
        "date": null,
        "step": "INVOICE_RECEIVED"
      }
    ]
  }
  ...
}
```

- La propriété **`steps`** liste toutes les étapes du workflow ainsi que leurs propriétés

- La propriété **`workflow`** détaille le processus.
  - **`steps`** liste les étapes visités avec une date de visite optionnelle. L'étape courante sera la dernière étape avec une date de visite

## Api des objets

### Paramètres Api de liste

#### Conséquence

Les listes ne vont pas s'afficher correctement.

#### Problème

Il n'y a pas de documentation disponible sur les Api de liste, limitant le passage des paramètres de filtrage et de tri.

#### Détail

L'application envoie les paramètres de filtrage et de tri sou la forme `[URL_SERVEUR]?quicksearch=QUICKSEARCH&filters[CHAMP1]=VALEUR_CHAMP1&filters[CHAMP2]=VALEUR_CHAMP2&sort[CHAMP_TRI]=ORDRE_TRI`

La disponibilité de la documentation va nécessiter la modification du client sur l'envoi des paramètres.

### Retour API de liste

#### Conséquence

Impossible de savoir si le nombre de données dans une liste est supérieur à 10

#### Problème

Certaines listes `monoval` nécessitent un test pour savoir si les champs acceptent la saisie ou pas. Il n'est pas possible d'avoir cette information depuis la liste des résultats.

#### Détail

Le client actuel dépend d'une propriété `has_more` pour connaitre s'il y a plus de résultats de données que ce qui a été retournée.

### Api de création/sauvegarde

#### Conséquence

Fonctionnalité de sauvegarde/création non fonctionnelle.

#### Problème

Pas de documentation disponible sur les structure des objets à renvoyer lors de l'appel aux API de création/sauvegarde

#### Détail

Le client envoie au serveur des données de la forme ci après lors des créations, sauvegardes.

```json

{
  "data": {
    "CHAMP_1": "VALEUR_CHAMP_1",
    "CHAMP_2": "VALEUR_CHAMP_2"
  }
}

```

La disponibilité de la documentation va nécessiter la modification du client sur l'envoi des paramètres.
