create table users (
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

create table days_of_week (
    code numeric,
    name varchar(20),
    constraint pk_days_of_week PRIMARY KEY (code)
);

CREATE TABLE schedules (
    wday numeric not null,
    starth TIME not null,
    endh TIME NOT NULL,
    constraint pk_schedules PRIMARY KEY (wday, starth, endh),
    constraint fk_schedules_wday Foreign Key (wday) REFERENCES days_of_week(code)
);

create table modality (
    code numeric,
    name varchar(20),
    constraint pk_modality PRIMARY KEY (code)
);

create table request_classes (
    status varchar(8) not null check (status in ('pendent','rejected','accepted')),
    student_cpf varchar(11) not null,
    teacher_cpf varchar(11) not null,
    data DATE NOT NULL,
    wday numeric not null,
    starth TIME not null,
    endh TIME not null,
    modality numeric not null,
    constraint pk_class_requests primary key (data, wday, starth, endh),
    constraint fk_class_req_student foreign key (student_cpf) REFERENCES users(cpf),
    constraint fk_class_req_teacher foreign key (teacher_cpf) REFERENCES users(cpf),
    constraint fk_class_req_schedule foreign key (wday, starth, endh) references schedules(wday, starth, endh)
);

create table group_classes (
    code SERIAL UNIQUE,
    canceled BOOLEAN DEFAULT false not null,
    modality NUMERIC NOT NULL,
    teacher VARCHAR(11) not null, 
    wday numeric not null,  -- dia da semana
    starth TIME not null, -- hora de inicio
    endh TIME NOT NULL, -- hora de fim
    constraint pk_classes PRIMARY KEY (wday, starth, endh),
    constraint fk_classes_modality_grp Foreign Key (modality) REFERENCES modality(code),
    constraint fk_classes_schedule Foreign Key (wday, starth, endh) REFERENCES schedules(wday, starth, endh),
    constraint fk_classes_teacher Foreign Key (teacher) REFERENCES users(cpf)
);

create table classes_student (
    -- class_code INTEGER,
    wday numeric not null,
    starth TIME not null,
    endh TIME not null,
    student_cpf varchar(11),
    date DATE not null, 
    present boolean DEFAULT false not null,
    constraint pk_classes_student PRIMARY KEY (wday, starth, endh, student_cpf, date),
    constraint fk_classes_student_classes FOREIGN KEY (wday, starth, endh) REFERENCES group_classes(wday, starth, endh),
    constraint fk_classes_student_users FOREIGN KEY (student_cpf) REFERENCES users(cpf)
);

create table personal_classes (
    canceled BOOLEAN DEFAULT false not null,
    modality NUMERIC NOT NULL,
    teacher VARCHAR(11) not null, 
    student VARCHAR(11) not null, 
    
    wday numeric not null,  -- dia da semana
    starth TIME not null, -- hora de inicio
    endh TIME NOT NULL, -- hora de fim 
    cdate DATE NOT NULL, -- data (yy-mm-dddd) - vale para aulas de apenas uma data
    present BOOLEAN DEFAULT false not null,
    
    constraint pk_personal_classes PRIMARY KEY (wday, starth, endh, cdate),
    constraint fk_classes_modality_pers Foreign Key (modality) REFERENCES modality(code),
    constraint fk_classes_schedule Foreign Key (wday, starth, endh) REFERENCES schedules(wday, starth, endh),
    constraint fk_classes_teacher Foreign Key (teacher) REFERENCES users(cpf),
    constraint fk_classes_student Foreign Key (student) REFERENCES users(cpf)
);

create table plans (
    name VARCHAR(100), 
    plancode SERIAL, 
    wclasses NUMERIC not null,
    totalvalue NUMERIC(6, 2) not null, 
    months numeric not null, 
    active BOOLEAN not null,
    renewable BOOLEAN not null,
    constraint pk_plans PRIMARY KEY (plancode)
);


create table users_plans (
    contractcode SERIAL,
    plancode INTEGER NOT NULL,
    user_cpf VARCHAR(11) NOT NULL,
    cdate DATE NOT NULL,
    expdate DATE NOT NULL,
    CONSTRAINT PK_users_plans PRIMARY KEY (contractcode),
    CONSTRAINT fk_plan_users_plan FOREIGN KEY (plancode) REFERENCES plans (plancode),
    CONSTRAINT fk_users_plans FOREIGN KEY (user_cpf) REFERENCES users (cpf)
);


create table access_hist (
    code serial, 
    dttime TIMESTAMP DEFAULT NOW(),
    user_cpf VARCHAR(11) not null,
    granted BOOLEAN not null, 
    descr varchar(150) null, 
    constraint pk_access_hist PRIMARY KEY (code),
    constraint fk_access_user FOREIGN KEY (user_cpf) REFERENCES users(cpf)
);


create table physical_limitations (
    cpf VARCHAR(11) not null,
    code serial,
    descr varchar(256) not null,
    constraint pk_phys_limit PRIMARY KEY (code),
    constraint fk_phys_lim_user FOREIGN KEY (cpf) REFERENCES users(cpf)
);  

create table recover_code (
    code NUMERIC,
    owner varchar(11) not null,
    reqdate TIMESTAMP DEFAULT now() not null,
    valdate TIMESTAMP,
    constraint pk_recover_code PRIMARY KEY (code),
    constraint fk_reccode_owner FOREIGN KEY (owner) REFERENCES users(cpf)
);

create table evaluations (
    wday numeric,
    starth time, 
    endh time, 
    cdate date,
    student_cpf varchar(11),
    constraint pk_evaluations PRIMARY KEY (wday, starth, endh, cdate, student_cpf),
    constraint fk_eval_sched FOREIGN KEY (wday, starth, endh) REFERENCES schedules(wday, starth, endh),
    constraint fk_eval_student FOREIGN KEY (student_cpf) REFERENCES users(cpf)
);

create table modality_interest (
    student varchar(11),
    modcode numeric not null,
    constraint pk_mod_int PRIMARY KEY (student, modcode),
    constraint fk_modint_student FOREIGN KEY (student) REFERENCES users(cpf),
    constraint fk_modint_modality FOREIGN KEY (modcode) REFERENCES modality(code)
);

-- cadastra planos da academia 
insert into plans (name, wclasses, totalValue, months, active, renewable) VALUES
('1x por semana - mensal', 1, 115.00, 1, true, true),
('1x por semana - semestral', 1, 586.50, 6, true, true),
('1x por semana - anual', 1, 966.00, 12, true, true),
('2x por semana - mensal', 2, 165.00, 1, true, true),
('2x por semana - semestral', 2, 841.25, 6, true, true),
('2x por semana - anual', 2, 1386.00, 12, true, true),
('3x por semana - mensal', 3, 185.00, 1, true, true),
('3x por semana - semestral', 3, 943.50, 6, true, true),
('3x por semana - anual', 3, 1554.00, 12, true, true),
('4x por semana - mensal', 4, 195.00, 1, true, true),
('4x por semana - semestral', 4, 994.50, 6, true, true),
('4x por semana - anual', 4, 1638.00, 12, true, true),
('livre - mensal', -1, 215.00, 1, true, true),
('livre - semestral', -1, 1095.00, 6, true, true),
('livre - anual', -1, 1806.00, 12, true, true);

-- cadastra padronização para dias da semana
insert into days_of_week (name, code) VALUES
('Segunda-Feira', 1),
('Terça-Feira', 2),
('Quarta-Feira', 3),
('Quinta-Feira', 4),
('Sexta-Feira', 5),
('Sábado', 6),
('Domingo', 7);

-- cadastra modalidades disponíveis para aulas 
insert into modality (name, code) values 
('Boxe Clássico', 1),
('Boxe Básico', 2),
('Kids', 3),
('Pré Spar', 4),
('Café Marcial', 5),
('Sparring', 6),
('Sparring Clássico', 7),
('Boxe Fitness', 8);

-- cadastra horarios disponíveis para agendamento de aula 
insert into schedules (wday, starth, endh) VALUES 
-- segunda
(1, '07:00', '07:59'),
(1, '08:00', '08:59'),
(1, '09:00', '09:59'),
(1, '10:00', '10:59'),
(1, '11:00', '11:59'),
(1, '12:10', '13:10'),
(1, '15:30', '15:59'),
(1, '16:00', '16:59'),
(1, '18:15', '19:15'),
(1, '19:20', '20:20'),
(1, '20:30', '20:59'),
(1, '21:00', '21:59'),
(1, '22:45', '23:30'),
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


-- adiciona usuários de administração do sistema 
insert into users (name, cpf, email, password, role, dtbirth, address, pnumber, accesscode) values
-- secretaria
('Emanuela Gelain Piana', '00000000001', 'emanuela@gmail.com', 'emanuela', 1, '2000-02-10', 'Rua A, 33', '54999990004', '69'),
--professores
('Juliano Cesa', '00000000002', 'juliano@gmail.com', 'juliano', 2, '2000-02-10', 'Rua B, 23', '54999990002', '87'),
('Marcos', '00000000003', 'marcos@gmail.com', 'marcos', 2, '2000-02-10', 'Rua C, 13', '54999990003', '12'),
('João Vitor Puerari Basilista', '00000000004', 'joao@gmail.com', 'joao', 2, '2000-02-10', 'Rua D, 53', '54999990005', '155'),
--alunos
('Fabricio Maia', '00000000005', 'fabricio@gmail.com', 'fabricio', 3, '1950-02-10', 'Rua F, 53', '54999990015', '135'),
('Eduardo Vinicius Fiorentin', '00000000006', 'eduardo@gmail.com', 'eduardo', 3, '2004-03-10', 'Rua G, 53', '54999990025', '174');


-- cadastra o plano para os alunos 
insert into users_plans (plancode, user_cpf, cdate, expdate) VALUES
(3, '00000000005', '2024-12-10', '2025-12-10'),
(1, '00000000006', '2024-12-10', '2025-01-10');


-- cadastra alguns interesses para os alunos 
insert into modality_interest (student, modcode) values
('00000000005', 1),
('00000000005', 4),
('00000000006', 6),
('00000000006', 8);

insert into physical_limitations (cpf, descr) values 
('00000000005', 'Hernia de disco');

-- adiciona as aulas recorrentes da semana 
INSERT INTO group_classes (modality, teacher, wday, starth, endh) VALUES
(1, '00000000004', 1, '12:10:00', '13:10:00'),
(7, '00000000004', 1, '16:00:00', '16:59:00'),
(1, '00000000003', 1, '18:15:00', '19:15:00'),
(1, '00000000003', 1, '19:20:00', '20:20:00'),
(8, '00000000003', 1, '20:30:00', '20:59:00'),
(3, '00000000002', 2, '08:00:00', '08:59:00'),
(1, '00000000002', 2, '09:00:00', '09:59:00'),
(1, '00000000004', 2, '16:00:00', '16:59:00'),
(1, '00000000004', 2, '18:15:00', '19:15:00'),
(1, '00000000003', 2, '19:20:00', '20:20:00'),
(1, '00000000003', 2, '20:30:00', '20:59:00'),
(1, '00000000003', 2, '22:45:00', '23:30:00'),
(2, '00000000002', 3, '09:00:00', '09:59:00'),
(8, '00000000003', 3, '12:10:00', '13:10:00'),
(1, '00000000004', 3, '16:00:00', '16:59:00'),
(1, '00000000004', 3, '18:15:00', '19:15:00'),
(1, '00000000003', 3, '19:20:00', '20:20:00'),
(4, '00000000003', 3, '21:00:00', '21:59:00'),
(1, '00000000002', 4, '07:00:00', '07:59:00'),
(3, '00000000002', 4, '08:00:00', '08:59:00'),
(1, '00000000002', 4, '09:00:00', '09:59:00'),
(1, '00000000004', 4, '16:00:00', '16:59:00'),
(1, '00000000004', 4, '18:15:00', '19:15:00'),
(1, '00000000003', 4, '19:20:00', '20:20:00'),
(1, '00000000003', 4, '20:30:00', '20:59:00'),
(1, '00000000003', 4, '22:45:00', '23:30:00'),
(1, '00000000002', 5, '10:00:00', '10:59:00'),
(4, '00000000002', 5, '11:00:00', '11:59:00'),
(1, '00000000003', 5, '12:10:00', '13:10:00'),
(1, '00000000004', 5, '16:00:00', '16:59:00'),
(1, '00000000004', 5, '18:15:00', '19:15:00'),
(7, '00000000003', 5, '19:20:00', '20:20:00'),
(2, '00000000002', 6, '07:00:00', '07:59:00'),
(4, '00000000002', 6, '08:00:00', '08:59:00'),
(5, '00000000002', 6, '09:00:00', '09:59:00'),
(6, '00000000002', 6, '10:00:00', '10:59:00'),
(8, '00000000002', 1, '10:00:00', '10:59:00');


