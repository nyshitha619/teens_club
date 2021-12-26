var firebaseConfig = {
      apiKey: "AIzaSyAZIkRb1FvahbNdWw2zFnedGEClTS9BRaE",
      authDomain: "chat-f611c.firebaseapp.com",
      databaseURL: "https://chat-f611c-default-rtdb.firebaseio.com",
      projectId: "chat-f611c",
      storageBucket: "chat-f611c.appspot.com",
      messagingSenderId: "751525676075",
      appId: "1:751525676075:web:18b10f2cf20854a96d166e"
};


firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {
      var today = new Date();
      var date = (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date + ' ' + time;

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0,
            Time: dateTime
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        time = message_data['Time'];
                        name_with_tag = "<h4 class='message_h4' id='user'>" + name + "</h4>"
                        Time_with_tag = "<h4 class='message_h4' id='time'>" + time + "</h4>"
                        message_with_tag = "<h4 class= 'message_h4'>" + message + "</h4>"
                        like_button = "<button id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)' class='btn btn-primary like'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> " + like + "</span></button><hr>"
                        row = Time_with_tag + name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("user clicked like button - " + message_id);
      var likes = '1';
      var message_like_id;

      //User like update
      firebase.database().ref("/" + room_name).child(message_id).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  userLikeData = childSnapshot.val();
                  userName = userLikeData.name;
                  console.log(userName, userLikeData.name);
                  if (userName === user_name) {
                        message_like_id = userLikeData.key;
                        console.log('inside userName');
                        like = userLikeData.like;
                        if (like == '1') {
                              likes = '0';
                        } else {
                              likes = '1';
                        }
                  }
            });
      })

      if (message_like_id) {
            firebase.database().ref(room_name).child(message_id).child(message_like_id).update({
                  like: likes
            });
      } else {
            firebase.database().ref(room_name).child(message_id).push({
                  like: likes,
                  name: user_name
            });
      }

      console.log('totalLikes: ', totalLikes);


      //Total Like update

      button_id = message_id;
      var totalLikes = document.getElementById(button_id).value;

      if (likes == '1') {
            totalLikes = Number(totalLikes) + 1;
      } else {
            totalLikes = Number(totalLikes) - 1;
      }

      firebase.database().ref(room_name).child(message_id).update({
            like: totalLikes,
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
