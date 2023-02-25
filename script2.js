console.log('users-',JSON.parse(localStorage.getItem('users')) );
console.log('currentUSer-',JSON.parse(localStorage.getItem('currentUser')));

let inputs = document.getElementsByTagName('input');

let users = JSON.parse(localStorage.getItem('users'));

let login = document.getElementById('login');
login.addEventListener('click', validate);


function validate(event) {
    event.preventDefault();
    let email = inputs[0].value;
    let password = inputs[1].value;

    let flag = false;
    let id = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            if (users[i].pass === password) {
                id = i;
                flag = true;
                break;
            }
        }
    }
    if (flag) {
        console.log("matched");

        savecurrentUser(id);
    }
    else {
        alert("Email or Password is wrong!");
    }

}

function savecurrentUser(id) {
    let email = users[id].email;
    let pass = users[id].pass;
    let name = users[id].name;
    let token = "";

    // generating random token 

    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    while (token.length != 16) {
        let ran = parseInt(Math.random() * str.length);
        token = token + str.charAt(ran);
    }

    // currentuserId
    let userId = [id,token];
    localStorage.setItem('userid', JSON.stringify(userId));

    let data = [{
        'email': email,
        'pass': pass,
        'name': name,
        'token': token
    }]

    // creating currentUser localStorage
    localStorage.setItem('currentUser',JSON.stringify(data));

    window.location.replace('./dashboard.html');
}