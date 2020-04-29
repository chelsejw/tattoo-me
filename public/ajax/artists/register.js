const createLocationSelection = () => {
    const locationSelect = document.getElementById("locationsOptions");
    let request = new XMLHttpRequest();

    let responseHandler = () => {
        const locationsArr = JSON.parse(request.responseText);
        locationsArr.forEach((location) => {
            const newOption = document.createElement(
                "option"
            );
            newOption.innerText =
                location.location_name;
            newOption.value =
                location.location_id;
            locationSelect.appendChild(
                newOption
            );
        });
    };

    request.addEventListener(
        "load",
        responseHandler
    );
    request.open("GET", "/api/locations");
    request.send();
};

const createHashtagsSelection = () => {

    const hashtagSelection = document.getElementById("hashtagOptions");
    let responseHandler = () => {
        const hashtagsArr = JSON.parse(request.responseText);
        hashtagsArr.forEach((hashtag) => {
            const newOption = document.createElement("option");
            newOption.innerText = hashtag.hashtag_name;
            newOption.value = hashtag.hashtag_id;
            hashtagSelection.appendChild(newOption);
        });
    };

    let request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", "/api/hashtags");
    request.send();
};

const createAllElements = () => {
    createHashtagsSelection();
    createLocationSelection();
};

window.addEventListener("load", createAllElements);