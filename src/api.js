const baseUrl = "https://api.thecatapi.com/v1/";
const apiKey = process.env.REACT_APP_CAT_API_KEY || "";
const headers = { "x-api-key": apiKey, "Content-type": "application/json" };

const getImages = async (page, pageLimit) => {
  let url = new URL(baseUrl + "images");

  const params = {
    limit: pageLimit,
    include_favourite: 1,
    sub_id: "1",
    page: page,
  };

  url.search = new URLSearchParams(params).toString();

  const init = {
    method: "GET",
    headers: headers,
  };

  let apiResponse = {
    isSuccessful: false,
    message: "",
  };

  await fetch(url.toString(), init)
    .then((response) => response.json())
    .then((response) => {
      if (Array.isArray(response)) {
        apiResponse.isSuccessful = true;
        apiResponse.message = "Images successfully retrieved";
        apiResponse.data = response;
      } else {
        apiResponse.message =
          "Something went wrong retrieving images, please try again at a later time";
      }
    });

  return apiResponse;
};

const getVotes = async () => {
  const init = {
    method: "GET",
    headers: headers,
  };

  let responseData = [];
  let hasMorePages = true;
  let currentPage = 0;

  let callHasFailed = false;
  let apiResponse = {
    isSuccessful: false,
    message: "",
  };

  while (hasMorePages) {
    let currentResponseData = [];
    await getOnePageOfVotes(currentPage, init).then((response) => {
      currentResponseData = response;
    });
    if (currentResponseData) {
      if (currentResponseData.length > 0) {
        responseData = [...responseData, ...currentResponseData];
        currentPage++;
      } else {
        hasMorePages = false;
      }
    } else {
      hasMorePages = false;
      callHasFailed = true;
    }
  }
  if (!callHasFailed) {
    apiResponse.isSuccessful = true;
    apiResponse.message = "Successfully retrieved vote data";
    apiResponse.data = responseData.reduce((acc, voteData) => {
      let voteValue = voteData.value === 0 ? -1 : 1;
      if (acc[voteData.image_id]) {
        acc[voteData.image_id] += voteValue;
      } else {
        acc[voteData.image_id] = voteValue;
      }

      return acc;
    }, {});
  } else {
    apiResponse.message =
      "Something has gone wrong collecting the vote data. Please try again at a later time";
  }

  return apiResponse;
};

const getOnePageOfVotes = async (page, init) => {
  let responseData = [];
  let url = new URL(baseUrl + "votes");

  const params = { page: page };

  url.search = new URLSearchParams(params).toString();
  await fetch(url.toString(), init)
    .then((response) => response.json())
    .then((response) => {
      if (Array.isArray(response)) {
        responseData = response;
      } else {
        responseData = undefined;
      }
    });
  return responseData;
};

const uploadImage = async (file) => {
  const headers = { "x-api-key": apiKey };
  let uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("sub_id", "1");
  const init = {
    method: "POST",
    headers: headers,
    body: uploadForm,
  };

  let apiResponse = {
    isSuccessful: false,
    message: "",
  };

  await fetch(baseUrl + "images/upload", init)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.approved === 1) {
        apiResponse.isSuccessful = true;
        apiResponse.message = "Upload Successful";
      } else {
        apiResponse.message = `Error uploading this image - ${response.message}`;
      }
    })
    .catch((err) => {
      console.log(err);
      apiResponse.message = `Something went wrong uploading this image - ${err.message}`;
    });

  console.log(apiResponse);
  return apiResponse;
};

const setFavourite = async (id) => {
  const init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ image_id: id, sub_id: "1" }),
  };

  let apiResponse = {
    isSuccessful: false,
    message: "",
    favouriteId: undefined,
  };

  await fetch(baseUrl + "favourites", init)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.message === "SUCCESS") {
        apiResponse.isSuccessful = true;
        apiResponse.message = "Favourite successfully removed";
        apiResponse.favouriteId = response.id;
      } else {
        apiResponse.message =
          "Something went wrong adding this favourite, please try again at a later time";
      }
    })
    .catch((err) => {
      console.log(err);
      apiResponse.message =
        "Something went wrong adding this favourite, please try again at a later time";
    });
  console.log(apiResponse);
  return apiResponse;
};

const removeFavourite = async (id) => {
  const init = {
    method: "DELETE",
    headers: headers,
  };

  let apiResponse = { isSuccessful: false, message: "" };

  await fetch(baseUrl + "favourites/" + id, init)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.body);
      if (response.message === "SUCCESS") {
        console.log(response.message);
        apiResponse.isSuccessful = true;
        apiResponse.message = "Favourite successfully removed";
      } else {
        apiResponse.message =
          "Something went wrong removing this favourite, please try again at a later time";
      }
    })
    .catch((err) => {
      console.log(err);
      apiResponse.message =
        "Something went wrong removing this favourite, please try again at a later time";
    });
  console.log(apiResponse);
  return apiResponse;
};

const incrementVote = async (id, isVoteUp) => {
  const init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      image_id: id,
      value: isVoteUp ? 1 : 0,
      sub_id: "1",
    }),
  };

  let apiResponse = { isSuccessful: false, message: "" };

  await fetch(baseUrl + "votes", init)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.message === "SUCCESS") {
        apiResponse.isSuccessful = true;
        apiResponse.message = "Vote successfully applied";
      } else {
        apiResponse.message =
          "Something went wrong with applying this vote, please try again at a later time";
      }
    })
    .catch((err) => {
      console.log(err);
      apiResponse.message =
        "Something went wrong with applying this vote, please try again at a later time";
    });

  return apiResponse;
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
