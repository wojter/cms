import { useState, useEffect } from "react";
import { Pagination, Spinner, Table as TableFL } from "flowbite-react";
import PageLimit from "./pageLimit";
import Searchbar from "./searchbar";
import TableCell from "./tableCell";
import { useToast } from "./providers/toastProvider";
import { useRefetch } from "./providers/refetchProvider";
import { useData } from "./providers/dataProvider";

const Table = ({
  title,
  refetchName,
  apiPath,
  headers,
  headerTypes,
  dataMapper,
  topButtons,
  actionButtons,
  links = null,
  otherUrlOptions = null,
}) => {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 5,
    limit: 8,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [totalDocumentNumber, setTotalDocumentNumber] = useState(null);

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();
  const { setPostCategories, setReactionCategories } = useData();

  useEffect(() => {
    if (toRefetch) {
      if (
        toRefetch === "users" ||
        toRefetch === "posts" ||
        toRefetch === "posts/categories" ||
        toRefetch === "comments" ||
        toRefetch === "reactions" ||
        toRefetch === "reactions/categories" ||
        toRefetch === "images"
      ) {
        fetchData();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setDataLoading(true);
      let url = "";
      let doSendAdditionalData = false;
      if (apiPath === "posts" || apiPath === "reactions") {
        doSendAdditionalData = true;
      }
      if (searchTerm) {
        url = `/api/admin/${apiPath}?search=${searchTerm}&page=${pagination.currentPage}&limit=${pagination.limit}`;
      } else {
        url = `/api/admin/${apiPath}?page=${pagination.currentPage}&limit=${pagination.limit}`;
      }
      if (doSendAdditionalData) {
        url += `&additional_data=${apiPath}`;
      }
      if (otherUrlOptions) {
        url += otherUrlOptions;
      }
      const res = await fetch(url);
      if (res.status === 200) {
        const {
          documents,
          currentPage,
          totalPages,
          totalDocumentNumber,
          postCategories,
          reactionCategories,
        } = await res.json();
        setData(documents);
        if (postCategories) {
          setPostCategories(postCategories);
        }
        if (reactionCategories) {
          setReactionCategories(reactionCategories);
        }
        setTotalDocumentNumber(totalDocumentNumber);
        setPagination({
          ...pagination,
          currentPage,
          totalPages,
        });
        setDataLoading(false);
      } else {
        setDataLoading(false);
        throw new Error(await res.text());
      }
    } catch (err) {
      setDataLoading(false);
      console.log(err);
      setToast("An error occured while fetching data", false);
    }
  };

  const onPageChange = (newPageNumber) => {
    setPagination({ ...pagination, currentPage: newPageNumber });
    refetch(refetchName);
  };

  const handleLimitChange = (e) => {
    setPagination({ ...pagination, limit: e.target.value });
    refetch(refetchName);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-end h-10">
        <div className="flex flex-row gap-2 items-end">
          <p className="text-4xl">{title}</p>
          {(totalDocumentNumber || totalDocumentNumber === 0) && (
            <p className="text-gray-500 text-xl">({totalDocumentNumber})</p>
          )}
        </div>
        <div className="flex flex-row items-center gap-4">
          {topButtons && topButtons()}
          <Searchbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            refetchName={refetchName}
          />
        </div>
      </div>
      <>
        <TableFL className="table-fixed overflow-hidden">
          <TableFL.Head>
            {headers.map((header, id) => (
              <TableFL.HeadCell key={id}>{header}</TableFL.HeadCell>
            ))}
            <TableFL.HeadCell>
              <span className="sr-only">Details</span>
            </TableFL.HeadCell>
          </TableFL.Head>
          {dataLoading ? (
            <TableFL.Body>
              <TableFL.Row className="dark:border-gray-700 dark:bg-gray-800">
                <TableFL.Cell>
                  <Spinner aria-label="Loading data.." />
                </TableFL.Cell>
                {headers.map((_, id) => (
                  <TableFL.Cell key={id}></TableFL.Cell>
                ))}
              </TableFL.Row>
            </TableFL.Body>
          ) : !data || (Array.isArray(data) && data.length === 0) ? (
            <TableFL.Body>
              <TableFL.Row className="dark:border-gray-700 dark:bg-gray-800">
                <TableFL.Cell>No data</TableFL.Cell>
                {headers.map((_, id) => (
                  <TableFL.Cell key={id}></TableFL.Cell>
                ))}
              </TableFL.Row>
            </TableFL.Body>
          ) : (
            <TableFL.Body className="divide-y">
              {data.map(dataMapper).map((row, id) => (
                <TableFL.Row
                  key={id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {row.map((cell, idd) => (
                    <TableCell
                      key={idd}
                      text={cell}
                      type={headerTypes[idd]}
                      links={links}
                      rowRaw={data[id]}
                    />
                  ))}
                  <TableFL.Cell>
                    <div className="flex flex-row justify-end gap-4">
                      {actionButtons && actionButtons(data[id])}
                    </div>
                  </TableFL.Cell>
                </TableFL.Row>
              ))}
            </TableFL.Body>
          )}
        </TableFL>
        <div className="flex flex-row items-center justify-between text-center">
          {pagination?.limit && (
            <PageLimit handleLimitChange={handleLimitChange} />
          )}
          {pagination?.currentPage && (
            <Pagination
              currentPage={pagination.currentPage}
              showIcons={true}
              onPageChange={onPageChange}
              totalPages={pagination.totalPages}
              className="flex flex-col xs:mt-0 -mt-2"
            />
          )}
        </div>
      </>
    </>
  );
};
export default Table;
