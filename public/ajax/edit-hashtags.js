const tickHashtags = () => {

    let request = new XMLHttpRequest();

    const tattooId = document.querySelector('.card').id.slice(9);

    const whenRequestLoads = ()=> {

      const originalHashtags = JSON.parse(request.responseText);

      originalHashtags.forEach( hashtag=> {
            const toCheck = document.getElementById(`hashtag_${hashtag.hashtag_id}`);
            toCheck.checked = true;
      })
    }


    request.addEventListener("load", whenRequestLoads);
    const url = `/tattoos/${tattooId}/hashtags`;
    request.open("GET", url);
    request.send();

}


window.addEventListener("load", tickHashtags);