import React, { useEffect } from "react";
import { getPaginator, limit } from "../../../utils";
import Pagination from "components/pagination/pagination";
import { stringify } from "query-string";
import { Spinner } from "components/spinner/spinner";
import { ErrorMessage } from "components/errorMessage/errorMessage";
import Feed from "components/feed/feed";
import useFetch from "../../../hooks/useFetch";

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);

  return (
    <div>
      {isLoading && <Spinner />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            currentPage={currentPage}
            url={url}
          />
        </>
      )}
    </div>
  );
};

export default UserArticles;
