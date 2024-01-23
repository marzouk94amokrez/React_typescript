import { useCallback, useEffect, useMemo } from "react";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useSearchModelQuery } from "@/store/api";
import { replaceVariables } from "@/utils/funcs";

/**
 * <b>Composant de rendu des dispositions d'affichages 'timeline'</b>
 * 
 * @param param0 
 */
export function TimeLine({ model ,record, layouts, fieldMetadata }: LayoutElementProps) {
  const fieldMeta = useMemo(() => layouts[0] || {}, [layouts]);
  const queryEndpoint = replaceVariables(fieldMeta?.endpoint, record);

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSearchModelQuery(
    {
      url: queryEndpoint,
      params: {},
    },
    { skip: !queryEndpoint }
  );

  const events = objectData?.data?.records || [];
  const valueField = useMemo(() => fieldMetadata?.value_field || OBJECTS_ID_FIELD, [fieldMetadata]);

  return (
    <div className="w-full h-[30rem] overflow-hidden break-words break-all ">
      {events && events.map((e: any) =>
      
        <div key={e[OBJECTS_ID_FIELD]} className={`flex flex-row justify-between py-2 `} style={{ color: `${e.color === "" ? 'var(--color-sec)' : `${e.color}`}` }}>
          <div className="flex justify-between">
            <span>
              <FontAwesomeIcon icon={e.icon} />
            </span>
            <span className="px-2 text-[0.9rem]">
              {e.status && e.status[valueField]}
            </span>
          </div>

          <div>
            <span className="text-[0.9rem]">le {moment(e.date).format("DD/MM/YYYY à HH:mm:ss")}</span>
          </div>
        </div>
      )
      }
    </div>
  );
}

layoutElementsDictionary.registerLayoutElement('timeline', TimeLine);
