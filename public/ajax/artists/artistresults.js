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

const cookies = document.cookie.split("; ").reduce((prev, current) => {
    const [name, value] = current.split("=");
    prev[name] = value;
    return prev;
}, {});

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

const followingButton = (followStatus, artistId) => {
    const followButton = document.createElement('button');

    if (!followStatus) {
        followButton.classList.value = 'btn btn-sm btn-primary';
        followButton.innerText = 'Follow'
    } else if (followStatus) {
        followButton.classList.value = "btn btn-sm btn-warning";
        followButton.innerText = "Unfollow";
    }
    followButton.onclick = function (event) {
        const button = event.target
        event.preventDefault();
        const status = event.target.innerText;

        function afterFollow() {
            button.classList.value = "btn btn-sm btn-warning";
            button.innerText = "Unfollow";
        };

        function afterUnfollow() {
            button.classList.value = 'btn btn-sm btn-primary';
            button.innerText = 'Follow'
        }


        if (status == 'Follow') {
            let followRequest = new XMLHttpRequest();
            let followUrl = `/following`;
            followRequest.open("POST", followUrl);
            followRequest.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            const data = {
                artistId: artistId
            }
            console.log(`data`, data);
            const stringifiedData = JSON.stringify(data);
            followRequest.send(stringifiedData);
            afterFollow();


        } else if (status == "Unfollow") {
            let unfollowRequest = new XMLHttpRequest();
            let unfollowUrl = `/following`;
            unfollowRequest.open("DELETE", unfollowUrl);
            unfollowRequest.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            const data = {
                artistId: artistId
            }
            console.log(`data`, data);
            const stringifiedData = JSON.stringify(data);
            unfollowRequest.send(stringifiedData);
            afterUnfollow();
        }
    }

    return followButton;
}


if (cookies.currentUserType == 'user') {
    const userId = cookies.currentAccountId;

    cards.forEach(card => {
        const artistId = parseInt(card.id.slice(7));
        let request = new XMLHttpRequest;

        const whenRequestLoads = () => {

            const userIsFollowing = JSON.parse(request.responseText);
            const followDiv = document.getElementById(`artist_follow_btn_${artistId}`)
            const followBtn = followingButton(userIsFollowing, artistId)
            followDiv.appendChild(followBtn);
        }

        request.addEventListener("load", whenRequestLoads);
        const url = `/api/check/following/${userId}/${artistId}`;
        request.open("GET", url);
        request.send();
    });
}