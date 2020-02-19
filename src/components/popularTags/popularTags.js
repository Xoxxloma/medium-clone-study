import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { ErrorMessage } from '../errorMessage/errorMessage';
import { Link } from 'react-router-dom';
import BorderSpinner from '../spinner/borderSpinner';

export const PopularTags = () => {

  const [{ response, isLoading, error }, doFetch] = useFetch('/tags')

  useEffect(() => {
    doFetch()
  }, [doFetch])
  
  if (isLoading || !response) {
    return <BorderSpinner/>
  }

  if (error) {
    return <ErrorMessage />
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
          {response.tags.map(tag => (
            <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
              {tag}
            </Link>
          ))}
      </div>
    </div>
  )
}