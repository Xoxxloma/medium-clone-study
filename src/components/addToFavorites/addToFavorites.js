import React from "react";
import useFetch from '../../hooks/useFetch';
import classNames from 'classnames'

const AddToFavorites = ({ favorited, favoritesCount, slug }) => {
  const apiUrl = `/articles/${slug}/favorite`

  const [{response}, doFetch] = useFetch(apiUrl);

  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount
  const favoriteWithResponse = response ? response.article.favorited : favorited

  const btnClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': favoriteWithResponse,
    'btn-outline-primary': !favoriteWithResponse
  })

  const handleLike = (e) => {
    e.preventDefault()
    doFetch({
      method: favoriteWithResponse ? 'delete' : 'post'
    })
  }

  return (
    <button className={btnClasses} onClick={handleLike}>
      <i className="ion-heart" />
      &nbsp;{favoritesCountWithResponse}
    </button>
  );
};

export default AddToFavorites;
