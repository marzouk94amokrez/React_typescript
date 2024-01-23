import React from "react";
import "./TablePagination.css";
import Pagination from "react-js-pagination";
import { useTranslation } from "react-i18next";
import {
  PerPageGroup,
  PerPageLabel,
  PerPageSelect,
  TPContainer,
} from "./TablePagination.styled";
import { FormGroup, FormLabel, FormSelect } from "@/styles/Common";
import ListeMenu from "../DensityAndColumns/ListeMenu";
import ShowColumns from "../DensityAndColumns/ShowColumns";
function TablePagination2(props) {
  const { t } = useTranslation();
  const {
    currentPage,
    pageChange,
    totalElement,
    perPage,
    perPageChange,
    setDensity,
    columns,
    setColumns,
    lastInvoice,
  } = props;
  const pageNumbers = [];
  const pageElement = perPage || 10;
  for (let i = 1; i <= Math.ceil(totalElement / pageElement); i++) {
    pageNumbers.push(i);
  }

  return (
    <TPContainer style={{ marginTop: "0" }}>
      {perPageChange && lastInvoice === undefined && (
        <PerPageGroup>
          <PerPageLabel htmlFor="perPage">
            {t("global:rows", "Lignes")}
          </PerPageLabel>
          <PerPageSelect
            id="perPage"
            value={perPage}
            onChange={(e) => perPageChange(e.target.value)}
          >
            {/* <option value="2">2</option> */}
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </PerPageSelect>
          {setDensity ? <ListeMenu setDensity={setDensity} /> : null}
          {columns ? (
            <ShowColumns columns={columns} setColumns={setColumns} />
          ) : null}
        </PerPageGroup>
      )}
      {lastInvoice === undefined && (
        <nav className="usersMAnag__paginationContainer">
          <div className="usersMAnag__paginationList">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={pageElement}
              totalItemsCount={totalElement}
              pageRangeDisplayed={5}
              onChange={(page) => pageChange(page)}
              innerClass={"usersMAnag__pagination"}
              itemClass={"usersMAnag__page_item"}
              linkClass={"usersMAnag__page_link"}
              activeClass={"usersMAnag__active"}
              disabledClass={"usersMAnag__disabled"}
            />
            <span className="usersMAnag__pagination__total">
              {totalElement}{" "}
              {t("tableAction:result", { defaultValue: "résultat(s)" })}{" "}
            </span>
          </div>
        </nav>
      )}
    </TPContainer>
  );
}

export default TablePagination2;
