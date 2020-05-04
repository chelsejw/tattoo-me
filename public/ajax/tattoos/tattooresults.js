const cards = document.querySelectorAll('.card');
const cookies = document.cookie.split("; ").reduce((prev, current) => {
  const [name, value] = current.split("=");
  prev[name] = value;
  return prev;
}, {});


const hashtagButton = (text, url) => {

    const link = document.createElement('a');
    link.href = url;
    const button = document.createElement("button");
    button.classList.value = "btn btn-sm btn-dark ";
    button.style.margin = "0 5px 5px 0"
    button.innerText = text;
    link.appendChild(button)
    return link;
}

const createHashtags = () => {

    cards.forEach(card => {
        let request = new XMLHttpRequest();
        const tattooId = card.id.slice(9);
        const whenRequestLoads = () => {

            //If no hashtags are found, do not do dom manipulation.
            if (!request.responseText) {
                return;
            }

            const hashtagsArr = JSON.parse(request.responseText);

            hashtagsArr.forEach(hashtag => {

                const newButton = hashtagButton(`#${hashtag.hashtag_name}`, `/tattoos?hashtagId=${hashtag.hashtag_id}`);
                const cardBody = document.getElementById(`body_${tattooId}`)
                cardBody.appendChild(newButton);

            })

        }

        request.addEventListener("load", whenRequestLoads);
        const url = `/tattoos/${tattooId}/hashtags`
        request.open("GET", url);
        request.send();
    })
};


window.addEventListener("load", createHashtags);

const makeLikeBtn = (likeStatus, tattooId) => {
    const likeButton = document.createElement("button");

    if (!likeStatus) {
        likeButton.classList.value = "btn btn-sm btn-danger";
        likeButton.innerText = "Like";
    } else if (likeStatus) {
        likeButton.classList.value = "btn btn-sm btn-warning";
        likeButton.innerText = "Unlike";
    }
    likeButton.onclick = function (event) {
        const button = event.target;
        event.preventDefault();
        const status = event.target.innerText;

        function afterLike() {
            button.classList.value = "btn btn-sm btn-warning";
            button.innerText = "Unlike";
        }

        function afterUnlike() {
            button.classList.value = "btn btn-sm btn-danger";
            button.innerText = "Like";
        }

        const data = {
          tattooId: tattooId,
        };

        if (status == "Like") {
            let likeRequest = new XMLHttpRequest();
            let likeUrl = `/likes`;
            likeRequest.open("POST", likeUrl);
            likeRequest.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );

            console.log(`data`, data);
            const stringifiedData = JSON.stringify(data);
            likeRequest.send(stringifiedData);
            afterLike();


        } else if (status == "Unlike") {
            let unlikeRequest = new XMLHttpRequest();
            let unlikeUrl = `/likes`;
            unlikeRequest.open("DELETE", unlikeUrl);
            unlikeRequest.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );

            console.log(`data`, data);
            const stringifiedData = JSON.stringify(data);
            unlikeRequest.send(stringifiedData);
            afterUnlike();
        }
    };

    return likeButton;
};

if (cookies.currentUserType == "user") {
    const userId = cookies.currentAccountId;

    cards.forEach((card) => {
        const tattooId = parseInt(card.id.slice(9));
        let request = new XMLHttpRequest();

        const whenRequestLoads = () => {
            const userLiked = JSON.parse(request.responseText);
            const likeDiv = document.getElementById(
                `tattoo_like_btn_${tattooId}`
            );
            const likeBtn = makeLikeBtn(userLiked, tattooId);
            likeDiv.appendChild(likeBtn);
        };

        request.addEventListener("load", whenRequestLoads);
        const url = `/api/check/likes/${userId}/${tattooId}`;
        request.open("GET", url);
        request.send();
    });
}