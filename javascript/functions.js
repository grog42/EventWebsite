
//Logs a err string to console and err page elements
function sendErr(str){
    conLog(str);

    $(".err-box").html(str);
}

//Logs a string to console
function conLog(str){
    console.log(str);
}

//Takes a url string as a paramater and reads the GET data from it
function getUrlParams(url){

    param = url.substr(url.search("=") + 1)
    return param;
}

//Header is set up based on if the user is logged in
function headerSetUp(){

    if(sessionStorage.length > 0){
        $("#user-butt").text("User page");
        $("#user-butt").attr("href","user_page.html");

        $("#regi-butt").text("Logout");
        $("#regi-butt").click(function(event){
            event.preventDefault();
            logoutUser();
        });
    }
}

//Session data is cleared and user is redirected to the index page
function logoutUser(){
    sessionStorage.clear();
    document.location.href = "index.html";
}

//Dates are compared is the start date is after the end date the input is cleared
function validateDateInput(){

    if($('input[name=startDate]').val() != "" && $('input[name=endDate]').val() != "" && $('input[name=startDate]').val() > $('input[name=endDate]').val()){

        $('input[name=startDate]').val("");
        $('input[name=endDate]').val("");
        sendErr("Start later than end date");
    }
}

//Event is loaded and displayed in DOM elements
function populateEventData(event){

    if(Date.parse(event['end_date']) < Date.now()){

        $("#event-name-dis").text(event["event_name"] + " - Event ended");
    } else {
        $("#event-name-dis").text(event["event_name"]);
    }

    if(sessionStorage.getItem("userId") === event['user_id']){
        $("#event-name-dis").append("<button class='common-button' onclick='deleteEvent("+ event['event_id'] +")'>Delete</button>");
    }

    $("#event-date-dis").text(event["start_date"] + " - " + event["end_date"]);
    $("#event-location-dis").text(event["location"]);
    $("#event-keywords-dis").text(event["keywords"]);
    $("#event-desc-dis").text(event["event_description"]);
    $("#event-video-dis").attr("src", decodeURIComponent(event["video_url"]));
    $(".event-image").attr("src", decodeURIComponent(event["image_url"]));
}

//A collection of events are loaded onto DOM elements
function appendEventList(eventArray, parElement){

    $(".event-display").remove();

    for(var i = 0; i < eventArray.length; i++){
        parElement.append(buildEventDisplay(eventArray[i]));
    }
}

//New DOM elements are genderated to display an events information
function buildEventDisplay(event){
    var displayBox = document.createElement("a");

    displayBox.id = "event" + event["event_id"];
    displayBox.setAttribute("class", "event-display common-box");
    displayBox.setAttribute("href", "event_page.html?event=" + event['event_id']);

    var htmlStr = "<b>" + event['event_name'] + " (" + event['start_date'] + " - " + event['end_date'] + ")</b>";
    htmlStr += "<div><img class='event-image' src='" + decodeURIComponent(event['image_url']) + "'></div>";
    htmlStr += "<div><p>Keywords:<br>" + event['keywords'] + "</p></div>";
    if(sessionStorage.getItem("userId") === event['user_id']){
        htmlStr += "<small>*Your event</small>";
    }

    displayBox.innerHTML = htmlStr;
    return displayBox;
}

function populateEventEditor(event){

    $('input[name=name]').val(event['event_name']);
    $('textarea[name=description]').val(event['event_description']);
    $('input[name=category]').val(event['event_category']);
    $('input[name=keywords]').val(event['keywords']);
    $('input[name=location]').val(event['location']);
    $('input[name=videoURL]').val(decodeURIComponent(event['video_url']));
    $('input[name=imageURL]').val(decodeURIComponent(event['image_url']));
    $('input[name=startDate]').val(event['start_date']);
    $('input[name=endDate]').val(event['end_date']);
}

function populateUserEditor(user){

    $('input[name=userName]').val(user['username']);
    $('input[name=password]').val(user['PASSWORD']);
    $('select[name=title]').val(user['title']);
    $('input[name=firstName]').val(user['first_name']);
    $('input[name=lastName]').val(user['last_name']);
    $('select[name=gender]').val(user['gender']);
    $('input[name=adress1]').val(user['adress1']);
    $('input[name=adress2]').val(user['adress2']);
    $('input[name=adress3]').val(user['adress3']);
    $('input[name=postcode]').val(user['postcode']);
    $('textarea[name=description]').val(user['description']);
    $('input[name=email]').val(user['email']);
    $('input[name=telephone]').val(user['telephone']);
    $('input[name=profileURL]').val(decodeURIComponent(user['profile_url']));
}

//Events found by the search function are connected to the DOM
function appendSearchList(eventArray){

    $('#event-search-results').empty();

    for(var i = 0; i < eventArray.length; i++){

        var eventLink = document.createElement("a");
        eventLink.setAttribute("href", "event_page.html?event=" + eventArray[i]['event_id']);
        eventLink.innerText = eventArray[i]['event_name'];
        eventLink.className = "search-result";

        $('#event-search-results').append(eventLink);
        $('#event-search-results').show();
    }
}

function showPaswordHint(event){

    var hint = event['PASSWORD'];
    $('#password-hint-display').text(hint.slice(0,4));
}

