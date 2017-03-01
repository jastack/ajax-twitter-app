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
      $.ajax({
        method: "POST",
        url: `/users/${this.userId}/follow`,
        dataType: 'json',
        success: () => {
          this.followState = "true";
          this.render();
        }
      });
    } else {
      $.ajax({
        method: "DELETE",
        url: `/users/${this.userId}/follow`,
        dataType: 'json',
        success: () => {
          this.followState = "false";
          this.render();
        }
      });


    }

  }
}

module.exports = FollowToggle;
