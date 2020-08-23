//A collection of event handlers linked to relivant DOM elements once the page has been loaded
//All event handlers are applied using jquery
//The elements are accesed via id and not by passing links to the elements

function mainSetup(){

//Runs script to set up the page header
headerSetUp();


$('input[name=startDate]').change(function(event){
    validateDateInput();
});

$('input[name=endDate]').change(function(event){
    validateDateInput();
});

//Add event
$('#event-build-form').submit(function(event){
    event.preventDefault();

    addEvent(
    $('input[name=name]').val(),
    $('textarea[name=description]').val(),
    $('input[name=category]').val(),
    $('input[name=keywords]').val(),
    $('input[name=location]').val(),
    $('input[name=startDate]').val(),
    $('input[name=endDate]').val(),
    $('input[name=videoURL]').val(),
    $('input[name=imageURL]').val());
});

//Event editor
$('#event-edit-form').submit(function(event){
    event.preventDefault();

    editEvent($('input[name=name]').val(),
    $('textarea[name=description]').val(),
    $('input[name=category]').val(),
    $('input[name=keywords]').val(),
    $('input[name=location]').val(),
    $('input[name=startDate]').val(),
    $('input[name=endDate]').val(),
    $('input[name=videoURL]').val(),
    $('input[name=imageURL]').val());
});

//Index
//Event handlers for the search functions on the index page
$('#event-search-input').focus(function(){

    $("#event-search-results").css("display", "block");
});

$(document).click(function(event){
    if(!event.target.closest("#event-search-box")){
        $("#event-search-results").css("display", "none");
    }
});

$('#event-search-input').on('input', function(event){

    var str = $('#event-search-input').val();

    if(str.length > 3){

        getSearchList(str);
    }
});

//Login
$('#login-form').submit(function(event){
    event.preventDefault();

    loginUser($('input[name=userName]').val(), $('input[name=password]').val());
});

//Registration
$('#reg-form').submit(function(event){
    event.preventDefault();

    addUser($('input[name=userName]').val(),
    $('input[name=password]').val(),
    $('select[name=title]').val(),
    $('input[name=firstName]').val(),
    $('input[name=lastName]').val(),
    $('select[name=gender]').val(),
    $('input[name=adress1]').val(),
    $('input[name=adress2]').val(),
    $('input[name=adress3]').val(),
    $('input[name=postcode]').val(),
    $('textarea[name=description]').val(),
    $('input[name=email]').val(),
    $('input[name=telephone]').val(),
    $('input[name=profileURL]').val());
});

//User page
$('#user-editor-form').submit(function(event){
    event.preventDefault();

    addUser($('input[name=userName]').val(),
    $('input[name=password]').val(),
    $('select[name=title]').val(),
    $('input[name=firstName]').val(),
    $('input[name=lastName]').val(),
    $('select[name=gender]').val(),
    $('input[name=adress1]').val(),
    $('input[name=adress2]').val(),
    $('input[name=adress3]').val(),
    $('input[name=postcode]').val(),
    $('textarea[name=description]').val(),
    $('input[name=email]').val(),
    $('input[name=telephone]').val(),
    $('input[name=profileURL]').val());
});

//user password recovery
$('#password-hint-form').submit(function(event){
    event.preventDefault();

    getPasswordHint($('input[name=userName]').val(), $('input[name=email]').val());
});
}