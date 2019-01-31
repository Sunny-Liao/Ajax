var topics = ["Iron Man", "Captain America", "Hulk", "Black Widow"];

function alertTopicName() {
    var topicName = $(this).attr("data-name");
}

function renderButtons() {
    $(".topic").remove();
    for(var i=0; i < topics.length; i++){
    var a = $("<button>");
    a.addClass("topic");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#topics").append(a);
    var topictext= $("#topic-input").val().trim();

        if (topics[i] == topictext)
        {
            a.click(function( event ) {
                event.preventDefault();
              });
        }
    }
}




function displayGifs() {
    $(".gifs").remove();
    event.preventDefault();
    var topic = $(this).attr("data-name");
    var topictext= $("#topic-input").val().trim();
    if (topictext!="")
    {
        topic = topictext;
        $('input[id=topic-input]').val("");
    }
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=12&api_key=BQmEPCd82GKCM8l86NzxIXeeq5R4f9Wv";
        $.ajax({url: queryURL, method: "GET"}).done(function(response) {
            console.log(response.data);
            var results = response.data;
            for(var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class=gifs>");
                var topicGif = $("<img>");
                    topicGif.attr("src", results[i].images.original.url);
                    topicGif.attr("title", "Rating: " + results[i].rating);
                    topicGif.attr("data-animate", results[i].images.original.url);
                
                gifDiv.append(topicGif)
                $("#topics-view").prepend(gifDiv);

            }
        })
}

//buffered


$("#add-topic").on("click", function() {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
    displayGifs();
    return false;
});

$(document).on("click", ".topic", displayGifs);


renderButtons();

