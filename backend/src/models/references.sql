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


create table access_hist (
    code serial, 
    dttime TIMESTAMP DEFAULT NOW(),
    user_cpf VARCHAR(11) not null,
    granted BOOLEAN not null, 
    descr varchar(150) null, 
    constraint pk_access_hist PRIMARY KEY (code),
    constraint fk_access_user FOREIGN KEY (user_cpf) REFERENCES users(cpf)
)

