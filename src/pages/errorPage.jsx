import { useLogger } from "@/utils/loggerService";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const { logger } = useLogger();
  const error = useRouteError();

  logger.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>{error.statusText || error.message}</i>
    </div>
  );
}
