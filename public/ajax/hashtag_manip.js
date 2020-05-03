const hashtagOptions = document.getElementById("hashtagOptions");
    const hashtagsField = document.getElementById("hashtags-selected");


let hashtagNo = 0;


const handleButtonClick = (e) => {
    e.preventDefault();
    
    if (hashtagsField.childNodes.length===3) {
        return alert(`You cannot add more than 3 hashtags!`)
    }


    hashtagNo++;
    const hashtagOptions = document.getElementById("hashtagOptions");

    const chosenHashtagId = hashtagOptions.value;

    const request = new XMLHttpRequest();

    const afterRequestLoads = () => {

        const hashtagObj = JSON.parse(request.responseText);

        const parentDiv = document.createElement('div');
        parentDiv.id = hashtagObj.hashtag_id


        const targetElem = document.getElementById(`option-${chosenHashtagId}`);
        targetElem.remove();
        const newButton = document.createElement("div");

        newButton.classList.value = "btn btn-sm btn-outline-light";
        newButton.innerText = ` x ` + hashtagObj.hashtag_name;


        const invisibleInput = document.createElement('input')
        invisibleInput.name = `hashtags`;
        invisibleInput.value = hashtagObj.hashtag_id;
        invisibleInput.type = "hidden"
        invisibleInput.id = `inputId_${hashtagObj.hashtag_id}`;
        parentDiv.appendChild(newButton);
        parentDiv.appendChild(invisibleInput)
        hashtagsField.append(parentDiv);

        parentDiv.addEventListener("click", () => {
            const replaceOption = document.createElement("option");
            replaceOption.id = `option-${hashtagObj.hashtag_id}`;
            replaceOption.value = hashtagObj.hashtag_id;
            replaceOption.innerText = hashtagObj.hashtag_name;
            hashtagOptions.appendChild(replaceOption);
            const targetDiv = document.getElementById(hashtagObj.hashtag_id);
            targetDiv.remove();
        });
    }

    const url = `/api/hashtags/${chosenHashtagId}`

    request.open("get", url);
    request.send();

    request.addEventListener("load", afterRequestLoads);

}

const addButton = document.getElementById('add-hashtag')

addButton.addEventListener("click", handleButtonClick);

const submitBtn = document.getElementById('submitBtn');

const submitHandler = (e)=> {
    console.log(hashtagsField.childNodes.length)
    if (hashtagsField.childNodes.length<1){
        alert(`Please select at least one hashtag.`)
        return e.preventDefault();
    }
}

submitBtn.addEventListener('click', submitHandler)

