/**
 * Represents a field of a particular model
 */
export interface ModelField {
  field?: string; // : nom du champ dans la table en BDD
  field_name?: string; // : nom du champ dans la table en BDD
  code?: string; // : code d'usage du champ (pour faciliter la lecture des développements)
  type?: string; // : type du champ
  listable?: string | boolean; // : Si "true", Visible dans la liste
  order_list?: string | number; // Ordre d’affichage dans la liste (Tableau ou Blocs)
  hiddable?: string | boolean; // Colonne correspondante masquable dans la liste en tableau
  exportable?: string | boolean; // : Si "true", le champ sera visible dans l'export CSV ou PDF
  picto?: string;
  viewable?: string | boolean; // : Si "true", Visible dans la consultation
  order_detail?: string | number; // Ordre d’affichage dans la liste (Tableau ou Blocs)
  title?: string | boolean; // Identifié comme titre de l’objet (Un seul possible)
  titlebis?: string | boolean; // Identifié comme complément de titre de l’objet (plusieurs possibles)
  subtitle?: string | boolean; // Identifiés comme sous-titre l’objet (plusieurs possibles)X
  header?: string | boolean; // Identifiés comme devant apparaître dans le header (plusieurs possibles)
  editable?: string | boolean; // : Si "true", Visible dans l'édition
  changeable?: string | boolean; // Modifiable en édition
  position?: string; // Position à gauche ou à droite de la page (Utile pour d’autres templates, non utilisée dans ce template)
  mandatory?: string | boolean; // :  Si "true", champ obligatoire, appliquer un contrôle JS à la validation du formulaire d'édition/création
  amount?: string | boolean; // Indique que le champ est un montant et qu’il faut aller chercher l’information de devise quelque part pour afficher le couple Montant+Devise (récupération de la devise via le champ identifié avec la propriété « devise »)
  nature?: string; // : nom de la table pointée dans le cas d'un type monoval ou multival
  order?: string | number; // : ordre d'affichage, commun à la liste, à la consultation et à l'édition
  devise?: string | boolean; // Permet d’identifier le champ « devise » dans la structure d’un objet.
  channel?: string | boolean; // Affichage de l’une liste de valeurs avec sélecteurs (Cf Choix de canal d’échange actuellement sur la maquette).
  datefilter?: string | boolean; // Permet d’identifier la/les dates sur lesquelles filtrer via le bouton « Période » sur les affichages en Liste
  selector?: string | boolean; // Permet la visualisation d’un choix et la sélection via un sélecteur
  marker?: string | boolean; // Permet de matérialiser un boolean par un picto ON (true) et un picto OFF (false) OU par un picto ON (true) et rien (false)
  inexternallist?: string | boolean; // Permet de définir sir ce champ apparaîtra dans le tableau si l’objet est défini en « nature » d’un champ « external »
  controls?: string | string[]; // :  Liste des contrôles JS à appliquer à la validation du formulaire d'édition/création
  phone?: string | boolean; // Permet d’identifier un champ comme étant un numéro de téléphone et d’afficher le choix de l’indicatif téléphonique en liste déroulante avant le champ de saisie
  // [Template listes]
  props?: string | string[];
  // [API Draft 1.4]
  field_values?: string[]; // Liste des valeurs possibles pour le champ (dans le cadre d'un champ multival ou monoval et non external)
  // Ajout list en bloc
  datecreate?: string | boolean;
  datestart?: string | boolean;
  dateend?: string | boolean;
  error?: string | boolean;
  statut?: string | boolean;
  filetodownload?: string | boolean;
  // TODo
  description?: string;
  // Variante du composant à utiliser, exemple: file, table, selector, select
  component?: string;
  // Source des valeurs possibles du champs
  source?: string;
  // Champ valeur à utiliser pour le monoval
  value_field?: string;
  // Champ titre à utiliser pour le monoval
  title_field?: string;
  //! EINV-FRONT
  // Flag indiquand si ce champ est spécial (title, subtitle, error, statut, ...)
  special?: boolean;
}
