exports.seed = function(knex, Promise) {
  return knex('songs').del()
    .then(function() {
      return Promise.all([
        knex('songs')
        .insert({title: 'Guns for Hands', artist: 'Twenty One Pilots', album: 'Vessel'}),
        knex('songs')
        .insert({title: 'Blacktop', artist: 'Julien Baker', album: 'Sprained Ankle'}),
        knex('songs')
        .insert({title: 'Wild Horses', artist: 'Bishop Briggs', album: 'Wild Horses'})
      ]);
    });
};
