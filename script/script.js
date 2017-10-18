$(document).ready(function (){

  function searchHero() {
    $('.series-list').html('');
    $('.hero-list').html('');
    var hero = $('#hero-input').val();
    $.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + hero + '&ts=123&apikey=953f87b0af7b9bd5e2b1774a351e93e6&hash=d733650d32153d6031201df0e73e5065', function(data) {
      if (data.data.results[0] == undefined) {
        $('.hero-list').append('<p class="alert">Aucune héros n\'a été trouvé.</p>');
      }
      else {
        $('.hero-list').append('<ul>');
        $.each(data.data.results, function(index, value) {
          var heroName = data.data.results[index].name.toUpperCase();
          var heroThumbnail = data.data.results[index].thumbnail.path + '.' + data.data.results[0].thumbnail.extension;
          var heroID = data.data.results[index].id;
          $('.hero-list').append('<li data-id="' + heroID + '"><figure><figcaption>' + heroName + '</figcaption><img src="' + heroThumbnail + '" alt="' + heroName+ '"></figure></li>');
        });
        $('.hero-list').append('</ul>');
        $('.hero-list').append('<p class="info">Cliquez sur le héros de votre choix pour découvrir dans quelle série il apparait.');
      };
    });
  }

  function searchSeries(element) {
    $('.series-list').html('');
    $.get('https://gateway.marvel.com:443/v1/public/characters/' + element.data('id') + '/series?&ts=123&apikey=953f87b0af7b9bd5e2b1774a351e93e6&hash=d733650d32153d6031201df0e73e5065', function(data) {
      if (data.data.results[0] == undefined) {
        $('.series-list').append('<p class="alert">Aucune série n\'a été trouvée pour ce héros.</p>');
      }
      else {
        $('.series-list').append('<ul>');
        $.each(data.data.results, function(index, value) {
          var comicsName = data.data.results[index].title.toUpperCase();
          var comicsThumbnail = data.data.results[index].thumbnail.path + '.' + data.data.results[0].thumbnail.extension;
          $('.series-list').append('<li><figure><figcaption>' + comicsName + '</figcaption><img src="' + comicsThumbnail + '" alt="' + comicsName+ '"></figure></li>');
        });
        $('.series-list').append('</ul>');
      };
    });
  }

  $('#hero-submit').on('click', function () {
      searchHero();
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 13 && $('#hero-input').is(':focus')) {
      searchHero();
    }
  });

  $('.hero-list').on('click', 'li', function () {
    searchSeries($(this));
  });



});
