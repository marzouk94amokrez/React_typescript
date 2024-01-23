/**
 * Identifier component props
 */
interface IdentifierProps {
  /** Numéro d'identification */
  identifier?: any;
  /** Pour vérifier si l'identifiant est désactivé ou non */
  isActive?: boolean;
  /** Rajouter des padding aux identifiants */
  padIdentifiers?: boolean;
  /** Longueur de l'identifiant */
  identifierMinLength?: number;
  /** Padding à rajouter aux identifiants */
  identifierPadding?: string;
  /** Classe à appliquer au conteneur */
  className?: string;
}

/**
 * 
 * <b>Composant identifiant pour afficher les numéros uniques d'une liste donnée</b>
 * @param param0 
 * @returns 
 */
const Identifier = ({ identifier, isActive, identifierMinLength = 4, identifierPadding = '0', padIdentifiers = false, className }: IdentifierProps) => {
  return (
    <div className={`${identifier !== '' ? '' : "hidden"} ${className ? className : ''}`}>
      <div className={`border-[1px] solid rounded-[20px] text-center text-2xl p-4 px-4 py-[5px] ${isActive ? 'border-[var(--color-sec)]' : 'border-[var(--bloc-inactive-color)]'}`}>
        {padIdentifiers ? String(identifier).padStart(identifierMinLength, identifierPadding) : identifier}
      </div>
    </div>
  );
};

export default Identifier;
