const cards = document.querySelectorAll('.card');

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
// }

// const createLocationSelection = () => {
//     const locationSelect = document.getElementById("locationsOptions");
//     let request = new XMLHttpRequest();

//     let responseHandler = () => {
//         const locationsArr = JSON.parse(request.responseText);
//         locationsArr.forEach((location) => {
//             const newOption = document.createElement("option");
//             newOption.innerText = location.location_name;
//             newOption.value = location.location_id;
//             locationSelect.appendChild(newOption);
//         });
//     };

//     request.addEventListener("load", responseHandler);
//     request.open("GET", "/api/locations");
//     request.send();
// };

// const createHashtagsSelection = () => {
//     const hashtagSelection = document.getElementById("hashtagOptions");
//     let responseHandler = () => {
//         const hashtagsArr = JSON.parse(request.responseText);
//         hashtagsArr.forEach((hashtag) => {
//             const newOption = document.createElement("option");
//             newOption.innerText = hashtag.hashtag_name;
//             newOption.value = hashtag.hashtag_id;
//             hashtagSelection.appendChild(newOption);
//         });
//     };

//     let request = new XMLHttpRequest();
//     request.addEventListener("load", responseHandler);
//     request.open("GET", "/api/hashtags");
//     request.send();
// };


window.addEventListener("load", createHashtags);