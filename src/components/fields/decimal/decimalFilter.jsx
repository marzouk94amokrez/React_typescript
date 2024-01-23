import { useCallback, useMemo } from "react";
/**
 * <b> Composant de filtre d'un champ de type décimal</b>
 */
export default function DecimalFilter({ record, fieldLabel, fieldName, onUpdate }) {
  const value = useMemo(() => {
    return record[fieldName] || {};
  }, [record, fieldName]);
  const min = useMemo(() => {
    return value && !isNaN(value.min) ? value.min : "";
  }, [value]);
  const max = useMemo(() => {
    return value && !isNaN(value.max) ? value.max : "";
  }, [value]);

  /**
   * Filter min value update handler
   */
  const onMinValueUpdate = useCallback(
    (event) => {
      const min = isNaN(event.target.value) ? "" : event.target.value;

      if (!onUpdate) {
        return;
      }

      onUpdate({
        [fieldName]: { min, max },
      });
    },
    [max, fieldName, onUpdate]
  );

  /**
   * Filter max value update handler
   */
  const onMaxValueUpdate = useCallback(
    (event) => {
      const max = isNaN(event.target.value) ? "" : event.target.value;

      if (!onUpdate) {
        return;
      }

      onUpdate({
        [fieldName]: { min, max },
      });
    },
    [min, fieldName, onUpdate]
  );

  return (
    <div className="text-sm text-[var(--color-sec)] w-full">
      <div className="flex flex-col items-center w-full after:content-['\ '] after:w-full after:h-[2px] after:bg-[var(--fields-background)] after:inline-block">
        <div className="flex items-center w-full">
          <span className="inline-block w-8 text-left text-ellipsis">Min</span>:
          <input
            type="number"
            className={"border-none ml-1 h-8 w-full"}
            onChange={onMinValueUpdate}
            value={min}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full after:content-['\ '] after:w-full after:h-[2px] after:bg-[var(--fields-background)] after:inline-block">
        <div className="flex items-center w-full">
          <span className="inline-block w-8 text-left text-ellipsis">Max</span>:
          <input
            type="number"
            className={"border-none ml-1 h-8 w-full"}
            onChange={onMaxValueUpdate}
            value={max}
          />
        </div>
      </div>
    </div>
  );
}
