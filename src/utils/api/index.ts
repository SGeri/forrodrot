import { Article, Event } from "@types";
import { showNotification } from "@mantine/notifications";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

enum Endpoints {
  GetArticle = "/api/articles/get_single",
  GetArticles = "/api/articles/get_all",
  AddArticle = "/api/articles/add",
  EditArticle = "/api/articles/edit",
  DeleteArticle = "/api/articles/delete",

  GetEvents = "/api/events/get",
  AddEvent = "/api/events/add",
  EditEvent = "/api/events/edit",
  DeleteEvent = "/api/events/delete",

  GetParticipants = "/api/participants",
}

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://forrodrot.com",
  },
};

const handleError = (e: any) => {
  if (typeof window === "undefined") return;

  showNotification({
    title: "Sikertelen művelet",
    message: `Keresd fel a fejlesztőket a probléma megoldásához! ${e}`,
    color: "red",
  });

  return false;
};

// Article related API calls
export const getArticle = async (slug: string) => {
  return await fetch(BASE_URL + Endpoints.GetArticle, {
    ...options,
    body: JSON.stringify({ slug }),
  })
    .then((res) => res.json())
    .catch(handleError);
};

export const getArticles = async (showHidden?: boolean, short?: boolean) => {
  return await fetch(BASE_URL + Endpoints.GetArticles, {
    ...options,
    body: JSON.stringify({ showHidden, short }),
  })
    .then((res) => res.json())
    .catch(handleError);
};

export const addArticle = async (article: Article) => {
  return await fetch(BASE_URL + Endpoints.AddArticle, {
    ...options,
    body: JSON.stringify(article),
  })
    .then((res) => res.json())
    .catch(handleError);
};

export const editArticles = async (article: Article) => {
  return await fetch(BASE_URL + Endpoints.EditArticle, {
    ...options,
    body: JSON.stringify(article),
  })
    .then((res) => res.json())
    .catch(handleError);
};

export const deleteArticle = async (id: string) => {
  return await fetch(BASE_URL + Endpoints.DeleteArticle, {
    ...options,
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .catch(handleError);
};

// Article related API calls
export const getEvents = async () => {
  return await fetch(BASE_URL + Endpoints.GetEvents, options)
    .then((res) => res.json())
    .catch(handleError);
};

export const addEvent = async (event: Event) => {
  return await fetch(BASE_URL + Endpoints.AddEvent, {
    ...options,
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .catch(handleError);
};

export const editEvent = async (event: Event) => {
  return await fetch(BASE_URL + Endpoints.EditEvent, {
    ...options,
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .catch(handleError);
};

export const deleteEvent = async (id: string) => {
  return await fetch(BASE_URL + Endpoints.DeleteEvent, {
    ...options,
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .catch(handleError);
};

export const getParticipants = async () => {
  return await fetch(BASE_URL + Endpoints.GetParticipants, options)
    .then((res) => res.json())
    .catch(handleError);
};
