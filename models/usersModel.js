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
    });
}

User.getAll = (result) => {
    sql.query("SELECT * FROM tb_users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
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

        result({ kind: "users not found" })
    });
}

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE tb_users SET email = ?, username = ?, password = ? WHERE userId = ?",
        [user.email, user.username, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
}

module.exports = User;