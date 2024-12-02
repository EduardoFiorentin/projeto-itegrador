create table if not exists group_classes (
    code SERIAL UNIQUE,
    canceled BOOLEAN DEFAULT false not null,
    modality NUMERIC NOT NULL,
    teacher VARCHAR(11) not null, 
    wday numeric not null,  -- dia da semana
    starth TIME not null, -- hora de inicio
    endh TIME NOT NULL, -- hora de fim
    constraint pk_classes PRIMARY KEY (wday, starth, endh),
    constraint fk_classes_modality Foreign Key (modality) REFERENCES modality(code),
    constraint fk_classes_schedule Foreign Key (wday, starth, endh) REFERENCES schedules(wday, starth, endh),
    constraint fk_classes_teacher Foreign Key (teacher) REFERENCES users(cpf)
);


create table if not exists personal_classes (
    canceled BOOLEAN DEFAULT false not null,
    modality NUMERIC NOT NULL,
    teacher VARCHAR(11) not null, 
    student VARCHAR(11) not null, 
    
    wday numeric not null,  -- dia da semana
    starth TIME not null, -- hora de inicio
    endh TIME NOT NULL, -- hora de fim 
    cdate DATE NOT NULL, -- data (yy-mm-dddd) - vale para aulas de apenas uma data
    present BOOLEAN DEFAULT false not null
    
    constraint pk_personal_classes PRIMARY KEY (wday, starth, endh, cdate),
    constraint fk_classes_modality Foreign Key (modality) REFERENCES modality(code),
    constraint fk_classes_schedule Foreign Key (wday, starth, endh) REFERENCES schedules(wday, starth, endh),
    constraint fk_classes_teacher Foreign Key (teacher) REFERENCES users(cpf),
    constraint fk_classes_student Foreign Key (student) REFERENCES users(cpf)
);


create table if not exists classes_student (
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


create table if not exists request_classes (
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
)





