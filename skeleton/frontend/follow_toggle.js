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
    } else if (this.followState === "true") {
      this.$el.html("Unfollow!");
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.followState === "false"){
      APIUtil.followUser(this.userId).then(() => this.toggleFollow());
    } else {
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
