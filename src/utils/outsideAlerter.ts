import { RefObject, useEffect } from "react";

/**
 * Handle click outside of a component
 *
 * @from https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 * @param ref
 * @param handler
 */
export function useOutsideAlerter(
  ref: RefObject<HTMLElement>,
  handler?: Function
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        if (handler) {
          handler(event);
        }
      }
    }

    // Bind vent listener
    if (!document) {
      return;
    }

    const events = ["mousedown", "touchstart"];
    events.forEach((event) => {
      document.addEventListener(event, handleClickOutside);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleClickOutside);
      });
    };
  }, [ref, handler]);
}
