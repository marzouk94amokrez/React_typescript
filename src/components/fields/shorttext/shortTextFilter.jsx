
/**
 * <b>Composant de filtre d'un champ de type shorttext</b>
 */
export default function ShortTextFilter({ record, fieldLabel, fieldName, onUpdate }) {
  const value = record[fieldName] || "";

  function onValueUpdate(event) {
    const value = event.target.value;

    if (!onUpdate) {
      return;
    }

    onUpdate({
      [fieldName]: value,
    });
  }

  return (
    <div className="flex flex-col items-center w-full text-sm text-[var(--color-sec)] after:content-['\ '] after:w-full after:h-[2px] after:bg-[var(--fields-background)] after:inline-block">
      <input
        type="text"
        className={"border-none px-0 h-8 w-full"}
        onChange={onValueUpdate}
        placeholder={fieldLabel}
        value={value}
      />
    </div>
  );
}
