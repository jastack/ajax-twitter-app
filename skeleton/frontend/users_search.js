const APIUtil = require ('./api_util.js');

class UsersSearch {

  constructor ($el){
    this.$el = $el;
    this.input = $el.children().eq(0).val();
    this.ul = $el.children().eq(1);
    this.$el.on("keypress", this.handleInput.bind(this));
    this.renderResults();
  }

  handleInput(e) {
    APIUtil.searchUsers(e.target.value + e.key, "hello");
  }

  renderResults() {
    (this.ul).forEach((user) => {
      $("ul.users").append("<li><a href=`/users/${user.id}`>${user.username}</a></li>");
    });
  }
}

module.exports = UsersSearch;
