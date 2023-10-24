-- MYSQL --

-- Create the schema before running this code in mysql enviroment

-- Table user ------------------------------------------
create table tb_user (
	user_id int auto_increment not null,
    user_name varchar(50) not null,
    user_role varchar(10) not null,
    user_password text,
    account_id text,
    provider nvarchar(10) not null,
    avatar text,
    phone_number nvarchar(20),
    address text,
    rate int,
    create_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted bool not null,
    constraint pk_user primary key (user_id)
);

alter table tb_user auto_increment = 1000,
alter column user_role set default "user",
modify column is_deleted bool default false;
--------------------------------------------------------

-- Table social links of user --------------------------
create table tb_social_links (
	user_sl_id int auto_increment not null,
	user_id int not null,
    link text not null,
    is_deleted bool not null,
    constraint pk_sl primary key (user_sl_id),
    constraint fk_sl foreign key (user_id) references tb_user(user_id)
);

alter table tb_social_links auto_increment = 1000,
modify column is_deleted bool default false;
--------------------------------------------------------

-- table category --------------------------------------
create table tb_category (
	category_id int auto_increment not null,
    category_name nvarchar(100) not null,
    constraint pk_ctg primary key (category_id)
);

alter table tb_category auto_increment = 1000;
--------------------------------------------------------

-- table category child --------------------------------
-- create table tb_category_child (
-- 	id_category_child int not null,
--     category_child_name nvarchar(100) not null,
--     constraint pk_ctg_c primary key (id_category_child)
-- );
--------------------------------------------------------

-- Table product ---------------------------------------
create table tb_product (
	product_id int auto_increment not null,
    user_id int not null,
    category_id int not null,
    product_name nvarchar(255) not null,
    price bigint not null,
    description text,
    state nvarchar(50) not null,
    create_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted bool not null,
    constraint pk_product primary key (product_id),
    constraint fk_product_u foreign key (user_id) references tb_user(user_id),
    constraint fk_product_ctg foreign key (category_id) references tb_category(category_id)
);

alter table tb_product auto_increment = 1000,
alter column state set default "còn hàng",
modify column is_deleted bool default false;
--------------------------------------------------------

-- Table product images --------------------------------
create table tb_product_images (
	product_img_id int auto_increment not null,
	product_id int not null,
    image_link text not null,
    type nvarchar(10) not null,
    is_deleted bool not null,
    constraint pk_p_i primary key (product_img_id),
    constraint fk_p_i foreign key (product_id) references tb_product(product_id)
);

alter table tb_product_images auto_increment = 1000,
modify column is_deleted bool default false;
--------------------------------------------------------

-- Table favorite --------------------------------------
create table tb_favorite (
	user_id int not null,
    product_id int not null,
    constraint pk_fv primary key (product_id, user_id),
    constraint fk_fv_p foreign key (product_id) references tb_product(product_id),
    constraint fk_fv_u foreign key (user_id) references tb_user(user_id)
);
--------------------------------------------------------

-- Table order -----------------------------------------
create table tb_order (
	user_id int not null,
    product_id int not null,
    create_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    state nvarchar(100) not null,
    constraint pk_order primary key (user_id, product_id),
    constraint fk_order_u foreign key (user_id) references tb_user(user_id),
    constraint fk_order_p foreign key (product_id) references tb_product(product_id)
);

alter table tb_order
alter column state set default "đang xử lý";
--------------------------------------------------------

-- Insert new data -------------------------------------
insert into tb_user (user_name, provider, avatar, phone_number, address) values ("vinh thanh", "google", 
"https://cdn.chotot.com/cF0tOBS0g0NiVGfUdarOnuFaHY5l3msXY2bkgRndklg/preset:listing/plain/7274771d608b08694c4257ae9ea74eb2-2839824952567390247.jpg",
"0337083194", "Nam Tu Liem, Ha Noi");

insert into tb_user (user_name, provider, avatar, phone_number, address) values ("Huu Tuan", "google", 
"https://cdn.chotot.com/cF0tOBS0g0NiVGfUdarOnuFaHY5l3msXY2bkgRndklg/preset:listing/plain/7274771d608b08694c4257ae9ea74eb2-2839824952567390247.jpg",
"0337083194", "Nam Tu Liem, Ha Noi");

insert into tb_user (user_name, provider, avatar, phone_number, address) values ("Nguyễn Đình Tăng", "google", 
"https://cdn.chotot.com/cF0tOBS0g0NiVGfUdarOnuFaHY5l3msXY2bkgRndklg/preset:listing/plain/7274771d608b08694c4257ae9ea74eb2-2839824952567390247.jpg",
"0337083194", "Nam Tu Liem, Ha Noi");

insert into tb_user (user_name, provider, avatar, phone_number, address) values ("Nguyễn Trung Quân", "google", 
"https://cdn.chotot.com/cF0tOBS0g0NiVGfUdarOnuFaHY5l3msXY2bkgRndklg/preset:listing/plain/7274771d608b08694c4257ae9ea74eb2-2839824952567390247.jpg",
"0337083194", "Nam Tu Liem, Ha Noi");


insert into tb_category (category_name) values 
("Xe cộ"),
("Đồ điện tử"),
("Đồ gia dụng"),
("Đồ trang trí"),
("Quần, áo"),
("Đồ dùng học tập");

insert into tb_product (user_id, category_id, product_name, price, description) 
values ("1000", "1000", "Quạt cây hehe", "120000", "Hàng mới mua về mới sử dụng có 2-3 lần và không có nhu cầu sử dụng nữa");
-- Select data -----------------------------------------
select * from tb_user;

select * from tb_product; 

select * from tb_product_images;

select * from tb_category;

select tb_product.*, tb_product_images.image_link
from tb_product
inner join tb_product_images on tb_product.product_id = tb_product_images.product_id
where tb_product_images.type = "main";