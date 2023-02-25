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
    else if(password.length<0) {
        alert("Password should at least contain 4 characters!");
    }
    else if (password !== confirm) {
        alert("Passwords are not matching!");
    }
    else {
        data.push({
            'email':email,
            'pass':password,
            'name': name
        });
        saveData(data);
    }
}

function saveData(data) {
    if(!localStorage.getItem('users')) {
        console.log(`
        No users data present in  the local Storage. So,
        creating users in localStorage first and  and then saving the data into it`);
        localStorage.setItem('users',JSON.stringify(data));
    }

    else {
        console.log(`
        users data already present in the local Storage. So,
        just appending the new data to previous data`);
        let prevData = JSON.parse(localStorage.getItem('users'));
        let newData= prevData.concat(data);
        localStorage.setItem('users',JSON.stringify(newData));
    }
    window.location.replace('./login.html');
    console.log('users-',localStorage.getItem('users'));
}