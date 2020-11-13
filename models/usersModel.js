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

User.findOne = (id, rows) => {
    sql.query(`SELECT * FROM tb_users WHERE userId = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            rows(err, null);
            return;
        }

        if (res.length) {
            console.log("found users: ", res[0]);
            rows(null, res[0]);
            return;
        }
    })
}

module.exports = User;