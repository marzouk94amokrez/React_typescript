Les templates d'écrans servent définir la structuration des écrans à afficher u niveau de l'application. Suivant la spécification initiale, il existe deux templates d'écrans : 
  
- **`Templates d'écrans génériques`** : Servent à créer des définitions génériques pouvant afficher n'importe quel objet de l'application;
- **`Templates d'écrans spécifiques`** ou **`Ecrans de surcharges`** : Servent à définir des dispositions spécifiques pour certaines affichages spécifiques de certains objets;

Les templates à utiliser sont spécifiés dans la propriété **`type`** d'un élément de la propriété **`screens`** dans la définition des objets accessibles depuis `/definitions/{object}`.

### Structure des templates

Les templates ont généralement la définition suivante :

```json

{
  // Type du template à afficher
  "type": "template_type",
  // Liste des enfants du template
  "elements": [
    ...
  ]
  // Autres propriétés
  ...
}

```
