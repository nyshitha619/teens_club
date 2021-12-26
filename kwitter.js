

function addUser() {
    user_name = document.getElementById("user_name").value;
    given_code = document.getElementById("password").value;
    room_name = given_code;
    
    localStorage.setItem("user_name", user_name);
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
    
}



function addParent() {

    user_name = "Adult";

    localStorage.setItem("user_name", user_name);

    window.location = "kwitter_room.html"
}

function parent() {
    window.location = "parentsCreate.html"
}