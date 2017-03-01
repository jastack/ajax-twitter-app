

const APIUtil = {
  followUser: id => (
    $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: 'json',
      // success: () => {
      //   this.followState = "true";
      //   this.render();
      // }
    })
  ),

  unfollowUser: id => (
    $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: 'json'
    })
  )
};

// exports.method = toggleFollow;
module.exports = APIUtil;
