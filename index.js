"use strict";

function displayResults(responseJson) {
  console.log(responseJson);
  let user = responseJson[0].owner.login;
  console.log(user);
  $("#results-list").empty();
  $("#results-list").append(
    `<li class="main-desc"><h3>${user}</h3>
       <p>no.of Repos ${responseJson.length}</p>
       <a href="${responseJson[0].owner.html_url}">${
      responseJson[0].owner.html_url
    }</a>
       </li>`
  );
  for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(
      `<li class="repos">
       <h4>${i + 1}. ${responseJson[i].name}</h4>
       <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
       <p>description :${responseJson[i].description}</p>
      </li>`
    );
  }
  $("#results").removeClass("hidden");
}

function getRepo(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.statusText);
    })

    .then(responseJson => displayResults(responseJson))

    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const userName = $("#js-search-user").val();
    console.log(userName);
    getRepo(userName);
  });
}

$(watchForm);
