console.log('currentUser-',JSON.parse(localStorage.getItem('currentUser')) );

let inputs = document.getElementsByTagName('input');

let users = JSON.parse(localStorage.getItem('users') );

let id=JSON.parse(localStorage.getItem('userid'));

let currentUser= JSON.parse(localStorage.getItem('currentUser') );

// Displaying user Info
let info=document.getElementById('info');
if(!currentUser) {
    alert('Login Again!');
    window.location.replace('./login.html');
}

info.innerHTML=`
    <div>
        Welcome Back ${currentUser[0].name}!
    </div>
    <div>
        Your Email ID : ${currentUser[0].email}
    </div>
`

let index=-1;

let change = document.getElementById('change');
change.addEventListener('click', changeData);

function changeData(event) {
    event.preventDefault();
    if(!currentUser) {
        alert('Login Again!');
        window.location.replace('./login.html');
        return;
    }
    let old = inputs[0].value;
    let newPass = inputs[1].value;
    newPass=newPass.trim();
    let confirm = inputs[2].value;

    let short=false;
    if(newPass.length<4) {
        short=true;
        alert("Password should contain at least 4 characters!");
    }

    //finding user from token in currentuser
    let token = id[1];
    for(let i=0;i<currentUser.length;i++) {
        if(currentUser[i].token === token) {
            index=i;
            break;
        }
    }

    if(!short && currentUser[index].pass === old) {
        if(newPass === confirm) {
            // changing password in currentUser data
            currentUser[index].pass=newPass;
            localStorage.setItem('currentUser',JSON.stringify(currentUser) );
            console.log('currentUser-',JSON.parse(localStorage.getItem('currentUser')) );

            // changing password in users data
            users[id[0]].pass=newPass;
            localStorage.setItem('users',JSON.stringify(users));
            console.log('users-',JSON.parse(localStorage.getItem('users')) );
            alert('Password changed successfully!');
        }
        else {
            alert('Passwords are not matching!');
        }
    }
    else if(!short) {
        alert("Wrong Passowrd!");
    } 
        
    inputs[0].value="";
    inputs[1].value="";
    inputs[2].value="";
}

let logout = document.getElementById('logout');
logout.addEventListener('click', removeCurrentUser);

function removeCurrentUser(event) {
    event.preventDefault();
    if(!currentUser) {
        window.location.replace('./login.html');
        return;
    }

    // removing user from currentUser
    currentUser.splice(index,1);
    localStorage.setItem('currentUser',JSON.stringify(currentUser) );
    console.log('currentUser-',JSON.parse(localStorage.getItem('currentUser')) );
    window.location.replace('./login.html');
}