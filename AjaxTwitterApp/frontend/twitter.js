const FollowToggle = require ('./follow_toggle.js');
const UsersSearch = require ('./users_search.js');

$(() => {
  $('button.follow-toggle').each(function(index) {
    new FollowToggle($(this));
  });
  $('nav.users-search').each(function() {
    new UsersSearch($(this));
  });
});
