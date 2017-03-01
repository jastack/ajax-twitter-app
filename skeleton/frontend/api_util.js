const toggleFollow = () => {
  this.followState = "true";
  this.render();
};

const APIUtil = {
  followUser: id => {
    $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: 'json',
      // success: () => {
      //   this.followState = "true";
      //   this.render();
      // }
    }).then(toggleFollow);
  },

  unfollowUser: id => {
    $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: 'json',
      success: () => {
        this.followState = "false";
        this.render();
      }
    });
  }
};

module.exports = {
  APIUtil: APIUtil,
  toggleFollow: toggleFollow
};
