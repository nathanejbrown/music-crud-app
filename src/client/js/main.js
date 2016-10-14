(function () {

  $('.delete').on('click', function() {
    let songId = $(this).data('id');
    let songTitle = $(this).data('title');
    let songArtist = $(this).data('artist');
    let songAlbum = $(this).data('album');
    console.log(songTitle, songArtist, songAlbum);
    var doubleCheck = confirm (`Are you sure you want to delete ${songTitle} by ${songArtist}?`);

    if (doubleCheck) {
      $.ajax ({
        url: '/songs/' + songId,
        method: 'DELETE'
      }).done(function(data) {
        var deletedSong = data.id;
        $('.message').text(data.message);
        $('.message').css('display', 'block');
        $('tr#' + deletedSong).css('display', 'none');
      }).fail(function(err) {
        console.log(err);
      });
    }
  });

  $('.update').on('click', function() {
    $('.modal').css('display', 'block');
    $('#input-id').val($(this).data('id'));
  });

  $('#modal-form').on('submit', function(e) {
    e.preventDefault();
    var songId = $('#input-id').val();
    var updateObject = {
      title: $('#input-title').val() || null,
      artist: $('#input-artist').val() || null,
      album: $('#input-album').val() || null
    };
    $.ajax({
      url: '/songs/' + songId,
      method: 'PUT',
      data: updateObject
    }).done(function(data) {
      location.reload();
    }).fail(function(err) {
      console.log(err);
    });
  });

  $(document).ready(function() {
    var images = ['https://hd.unsplash.com/photo-1452456972043-e3fd21612d9f', 'https://hd.unsplash.com/photo-1470447149612-a1ed521fbcae', 'https://images.unsplash.com/photo-1474420955179-b061b669ba2f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=004a934a707998cf61299f0f87da3d62', 'https://images.unsplash.com/photo-1474432377109-8d2d5109c1d2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=9e5995ec3f00f13c9d8f75a6059055c1', 'https://hd.unsplash.com/photo-1422034681339-7b5dbb46db18'];

    var randomNumber = Math.floor(Math.random() * images.length);
    var bgImg = 'url(' + images[randomNumber] + ')';
    $('body').css('background-image', bgImg);

  });

})();
