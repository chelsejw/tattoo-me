const cards = document.querySelectorAll(".card");

const hashtagButton = (text, url) => {
  const link = document.createElement("a");
  link.href = url;
  const button = document.createElement("button");
  button.classList.value = "btn btn-sm btn-outline-dark ";
  button.style.margin = "0 5px 5px 0";
  button.innerText = text;
  link.appendChild(button);
  return link;
};

const createHashtags = () => {
  cards.forEach((card) => {
        const artistId = card.id.slice(7);

    let request = new XMLHttpRequest();

    const whenRequestLoads = () => {
      //If no hashtags are found, do not do dom manipulation.
      if (!request.responseText) {
        return;
      }

      const hashtagsArr = JSON.parse(request.responseText);

      hashtagsArr.forEach((hashtag) => {
        const newButton = hashtagButton(
          `#${hashtag.hashtag_name}`,
          `/artists?locationId=all&hashtagId=${hashtag.hashtag_id}&sortBy=all`
        );
        const cardBody = document.getElementById(`body_${artistId}`);
        cardBody.appendChild(newButton);
      });
    };

    request.addEventListener("load", whenRequestLoads);

    const url = `/api/hashtags/artists/${artistId}`;
    request.open("GET", url);
    request.send();
  });
};

window.addEventListener("load", createHashtags);
