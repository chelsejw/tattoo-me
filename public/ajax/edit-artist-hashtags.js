const checkboxes = document.querySelectorAll('input')
const artistId = document.querySelector(`.card`).id.slice(7);

console.log(artistId)

const tickHashtags = () => {

    let request = new XMLHttpRequest();

    const whenRequestLoads = ()=> {

      if (!request.responseText) {
        return;
      }

      const originalHashtags = JSON.parse(request.responseText);
      originalHashtags.forEach( hashtag=> {
            const toCheck = document.getElementById(`hashtag_${hashtag.hashtag_id}`);
            toCheck.checked = true;
      })
    }


    request.addEventListener("load", whenRequestLoads);
    const url = `/api/hashtags/artists/${artistId}/`;
    request.open("GET", url);
    request.send();

}


window.addEventListener("load", tickHashtags);