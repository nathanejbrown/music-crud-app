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
      console.log(data);
      location.reload();
    }).fail(function(err) {
      console.log(err);
    });
  });

})();
