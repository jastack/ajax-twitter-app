const APIUtil = require ('./api_util.js');

class FollowToggle {
  constructor($el) {
    console.log($el);
    // console.log($el.attr("data-user-id"));
    // console.log($($el).attr("data-initial-follow-state"));
    this.userId = $el.attr("data-user-id");
    this.followState = $el.attr("data-initial-follow-state");
    this.$el = $el;
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "false") {
      this.$el.html("Follow!");
      this.$el.attr("disabled", false);
    } else if (this.followState === "true") {
      this.$el.html("Unfollow!");
      this.$el.attr("disabled", false);
    } else if (this.followState === "following") {
      this.$el.attr("disabled", true);
      this.followState = "false";
    } else if (this.followState === "unfollowing") {
      this.$el.attr("disabled", true);
      this.followState = "true";
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.followState === "false"){
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then(() => this.toggleFollow());
    } else {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then(() => this.toggleFollow());
    }

  }

  toggleFollow() {
    if (this.followState === "true"){
      this.followState = "false";
    } else {
      this.followState = "true";
    }
    this.render();
  }
}

module.exports = FollowToggle;
