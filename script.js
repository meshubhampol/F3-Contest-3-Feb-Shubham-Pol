// if current user is present then directly redirect to dashboard
let user= JSON.parse(localStorage.getItem('currentUser'));
if(user) {
    window.location.replace('./dashboard.html');
}

let inputs = document.getElementsByTagName('input');

const data = [];

let signup = document.getElementById('signup');
signup.addEventListener('click', validate);

function validate(event) {
    event.preventDefault();
    let name = inputs[0].value;
    let email = inputs[1].value;
    let password = inputs[2].value;
    password=password.trim();
    let confirm = inputs[3].value;

    let emailValid=email.indexOf("@");
    let emailDot=email.lastIndexOf(".");
    name=name.trim();

    if(name.length==0) {
        alert("Name should not be empty!");
    }
    else if(emailValid === -1 || emailValid === 0 || emailDot<emailValid || emailDot === emailValid+1 ||
        email.substr(emailDot+1).length === 0 ) {
        alert("Email should be valid!");
    }
    else if(password.length<4) {
        alert("Password should contain at least 4 characters!");
    }
    else if (password !== confirm) {
        alert("Passwords are not matching!");
    }
    else {
        // checking for duplicate email
        let user=JSON.parse(localStorage.getItem('users'));
        if(user) {
            for(let i=0;i<user.length;i++) {
                if(user[i].email === email) {
                    alert("This Email is already registered! Please Login!");
                    window.location.replace('./login.html');
                    return;
                }
            }
        }

        data.push({
            'email':email,
            'pass':password,
            'name': name
        });
        saveData(data);
    }
}

function saveData(data) {
    // adding user to currentUser
    localStorage.setItem('users',JSON.stringify(data));
    window.location.replace('./login.html');
    console.log('users-',localStorage.getItem('users'));
}