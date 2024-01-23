import { useCallback, useEffect, useState } from "react";
import Papa from "papaparse";
import DataTable from "react-data-table-component";

export interface CSVViewerProps {
  /** Fichier csv à visualiser */
  file: any;
  /** Fichier avec en-têtes ou non */
  withHeader?: boolean;
}

/**
 * <b>Composant visualisateur de fichier de type csv</b>
 * @param file url or base 64 content
 * @returns
 */
export function CSVViewer({ file, withHeader = true }: CSVViewerProps) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const makeColumns = (rawColumns: any) => {
    return rawColumns.map((column: any) => {
      return { name: column, selector: column };
    });
  };

  const handleDataChange = useCallback((file: any) => {
    setData(file.data);
    setColumns(makeColumns(file.meta.fields));
  }, []);

  useEffect(() => {
    Papa.parse(file, {
      header: withHeader,
      download: true,
      complete: handleDataChange,
    });
    if (data && data.length && columns.length) setLoading(false);
  }, [data, columns, file, withHeader, handleDataChange]);

  return (
    <div>
      {!loading && (
        <DataTable
          columns={columns}
          data={data}
          pagination
          className="max-h-[490px]"
        />
      )}
    </div>
  );
}
