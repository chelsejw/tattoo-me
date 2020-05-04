

const submitBtn = document.getElementById('submitBtn');

const checkboxes = document.getElementsByName('hashtags');



const submitHandler = (e)=> {

    let checkedCount = 0;

    checkboxes.forEach(checkbox=>{
        if (checkbox.checked===true){
            checkedCount++;
        }
    });

    if (checkedCount < 1){
        e.preventDefault();
        alert(`Please select at least one hashtag.`)
    }

}

submitBtn.addEventListener('click', submitHandler)

