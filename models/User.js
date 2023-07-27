'use strict';
// Class User để đại diện cho thông tin của người dùng
class User {
  constructor({ firstName, lastName, username, password }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
  getAcronymName() {
    let fullName = `${this.lastName} ${this.firstName}`;
    fullName = fullName.split(' ');
    const firstName = fullName.pop();
    const acronym = fullName.reduce(
      (result, word) => result + word[0].toUpperCase(),
      ''
    );
    return firstName + acronym;
  }
}
