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

-- 상품 테이블 추가
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER
);

-- 초기 상품 추가
INSERT INTO products (id, name, price) VALUES
    (1, 'product1', '1000'),
    (2, 'product1', '2000'),
    (3, 'product1', '2500'),
    (4, 'product1', '1700');

-- 도서 테이블 추가
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    genre TEXT
);

-- 초기 도서 목록 추가
INSERT INTO books (id, title, author, genre) VALUES
    (1, 'book1', 'author1', 'Fiction'),
    (2, 'book2', 'author2', 'NON_Fiction'),
    (3, 'book3', 'author3', 'Fantasy');