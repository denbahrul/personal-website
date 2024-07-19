function getData() {                                      
    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let phone = document.getElementById("phoneInput").value;
    let subject = document.getElementById("SubjectInput").value;
    let message = document.getElementById("messageInput").value;

    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(message);

    document.getElementById("nameInput").value = '';
    document.getElementById("emailInput").value = '';
    document.getElementById("phoneInput").value = '';
    document.getElementById("SubjectInput").value = '';
    document.getElementById("messageInput").value = '';
}                                                       