var gifs = ["United States", "Spain", "Argentina", "Japan", "Nigeria", "New Zealand"];

// FUNCTION TO DISPLAY THE BUTTONS
function renderButtons() {

    //Empty the buttons. 
    $("#buttons-view").empty()

    // Loop to create the buttons
    for (var i = 0; i < gifs.length; i++) {
        $("#buttons-view").append("<button class='bttn rounded bg-info border-0 text-white' value='" + gifs[i] + "'>" + gifs[i] + "</button>")
    }
}


//FUNCTION TO CREATE A NEW BUTTON
$("#find-gif").on("click", function (event) {
    event.preventDefault();

    //New var from the imput
    var newgif = $("#gif-input").val().trim();

    //push var to gifs array
    gifs.push(newgif)
    console.log(gifs)

    //render the buttons
    renderButtons();

    //Empty out field. 
    $('#gif-input').val('');
});

//FUNCTION TO ADD THE GIFS
function displaygifs() {
    console.log("we did it")

    //grab the attribute value of the button and assign it to a variable. 
    var gif = $(this).attr("value");
    console.log(gif)

    // Here we construct our URL
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=F8ARbzWb2CHANbIZg7iveAAqvhJQeVGq"
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        for (var i = 0; i < 10; i++) {
            var a = $("<div class='rating'>");
            a.append("<p>" + response.data[i].rating + "</p>")
            a.append("<img datavalue='" + gif + i + "' class='gifbttn' src='" + response.data[i].images.fixed_height.url + "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' state='animate' >")
            $("#add-gif").prepend(a)
        }
    })

}

//FUNCTION TO PAUSE GIFS
function pausegifs() {
    console.log("clikedit")
    var state = $(this).attr("state")
    console.log(state)
    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
    }
    else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("state", "animate");
    }
}

$(document).on("click", ".bttn", displaygifs);
$(document).on("click", ".gifbttn", pausegifs);
renderButtons()
