import React, { useEffect, useState, useContext } from "react";
import ArticleForm from "../articleForm/articleForm";
import useFetch from "../../hooks/useFetch";
import { Redirect } from "react-router-dom";
import {CurrentUserContext} from '../../contexts/currentUser'

const EditArticle = ({ match }) => {

  const [initialValues, setInitialValues] = useState(null);
  const [successSubmit, setSuccessSubmit] = useState(false);

  const [currentUserState] = useContext(CurrentUserContext);

  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;

  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle
  ] = useFetch(apiUrl);

  const handleSubmit = article => {
    console.log("haha", article);
    doUpdateArticle({
      method: "put",
      data: {
        article
      }
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return
    }
    setSuccessSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />
  }

  if (successSubmit) {
    return <Redirect to={`/articles/${slug}`} />
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      errors={(updateArticleError && updateArticleError.errors) || {}}
    />
  );
};

export default EditArticle;
