const passwordValidation = (pass, confirmPass) => {
    if(pass.length < 6) {
        e.preventDefault();
        alert("Parola trebuie sa aiba cel putin 6 caractere.");
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
    } else {
        if(pass !== confirmPass) {
            e.preventDefault();
            alert("Parolele trebuie sa fie identice");
            document.getElementById("password").value = "";
            document.getElementById("confirm-password").value = "";
        }
    }
}

document.getElementById('submit-button').addEventListener('click', (e) => {

    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;    
    
    passwordValidation(password, confirmPassword);
});