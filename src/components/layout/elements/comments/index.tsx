// import { useMemo } from "react";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";
import moment from 'moment';
import {
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/utils/contexts/app";
import { useLogger } from "@/utils/loggerService";
import { replaceVariables } from "@/utils/funcs";
import { useSearchModelQuery } from "@/store/api";

/**
 * <b>Composant de rendu des dispositions d'affichages 'comments'</b>
 * 
 * @param param0 
 */
export function Comments({ model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate }: LayoutElementProps) {
  const { logger } = useLogger();

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

  const comments = objectData?.data?.records || [];
  
  /**
   * Get the username logged in
   */
  const { authService } = useAuth();
  const getUser_loggedIn: any = {}; //authService.getUser();
  const username_loggedIn: string = getUser_loggedIn.preferred_username;

  const [message, setMessage] = useState("")
  
  const publishMessage = (message: any) => {

    if (!onUpdate) {
      return;
    }

    onUpdate({
      [fieldMeta.type as string]: message,
    });

  }

  return (
    <>
      <div className='relative w-full h-[30rem] overflow-scroll'>
        <div className='overflow-y-auto '>
          {comments && comments.map((item: any) => (
            <div
              key={item.date}
              className={`${item.author.username === username_loggedIn ? "pl-20" : "pr-20"}`}
            >
              <p key={item.date} className={`text-[var(--color-default)] text-[0.9rem] ${item.author.type === "owner" ? "text-right rounded-xl" : "text-left"} p-3 pr-5`}>
                <span className="">{item.comment} </span><br />
                {
                  item.author && (
                    <span className='text-[var(--color-sec)]'>
                      {item.author.first_name} {item.author.last_name}, {moment(item.date).format("DD/MM/YYYY à HH:mm:ss")}
                    </span>
                  )
                }
              </p>
            </div>
          ))}
        </div>

      </div>
      <div className='w-full my-4'> 
        <div className="flex justify-end items-center relative rounded-[16px] border border-[var(--color-sec)]">
          <input
            placeholder="Saisissez votre texte ici"
            className="rounded-[16px] p-4 w-full  placeholder:italic placeholder:text-[var(--label-state-futur)]"
            onChange={(event: any) => setMessage(event.target.value)}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="absolute mr-2 w-10 text-[var(--color-princ)] cursor-pointer "
            onClick={() => { publishMessage(message) }}
          />
        </div>
      </div>
    </>
  );
}

layoutElementsDictionary.registerLayoutElement('comments', Comments);
