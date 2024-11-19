-- Active: 1731703969351@@localhost@5432@integrador@public
CREATE TABLE IF NOT EXISTS users (
    name varchar(50) UNIQUE not null,
    cpf VARCHAR(11) PRIMARY KEY,
    email VARCHAR(50) UNIQUE not null,
    password VARCHAR(20) not null,
    role INTEGER CHECK (role IN (1, 2, 3)) not null
)

drop table schedules;
drop table days_of_week;

CREATE TABLE IF NOT EXISTS schedules (
    wday numeric not null,
    starth TIME not null,
    endh TIME NOT NULL,
    constraint pk_schedules PRIMARY KEY (wday, starth, endh),
    constraint fk_schedules_wday Foreign Key (wday) REFERENCES days_of_week(code)
)

CREATE table days_of_week (
    name VARCHAR(20),
    code NUMERIC PRIMARY KEY
)

create table modality (
    code numeric PRIMARY KEY,
    name VARCHAR(20)
)

create table class_types (
    code NUMERIC PRIMARY KEY,
    name varchar(20)
)

create table if not exists classes (
    code SERIAL,
    canceled BOOLEAN DEFAULT false not null,
    type NUMERIC not null,
    modality NUMERIC NOT NULL,
    teacher VARCHAR(11) not null, 
    
    wday numeric not null,  -- dia da semana
    starth TIME not null, -- hora de inicio
    endh TIME NOT NULL, -- hora de fim 
    cdate DATE not null, -- data (yy-mm-dddd) - vale para aulas de apenas uma data
    recurrent BOOLEAN not null, -- vale para aulas que acontecem toda semana
    
    constraint pk_classes PRIMARY KEY (code),
    constraint fk_classes_modality Foreign Key (modality) REFERENCES modality(code),
    constraint fk_classes_type Foreign Key (type) REFERENCES class_types(code),
    constraint fk_classes_schedule Foreign Key (wday, starth, endh) REFERENCES schedules(wday, starth, endh),
    constraint fk_classes_teacher Foreign Key (teacher) REFERENCES users(cpf)
);

create table if not exists classes_student (
    class_code INTEGER,
    student_cpf varchar(11), 
    constraint pk_classes_student PRIMARY KEY (class_code, student_cpf),
    constraint fk_classes_student_classes FOREIGN KEY (class_code) REFERENCES classes(code),
    constraint fk_classes_student_users FOREIGN KEY (student_cpf) REFERENCES users(cpf)
);

drop table classes;

insert into classes ( type, modality, wday, starth, endh, cdate, teacher) values 
(1, 4, 1, '07:00:00', '07:59:00', '2024-11-19', 'teste');

insert into class_types(code, name) values 
(1, 'Personal'),
(2, 'Grupo');

insert into days_of_week (name, code) VALUES
('Segunda-Feira', 1),
('Terça-Feira', 2),
('Quarta-Feira', 3),
('Quinta-Feira', 4),
('Sexta-Feira', 5),
('Sábado', 6),
('Domingo', 7);

insert into modality (name, code) values 
('Boxe Clássico', 1),
('Boxe Básico', 2),
('Kids', 3),
('Pré Spar', 4),
('Café Marcial', 5),
('Sparring', 6),
('Sparring Clássico', 7),
('Boxe Fitness', 8);


insert into schedules (wday, starth, endh) VALUES 
-- segunda
-- (1, '07:00', '07:59'),
-- (1, '08:00', '08:59'),
-- (1, '09:00', '09:59'),
-- (1, '10:00', '10:59'),
-- (1, '11:00', '11:59'),
-- (1, '12:10', '13:10'),
-- (1, '15:30', '15:59'),
-- (1, '16:00', '16:59'),
-- (1, '18:15', '19:15'),
-- (1, '19:20', '20:20'),
-- (1, '20:30', '20:59'),
-- (1, '21:00', '21:59'),
-- (1, '22:45', '23:30'),
-- terca
(2, '07:00', '07:59'),
(2, '08:00', '08:59'),
(2, '09:00', '09:59'),
(2, '10:00', '10:59'),
(2, '11:00', '11:59'),
(2, '12:10', '13:10'),
(2, '15:30', '15:59'),
(2, '16:00', '16:59'),
(2, '18:15', '19:15'),
(2, '19:20', '20:20'),
(2, '20:30', '20:59'),
(2, '21:00', '21:59'),
(2, '22:45', '23:30'),
-- segunda
(3, '07:00', '07:59'),
(3, '08:00', '08:59'),
(3, '09:00', '09:59'),
(3, '10:00', '10:59'),
(3, '11:00', '11:59'),
(3, '12:10', '13:10'),
(3, '15:30', '15:59'),
(3, '16:00', '16:59'),
(3, '18:15', '19:15'),
(3, '19:20', '20:20'),
(3, '20:30', '20:59'),
(3, '21:00', '21:59'),
(3, '22:45', '23:30'),
-- segunda
(4, '07:00', '07:59'),
(4, '08:00', '08:59'),
(4, '09:00', '09:59'),
(4, '10:00', '10:59'),
(4, '11:00', '11:59'),
(4, '12:10', '13:10'),
(4, '15:30', '15:59'),
(4, '16:00', '16:59'),
(4, '18:15', '19:15'),
(4, '19:20', '20:20'),
(4, '20:30', '20:59'),
(4, '21:00', '21:59'),
(4, '22:45', '23:30'),
-- segunda
(5, '07:00', '07:59'),
(5, '08:00', '08:59'),
(5, '09:00', '09:59'),
(5, '10:00', '10:59'),
(5, '11:00', '11:59'),
(5, '12:10', '13:10'),
(5, '15:30', '15:59'),
(5, '16:00', '16:59'),
(5, '18:15', '19:15'),
(5, '19:20', '20:20'),
(5, '20:30', '20:59'),
(5, '21:00', '21:59'),
(5, '22:45', '23:30'),
-- segunda
(6, '07:00', '07:59'),
(6, '08:00', '08:59'),
(6, '09:00', '09:59'),
(6, '10:00', '10:59'),
(6, '11:00', '11:59'),
(6, '12:10', '13:10'),
(6, '15:30', '15:59'),
(6, '16:00', '16:59'),
(6, '18:15', '19:15'),
(6, '19:20', '20:20'),
(6, '20:30', '20:59'),
(6, '21:00', '21:59'),
(6, '22:45', '23:30'),
-- segunda
(7, '07:00', '07:59'),
(7, '08:00', '08:59'),
(7, '09:00', '09:59'),
(7, '10:00', '10:59'),
(7, '11:00', '11:59'),
(7, '12:10', '13:10'),
(7, '15:30', '15:59'),
(7, '16:00', '16:59'),
(7, '18:15', '19:15'),
(7, '19:20', '20:20'),
(7, '20:30', '20:59'),
(7, '21:00', '21:59'),
(7, '22:45', '23:30');

drop table users;




-- grant all on all tables in schema public to integrador;

insert into users (name, cpf, email, password, role) values
-- ('Fabricio','00000000001','fabricio@fabricio.com','fabricio', 1),
('Eduardo','00000000000','eduardo@eduardo.com','eduardo', 2),
('Joao','00000000004','joao@joao.com','joao', 3)

select * from users;