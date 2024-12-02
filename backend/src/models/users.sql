CREATE TABLE IF NOT EXISTS users (
    name varchar(50) UNIQUE not null,
    cpf VARCHAR(11) PRIMARY KEY,
    email VARCHAR(50) UNIQUE not null,
    password VARCHAR(255) not null,
    role INTEGER CHECK (role IN (1, 2, 3)) not null,
    dtbirth DATE,
    address VARCHAR(150),
    pnumber VARCHAR(11),
    accesscode VARCHAR(15)
);


CREATE TABLE users_plans (
    contractcode SERIAL,
    plancode INTEGER NOT NULL,
    user_cpf VARCHAR(11) NOT NULL,
    cdate DATE NOT NULL,
    expdate DATE NOT NULL,
    CONSTRAINT PK_users_plans PRIMARY KEY (contractcode),
    CONSTRAINT fk_plan_users_plan FOREIGN KEY (plancode) REFERENCES plans (plancode),
    CONSTRAINT fk_users_plans FOREIGN KEY (user_cpf) REFERENCES users (cpf)
);


create table modality (
    code SERIAL,
    name varchar(20),
    constraint pk_modality PRIMARY KEY (code),
);


create table days_of_week (
    code SERIAL,
    name varchar(20),
    constraint pk_days_of_week PRIMARY KEY (code)
);


CREATE TABLE IF NOT EXISTS schedules (
    wday numeric not null,
    starth TIME not null,
    endh TIME NOT NULL,
    constraint pk_schedules PRIMARY KEY (wday, starth, endh),
    constraint fk_schedules_wday Foreign Key (wday) REFERENCES days_of_week(code)
)


