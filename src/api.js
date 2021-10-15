const baseUrl = "https://api.thecatapi.com/v1/";
const apiKey = process.env.REACT_APP_CAT_API_KEY || "";
const headers = { "x-api-key": apiKey, "Content-type": "application/json" };

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
    responseData = response.json();
  });
  return responseData;
};

const getVotes = async () => {
  const init = {
    method: "GET",
    headers: headers,
  };

  let responseData = [];
  let hasMorePages = true;
  let currentPage = 0;

  while (hasMorePages) {
    let currentResponseData = [];
    await getOnePageOfVotes(currentPage, init).then((response) => {
      currentResponseData = response;
    });
    if (currentResponseData.length > 0) {
      responseData = [...responseData, ...currentResponseData];
      currentPage++;
    } else {
      hasMorePages = false;
    }
  }

  const votesMap = responseData.reduce((acc, voteData) => {
    let voteValue = voteData.value === 0 ? -1 : 1;
    if (acc[voteData.image_id]) {
      acc[voteData.image_id] += voteValue;
    } else {
      acc[voteData.image_id] = voteValue;
    }

    return acc;
  }, {});

  return votesMap;
};

const getOnePageOfVotes = async (page, init) => {
  let responseData = [];
  let url = new URL(baseUrl + "votes");

  const params = { page: page };

  url.search = new URLSearchParams(params).toString();
  await fetch(url.toString(), init).then((response) => {
    responseData = response.json();
  });
  return responseData;
};

const uploadImage = (file) => {
  let uploadForm = new FormData();
  uploadForm.append("file", file);
  const init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ file: file }),
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
  const init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ image_id: id, value: isVoteUp ? 1 : 0 }),
  };

  fetch(baseUrl + "votes", init).then((response) => console.log(response));
};

const api = {
  getImages,
  uploadImage,
  getVotes,
  setFavourite,
  removeFavourite,
  incrementVote,
};

export default api;
