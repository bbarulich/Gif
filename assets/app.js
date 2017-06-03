$(document).ready(function() {
  
  var sports = [
    "football", "baseball", "soccer", "basketball", "golf", "hockey",
  ];

  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  }
  $(document).on("click", ".sports-button", function() {
    $("#sports").empty();
    $(".sports-button").removeClass("active");
    $(this).addClass("active");
    var type = $(this).attr("data-type");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var sportsDiv = $("<div class=\"sports-item\">");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var sportsImage = $("<img>");
        sportsImage.attr("src", still);
        sportsImage.attr("data-still", still);
        sportsImage.attr("data-animate", animated);
        sportsImage.attr("data-state", "still");
        sportsImage.addClass("sports-image");
        sportsDiv.append(p);
        sportsDiv.append(sportsImage);
        $("#sports").append(sportsDiv);
      }
    });
  });
  $(document).on("click", ".sports-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  $("#add-sports").on("click", function(event) {
    event.preventDefault();
    var newsports = $("input").eq(0).val();
    if (newsports.length > 2) {
      sports.push(newsports);
    }
    populateButtons(sports, "sports-button", "#sports-buttons");
  });
  populateButtons(sports, "sports-button", "#sports-buttons");
});