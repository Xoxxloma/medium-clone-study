import React, { useEffect, useState, useContext } from "react";
import {Redirect} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";
import ArticleForm from "../../components/articleForm/articleForm";
import {CurrentUserContext} from '../../contexts/currentUser'

const CreateArticle = () => {
  const apiUrl = "/articles";
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [CurrentUserState] = useContext(CurrentUserContext)


  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: []
  };

  const onSubmit = article => {
    doFetch({
      method: "post",
      data: {
        article
      }
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setSuccessfulSubmit(true)
  }, [response]);

  if (!CurrentUserState.isLoggedIn) {
    return <Redirect to="/" />
  }

  if (successfulSubmit) {
   return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  );
};

export default CreateArticle;
