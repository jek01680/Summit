function sendMail(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;
    var json = {
        "mailContent": `<h2>이름(회사명) : ${name} </h2><br>
                    메일 : ${email}<br>
                    연락처 : ${phone}<br>
                    ----문의사항----<br>
                    ${message}`
    };

    let submit = fetch(`${location.pathname}/sendMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(json)
    })
    .then(response => {
        console.log("response => ",response);
        return response.json();
    })
    .catch(error => {
        console.log("error => ", error);
    })
    .then(data => {
        console.log("data => ", data);
        document.getElementById("mailResult").textContent = data.message;
    })
}