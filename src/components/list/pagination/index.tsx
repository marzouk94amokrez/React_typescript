import ReactPaginate from "react-paginate";
import "./pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  /** style css */
  className?: string;
  /** Numéro de page actuelle  */
  currentPage?: any;
  /** Nombre total de la page */
  pageCount?: any;
  /** Nombre d'élements par page  */
  elementPerPage?: any;
  /** Nombre total du résultat */
  totalResult?: any;
  /** Un callback pour tout clic sur le composant. 
   * Expose des informations sur la partie cliquée (par exemple,le contrôle suivant)
   **/
  onChangePagination?: any;
  /** Pour aller à la première page (numéro 1) de la liste */
  goToFirstPage?: any;
  /** Libellé pour afficher le résultat */
  labelResult?: string;
  /** Pour pouvoir afficher ou masquer le composant en question */
  paginationVisible?: boolean;
}

const defaultElementPerPage = 5;
const defaultTotalResult = 40;
const defaultLabelResult = "résultat(s)";

/** <b>Composant de Pagination qui permet à l'utilisateur de sélectionner une page spécifique à partir d'une plage de pages.</b>  */
export const Pagination = ({
  className,
  currentPage,
  elementPerPage = defaultElementPerPage,
  onChangePagination,
  totalResult = defaultTotalResult,
  labelResult = defaultLabelResult,
  paginationVisible = true
}: PaginationProps) => {
  const pageCount = Math.ceil(totalResult / elementPerPage);
  const goToFirstPage = () => {
    if (!onChangePagination) {
      return;
    }
    onChangePagination({ selected: 0 });
  };
  const goToLastPage = () => {
    if (!onChangePagination) {
      return;
    }
    onChangePagination({ selected: pageCount - 1 });
  };

  return (
   <>
   {paginationVisible ?  <div className="flex flex-row items-center">
      <button
        onClick={goToFirstPage}
        className={`text-xs item text-[var(--color-sec)] pagination-page ${
          currentPage === 0 ? "hide" : ""
        }`}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <ReactPaginate
        previousLabel={
          <FontAwesomeIcon
            className={`${currentPage === 0 ? "hidden" : ""}`}
            icon={faAngleLeft}
          />
        }
        nextLabel={
          <FontAwesomeIcon
            className={`${currentPage === pageCount - 1 ? "hidden" : ""}`}
            icon={faAngleRight}
          />
        }
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={(event) => {
          if (onChangePagination) {
            onChangePagination(event);
          }
        }}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        activeClassName={"item active "}
        breakClassName={"item break-me "}
        breakLabel={"..."}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        pageClassName={"item pagination-page "}
        pageRangeDisplayed={2}
        previousClassName={"item previous"}
      />
      <button
        onClick={goToLastPage}
        className={`text-xs item text-[var(--color-sec)] pagination-page ${
          currentPage === pageCount - 1 ? "hide" : ""
        } `}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
      <span className={`text-sm text-[var(--color-sec)] `}>
        &nbsp;{totalResult}&nbsp;{labelResult}
      </span>
    </div> : <></>}
   </>
  );
};
