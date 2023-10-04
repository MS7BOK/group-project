// Video search
$(document).ready(function(){
    var API_KEY = "AIzaSyDsy-oCrYD9qGw9tkzrSQ_Q1OX7QVU8oog";
    var video = '';

    $("#form").submit(function (event) {
        event.preventDefault();
        var search = $("#search").val();
        videoSearch(API_KEY, search, 4);
    });

    function videoSearch(key, search, maxResults) {
        // Clear previous content
        $("#videos").empty();

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data) {
            console.log(data);
            data.items.forEach(item => {
                video = `
                <iframe width="250" height="250" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `;
                $("#videos").append(video);
            });
        });
    }
});
