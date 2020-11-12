const sql = require('../config/db');

// constructor
const User = function (user) {
    this.username = user.username,
        this.email = user.email,
        this.password = user.password

};

User.create = (newUser) => {
    sql.query("INSERT INTO tb_users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error", err);
            return;
        }
        console.log("Register Success", { id: res.insertId, ...newUser }); // ini response dari mysql
    })
}

module.exports = User;