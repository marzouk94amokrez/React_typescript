interface statutProps {
  /** Contient tous les propriétés et les valeurs de statut */
  statusValue?: any;
}

/** <b>Composant qui représente le statut d'un élément du bloc.</b>
 */
export function StatusBloc({
  statusValue,
}: statutProps) {
  
  return (
    <div className="flex items-center text-[var(--color-princ)] status">
      {statusValue}
    </div>
  );
}
