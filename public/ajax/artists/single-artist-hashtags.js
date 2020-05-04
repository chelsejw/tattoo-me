const artistCard = document.querySelector(".card");

const tattooCards = document.getElementById("artist-gallery").childNodes;

const hashtagButton = (text, url) => {
  const link = document.createElement("a");
  link.href = url;
  const button = document.createElement("button");
  button.classList.value = "btn btn-sm btn-dark ";
  button.style.margin = "0 5px 5px 0";
  button.innerText = text;
  link.appendChild(button);
  return link;
};

const createTattooHashtags = () => {
  tattooCards.forEach((cardDiv) => {

    let card = cardDiv.childNodes[0]
    let request = new XMLHttpRequest();
    console.log(card);
    const tattooId = card.id.slice(9);
    console.log(`tattoo id is ${tattooId}`)
    const whenRequestLoads = () => {
      //If no hashtags are found, do not do dom manipulation.
      if (!request.responseText) {
        return;
      }

      const hashtagsArr = JSON.parse(request.responseText);

      hashtagsArr.forEach((hashtag) => {
        const newButton = hashtagButton(
          `#${hashtag.hashtag_name}`,
          `/tattoos?hashtagId=${hashtag.hashtag_id}`
        );
        const cardBody = document.getElementById(`body_${tattooId}`);
        cardBody.appendChild(newButton);
      });
    };

    request.addEventListener("load", whenRequestLoads);
    const url = `/tattoos/${tattooId}/hashtags`;
    request.open("GET", url);
    request.send();
  });
};

const createArtistHashtags = () => {

    const artistId = artistCard.id.slice(7);

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
        const cardBody = document.getElementById(`artist_body_${artistId}`);
        cardBody.appendChild(newButton);
      });
    };

    request.addEventListener("load", whenRequestLoads);

    const url = `/api/hashtags/artists/${artistId}`;
    request.open("GET", url);
    request.send();

};



const createHashtags = ()=>{

  createTattooHashtags();
  createArtistHashtags();

}

window.addEventListener("load", createHashtags);
