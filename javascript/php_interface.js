//Interface for adding events to database
function addEvent(eventName, description, category, keywords, location, startDate, endDate, videoURL, imageURL){
    $.post("php/event_add.php", 
    {
        userId: sessionStorage.getItem("userId"),
        userName: sessionStorage.getItem("userName"),
        password: sessionStorage.getItem("userPassword"),
        name: eventName,
        description: description,
        category: category,
        keywords: keywords,
        location: location,
        startDate: startDate,
        endDate: endDate,
        videoURL: videoURL,
        imageURL: imageURL

    },
    function(data, status, xhr){

        if(!isNaN(data)){
            document.location.href = "index.html";
        } else {
            sendErr(data);
        }

    }, "text");
}
//Interface for deleting events from database
function deleteEvent(eventId){
    $.post("php/event_delete.php", 
    {
        sUserId: sessionStorage.getItem("userId"),
        sUserName: sessionStorage.getItem("userName"),
        sPassword: sessionStorage.getItem("userPassword"),
        eventId: eventId
    },
    function(data, status, xhr){
        conLog(data);

        if(data === 'true'){
            document.location.href = "index.html";
        } else {
            sendErr(data);
        }

    }, "text");
}
//Interface for editing events in database
function editEvent(eventId, eventName, description, category, keywords, location, startDate, endDate, videoURL, imageURL){
    $.post("php/event_edit.php", 
    {
        sUserId: sessionStorage.getItem("userId"),
        sUserName: sessionStorage.getItem("userName"),
        sPassword: sessionStorage.getItem("userPassword"),
        eventId: eventId,
        name: eventName,
        description: description,
        category: category,
        keywords: keywords,
        location: location,
        startDate: startDate,
        endDate: endDate,
        videoURL: videoURL,
        imageURL: imageURL
    },
    function(data, status, xhr){

        if(data === 'true'){
            document.location.href = "event_page.html?eventId=" + eventId;
        } else {
            sendErr(data);
        }

    }, "text");
}
//Interface for getting a spesific range of events from the database
function getEventRange(userId, parElement){
    $.post("php/event_get_range.php", 
    {
        userId: userId,
        orderBy: $('#event-order-select').val(),
        limit: $('#event-limit-extendor').val()
    },
    function(data, status, xhr){

        try{
            appendEventList(JSON.parse(data), parElement);
        } catch  (e){
            sendErr(data + e);
        }

    }, "text");
}
//Interface for getting a singular event from the database
function getEvent(eventId){
    $.post("php/event_get.php", 
    {
        eventId: eventId
    },
    function(data, status, xhr){

        if(data !== 'false'){
            populateEventData(JSON.parse(data));
        } else {
            sendErr(data);
        }

    }, "text");
}
//Interface for editing user info in database
function editUser(userName, password, title, firstName, lastName, adress1, adress2, adress3, postcode, description, email, telephone, profileURL){
    $.post("php/user_edit.php", 
    {
        sUserId: sessionStorage.getItem("userId"),
        sUserName: sessionStorage.getItem("userName"),
        sPassword: sessionStorage.getItem("userPassword"),
        userName: userName,
        password: password,
        title: title,
        firstName: firstName,
        lastName: lastName,
        adress1: adress1,
        adress2: adress2,
        adress3: adress3,
        postcode: postcode,
        description: description,
        email: email,
        telephone: telephone,
        profileURL: profileURL
    },
    function(data, status, xhr){

        if(data === 'true'){
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("password", password);
        } else {
            sendErr(data);
        }

    }, "text");
}
//Interface for getting a users info from the database
function getUser(type){
    $.post("php/user_get.php", 
    {
        sUserId: sessionStorage.getItem("userId"),
        sUserName: sessionStorage.getItem("userName"),
        sPassword: sessionStorage.getItem("userPassword"),
    },
    function(data, status, xhr){
        conLog(data);

        if(data !== 'false'){

            populateUserEditor(JSON.parse(data));
        }

    }, "text");
}
//Interface for getting the users id from database to log in
function loginUser(userName, password){
    $.post("php/user_login.php", 
    {
        userName: userName,
        password: password
    },
    function(data, status, xhr){

        if(!isNaN(data)){
            sessionStorage.setItem("userId", parseInt(data));
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("userPassword", password);
            document.location.href = "index.html";
        } else {
            sendErr(data);
        }

    }, "text");
}
//Interface for adding new users to database
function addUser(userName, password, title, firstName, lastName, gender, adress1, adress2, adress3, postcode, description, email, telephone, profileURL){
    $.post("php/user_register.php", 
    {
        userName: userName,
        password: password,
        title: title,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        adress1: adress1,
        adress2: adress2,
        adress3: adress3,
        postcode: postcode,
        description: description,
        email: email,
        telephone: telephone,
        profileURL: profileURL
    },
    function(data, status, xhr){

        if(data === 'true'){
            loginUser(userName, password);
        } else {
            sendErr(data);
        }
    }, "text");
}
//Interface for verifiing user data with data in the database
function verifyUser(session){
    $.post("php/user_verify.php", 
    {
        userId: sessionStorage.getItem("userId"),
        userName: sessionStorage.getItem("userName"),
        password: sessionStorage.getItem("userPassword"),
    },
    function(data, status, xhr){

        if(data !== 'true'){
            sendErr(data);
            document.location.href = "login.html";
        }

    }, "text");
}
//Interface for verifiing if a user name s alreadey in use
function verifyUserName(userName){
    $.post("php/username_verify.php", 
    {
        userName: userName,

    },
    function(data, status, xhr){

        if(data === 'true'){
            sendErr("Name already taken");
            $('input[name=userName]').val("");
        }

    }, "text");
}
//Interface to find events which are simular to an inputed string
function getSearchList(str){
    $.post("php/event_search.php", 
    {
        str: str,
    },
    function(data, status, xhr){

        try{
            appendSearchList(JSON.parse(data));
        } catch  (e){
            sendErr(data + e);
        }

    }, "text");
}
//Interface to provide the user password hints
function getPasswordHint(userName, email){
    $.post("php/user_password_recov.php", 
    {
        userName: userName,
        email: email
    },
    function(data, status, xhr){

        try{
            showPaswordHint(JSON.parse(data));
        } catch  (e){
            sendErr(data);
        }

    }, "text");
}