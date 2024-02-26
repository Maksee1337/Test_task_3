create table employees
(
    id      serial
        primary key,
    name    varchar(50),
    surname varchar(50)
);

create table departments
(
    id   serial
        primary key,
    name varchar(50)
);

create table statements
(
    id          serial
        primary key,
    date        date,
    amount      numeric,
    employee_id integer
        references employees
            on update cascade on delete cascade
);

create table donations
(
    id          serial
        primary key,
    date        date,
    amount_in_usd      numeric,
    employee_id integer
        references employees
            on update cascade on delete cascade
);
