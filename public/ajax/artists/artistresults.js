const cards = document.querySelectorAll(".card");

const hashtagButton = (text, url) => {
  const link = document.createElement("a");
  link.href = url;
  const button = document.createElement("button");
  button.classList.value = "btn btn-sm btn-secondary ";
  button.style.margin = "0 5px 5px 0";
  button.innerText = text;
  link.appendChild(button);
  return link;
};

const createHashtags = () => {
  cards.forEach((card) => {
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
          `/hashtags/${hashtag.hashtag_id}`
        );
        const cardBody = document.getElementById(`body_${card.id}`);
        cardBody.appendChild(newButton);
      });
    };

    request.addEventListener("load", whenRequestLoads);

    const artistId = card.id.slice(7)
    console.log(artistId)

    const url = `/tattoos/${card.id}/hashtags`;
    request.open("GET", url);
    request.send();
  });
};

window.addEventListener("load", createHashtags);
