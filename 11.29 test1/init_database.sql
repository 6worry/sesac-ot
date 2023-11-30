-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT
);

-- 초기 사용자 추가
INSERT INTO users (id, username, password) VALUES
    (1, 'user1', 'pw1'),
    (2, 'user2', 'pw2');