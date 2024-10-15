drop database ekali;

create database ekali;

use ekali;

create table mpampiasa(
    id int(11) not null auto_increment,
    nom varchar(100) not null,
    prenom varchar(250) not null,
    pwd varchar(250) not null,
    idPS varchar(100) not null,
    karazana boolean default 0,
    -- 0 = False = USAGER -- 1 = TRUE = ADMIN
    primary key(id),
    unique index `id_unique` (`id` desc),
    unique index `idPS_unique` (`idPS`)
) ENGINE = InnoDB AUTO_INCREMENT = 40 DEFAULT CHARSET = latin1;

create table loka(
    id int(11) not null auto_increment,
    nom varchar(300) not null,
    idM int(11) not null,
    primary key(id),
    unique index `id_unique` (`id` desc), 
    index `mpampiasa_idx` (`idM` desc),
    constraint idM foreign key (idM) references ekali.mpampiasa(id) on delete CASCADE on update CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 40 DEFAULT CHARSET = latin1;

create table nahandro(
    id int(11) not null auto_increment,
    nom varchar(300) not null,
    coms varchar(300) default null,
    idL int(11) not null,
    primary key(id),
    unique index `id_unique` (`id` desc),
    index `loka_idLx` (`idL` desc),
    constraint idL foreign key (idL) references ekali.loka(id) on delete CASCADE on update CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 40 DEFAULT CHARSET = latin1;

-- - CREATION UTILISATEUR ADMIN ------------------
insert into
    mpampiasa (nom, prenom, pwd, idPS, karazana)
values
    (
        'LEFORT',
        'Nomenjanahary Nuno',
        '$2b$10$8zSCozIrTJsiAVYxBTAL7OkITjn3XwNnns.0.btbkV6e4PMvz/oqu',
        -- 7590 
        'Trofel',
        1
    ),
    (
        'TROFEL',
        'Nomenjanahary Nono',
        '$2b$10$8zSCozIrTJsiAVYxBTAL7OkITjn3XwNnns.0.btbkV6e4PMvz/oqu',
        -- 7590 
        'Lefort',
        1
    );