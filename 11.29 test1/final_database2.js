const sqlite3 = require("sqlite3");

class Database {
  constructor(dbname) {
    this.db = new sqlite3.Database(dbname);
  };
  //데이터 테이블 생성
  createTable() {
    return new Promise((resolve, reject) => {
      //지연처리되는 코드를 작성할 수 있는 것
      this.db.run(
        `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                email TEXT
                )`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
  //데이터 삽입)(CREATE)
  insertUser(newUser) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO users (username, email)Values (?, ?)",
        [newUser.username, newUser.email],
        function (err) {
          if (err) {
            console.error("데이터 삽입 실패");
            reject(err);
          } else {
            console.log("데이터 삽입 성공:", this.lastID);
            resolve();
          }
        }
      );
    });
  };

  //데이터 수정 (UPDATE)
  updateUser(updateUser) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "UPDATE users SET username=?, email=? WHERE id=?",
        [updateUser.username, updateUser.email, updateUser.id],
        (err) => {
          if (err) {
            console.error("수정 실패", err);
            reject(err);
          } else {
            console.log("수정 성공");
            resolve();
          }
        }
      );
    });
  }

  //데이터 삭제(DELETE)
  deleteUser(delUser) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM users WHERE id=?", [delUser.id], (err) => {
        if (err) {
          console.error("삭제 실패");
          reject(err);
        } else {
          console.log("삭제 성공");
          resolve();
        }
      });
    });
  }

  //데이터 조회 (Read)
  readUser() {
    return new Promise((resolve, reject) => {
      this.db.each("SELECT * FROM users", (err, row) => {
        if (err) {
          console.error("쿼리실패");
          reject(err);
        } else {
          console.log("All Users:", row);
          resolve();
        }
      });
    });
  }
  close() {
    this.db.close();
  }
}

module.exports = Database;
