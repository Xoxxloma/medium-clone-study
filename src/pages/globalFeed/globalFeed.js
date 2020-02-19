import React, { useEffect } from 'react';
import Feed from '../../components/feed/feed';
import useFetch from '../../hooks/useFetch';
import Pagination from '../../components/pagination/pagination';
import { getPaginator, limit } from '../../utils';
import { stringify } from 'query-string';
import { Spinner } from '../../components/spinner/spinner';
import { ErrorMessage } from '../../components/errorMessage/errorMessage';
import { PopularTags } from '../../components/popularTags/popularTags';
import FeedToggler from '../../components/feedToggler/feedToggler';

const GlobalFeed = ({ location, match }) => {

  const { offset, currentPage } = getPaginator(location.search)
  const stringifiedParams = stringify({ limit, offset })
  const apiUrl = `/articles?${stringifiedParams}`
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
  const url = match.url;

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share fucking knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Spinner />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination total={response.articlesCount} limit={limit} currentPage={currentPage} url={url} />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed;