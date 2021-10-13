const baseUrl = "https://api.thecatapi.com/v1/";
const apiKey = process.env.REACT_APP_CAT_API_KEY || "";
const headers = { "x-api-key": apiKey };

const getImages = async () => {
  let url = new URL(baseUrl + "images");

  const params = { limit: "16" };

  url.search = new URLSearchParams(params).toString();

  const init = {
    method: "GET",
    headers: headers,
  };
  let responseData;
  await fetch(url.toString(), init).then((response) => {
    return response.json();
  });
  return responseData;
};

const getVotes = async () => {
  let url = new URL(baseUrl + "votes");

  const params = { limit: "16" };

  url.search = new URLSearchParams(params).toString();

  const init = {
    method: "GET",
    headers: headers,
  };
  let responseData;
  await fetch(url.toString(), init).then((response) => {
    return response.json();
  });
  return responseData;
};

const uploadImage = (file) => {
  let uploadForm = new FormData();
  uploadForm.append("file", file);
  const init = {
    method: "POST",
    headers: headers,
    body: uploadForm,
  };

  fetch(baseUrl + "images/upload", init).then((response) =>
    console.log(response)
  );
};

const setFavourite = (id) => {
  let idForm = new FormData();
  idForm.append("image_id", id);
  const init = {
    method: "POST",
    headers: headers,
    body: idForm,
  };

  fetch(baseUrl + "favourites", init).then((response) => console.log(response));
};

const removeFavourite = (id) => {
  const init = {
    method: "DELETE",
    headers: headers,
  };

  fetch(baseUrl + "favourites/" + id, init).then((response) =>
    console.log(response)
  );
};

const incrementVote = (id, isVoteUp) => {
  let voteForm = new FormData();
  voteForm.append("image_id", id);
  voteForm.append("value", isVoteUp ? 1 : 0);
  const init = {
    method: "POST",
    headers: headers,
    body: voteForm,
  };

  fetch(baseUrl + "votes", init).then((response) => console.log(response));
};

export default {
  getImages,
  uploadImage,
  getVotes,
  setFavourite,
  removeFavourite,
  incrementVote,
};
