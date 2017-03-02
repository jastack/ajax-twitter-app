const APIUtil = require ('./api_util.js');

class UsersSearch {

  constructor ($el){
    this.$el = $el;
    this.input = $el.children().eq(0).val();
    this.ul = $el.children().eq(1);
    this.$el.on("keyup", this.handleInput.bind(this));
  }

  handleInput(e) {
    APIUtil.searchUsers(e.target.value, "hello").then((res) => this.renderResults(res));
  }

  renderResults(res) {
    $("ul.users").empty();
    res.forEach((user) => {
      $("ul.users").append(`<li><a href=/users/${user.id}>${user.username}</a></li>`);
    });
  }
}

module.exports = UsersSearch;
