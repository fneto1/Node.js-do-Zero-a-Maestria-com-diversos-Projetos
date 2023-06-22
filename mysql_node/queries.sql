create database nodemysql;
use nodemysql;

create table books (
	id int not null primary key auto_increment,
    title varchar(255),
    pageqty int
);

select * from books