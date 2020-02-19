import React, { useEffect, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, Redirect } from "react-router-dom";
import { Spinner } from "../../components/spinner/spinner";
import { ErrorMessage } from "../../components/errorMessage/errorMessage";
import TagList from "../../components/tagList/tagList";
import { CurrentUserContext } from "../../contexts/currentUser";

const Article = props => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [successDelete, setSuccessDelete] = useState(false);
  const [
    {
      response: fetchArticleResponse,
      isLoading: fetchArticleIsLoading,
      error: fetchArticleError
    },
    doFetch
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(
    apiUrl
  );
  const [currentUserState] = useContext(CurrentUserContext);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false;
    }
    return (
      fetchArticleResponse.article.author ===
      currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: "delete"
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    setSuccessDelete(true);
  }, [deleteArticleResponse]);

  if (successDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                  >
                    <i className="ion-edit" />
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm ml-2"
                    onClick={deleteArticle}
                  >
                    Delete article
                    <i className="ion-trash-a" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Spinner />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
