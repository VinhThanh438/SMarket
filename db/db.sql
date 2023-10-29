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
("Xe máy"),
("Xe đạp"),
("Đồ điện tử"),
("Điện thoại, laptop"),
("Phụ kiện điện tử"),
("Đồ dùng học tập"),
("Bàn, ghế"),
("Đèn học"),
("Đồ gia dụng"),
("Đồ trang trí"),
("Thời trang");

-- insert into tb_product (user_id, category_id, product_name, price, description) 
-- values ("1000", "1000", "Quạt cây hehe", "120000", "Hàng mới mua về mới sử dụng có 2-3 lần và không có nhu cầu sử dụng nữa");

INSERT INTO `tb_product` VALUES (1000,1000,1000,'Quạt cây hehe',120000,'Hàng mới mua về mới sử dụng có 2-3 lần và không có nhu cầu sử dụng nữa','còn hàng','2023-10-23 04:47:39',0),(1001,1000,1001,'đồng hồ Rolex nek',200000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.','còn hàng','2023-10-23 12:18:32',0),(1002,1000,1001,'đồng hồ Rolex nek',200000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.','còn hàng','2023-10-23 13:07:47',0),(1003,1001,1002,'Quạt sạc tích điẹn SUNCA',150000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.\nhehe','còn hàng','2023-10-23 23:59:26',0),(1004,1001,1002,'Quạt sạc tích điẹn SUNCA',150000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.\nhehe','còn hàng','2023-10-23 23:59:31',0),(1005,1002,1002,'Đèn học cảm ứng hêhe',170000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.\nhehe\nĐèn có chức năng tự sạc bằng niềm tin','còn hàng','2023-10-24 00:02:25',0),(1006,1002,1002,'Đèn học cảm ứng hêhe',170000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.\nhehe\nĐèn có chức năng tự sạc bằng niềm tin','còn hàng','2023-10-24 00:02:29',0),(1007,1003,1002,'Cần pass lại iphone XR còn mới',2700000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.\nhehe\nĐèn có chức năng tự sạc bằng niềm tin','còn hàng','2023-10-24 00:07:37',0),(1008,1003,1002,'Cần pass lại iphone XR còn mới',2700000,'Quà nyc tặng nhưng có ny mới nên cần pass lại.\nhehe\nĐèn có chức năng tự sạc bằng niềm tin','còn hàng','2023-10-24 00:07:41',0),(1009,1003,1002,'Cần thanh lý em Acer Nitro 5 này cho ae',19000000,'Máy còn mới anh em yên tâm có bảo hành trọn đời nhá =))','còn hàng','2023-10-24 00:14:44',0),(1010,1003,1002,'Cần thanh lý em Acer Nitro 5 này cho ae',19000000,'Máy còn mới anh em yên tâm có bảo hành trọn đời nhá =))','còn hàng','2023-10-24 00:14:48',0),(1011,1003,1002,'Cần thanh lý em Acer Nitro 5 này cho ae',19000000,'Máy còn mới anh em yên tâm có bảo hành trọn đời nhá =))','còn hàng','2023-10-24 00:15:12',0),(1012,1003,1002,'Cần thanh lý em Acer Nitro 5 này cho ae',19000000,'Máy còn mới anh em yên tâm có bảo hành trọn đời nhá =))','còn hàng','2023-10-24 00:15:14',0);
INSERT INTO `tb_product_images` VALUES (1000,1001,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698063511/SMarket/product/l6gjui8bp3q81ccc6tud.jpg','main',0),(1001,1001,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698063511/SMarket/product/cl2awap1duznr4iiceam.jpg','sub',0),(1002,1001,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698063511/SMarket/product/utczridonxvkzg3qar81.jpg','sub',0),(1003,1002,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698066464/SMarket/product/onrwlokmipkulvlptygf.jpg','main',0),(1004,1002,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698066464/SMarket/product/om6w99wkqzopixmcgwsn.jpg','sub',0),(1005,1002,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698066464/SMarket/product/k9kjfmsvn5a2uxr1bibf.jpg','sub',0),(1006,1003,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105564/SMarket/product/vajmnmwettzdbpvo70uv.jpg','main',0),(1007,1003,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105563/SMarket/product/rgckrmjoavljn0ihadrq.jpg','sub',0),(1008,1003,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105563/SMarket/product/rhhtcdd5bgitcyfbk6wm.jpg','sub',0),(1009,1004,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105569/SMarket/product/jl5m2q5k1ptjj1geqjfm.jpg','main',0),(1010,1004,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105568/SMarket/product/wrmsbg1iaxitk2dfmb97.jpg','sub',0),(1011,1004,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105569/SMarket/product/isua2ufvlz8brtmrn2xj.jpg','sub',0),(1012,1005,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105743/SMarket/product/k3xonekqqibqzs5usi6s.jpg','main',0),(1013,1005,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105743/SMarket/product/m0fata9jf8gsvi4la19o.jpg','sub',0),(1014,1005,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105743/SMarket/product/jwavo2ttbjmmpwpvjdux.jpg','sub',0),(1015,1006,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105748/SMarket/product/tmjamdx8acgyggmdovkz.jpg','main',0),(1016,1006,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105748/SMarket/product/mbiueg3rfiljeunbzkud.jpg','sub',0),(1017,1006,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698105748/SMarket/product/ywvazzol890z3evo3cmf.jpg','sub',0),(1018,1007,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106055/SMarket/product/srqduc0qtema37bjjcrc.jpg','main',0),(1019,1007,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106055/SMarket/product/ezsvskn55nsspboetsxn.jpg','sub',0),(1020,1007,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106055/SMarket/product/zf5ckk7kp7fzewlobgds.jpg','sub',0),(1021,1007,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106055/SMarket/product/kaglezfhy2p51j8hgott.jpg','sub',0),(1022,1007,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106056/SMarket/product/ccn50xfoeuud6vcfv9fm.jpg','sub',0),(1023,1008,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106059/SMarket/product/swqgkgpyybqvyknowrpq.jpg','main',0),(1024,1008,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106059/SMarket/product/kqk6pstfk1kvkizo10f1.jpg','sub',0),(1025,1008,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106059/SMarket/product/eeug1pbcmoyeaihifjkk.jpg','sub',0),(1026,1008,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106059/SMarket/product/ucxougueu0rildl78kts.jpg','sub',0),(1027,1008,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106060/SMarket/product/plo3cja99guqg5rjt3va.jpg','sub',0),(1028,1009,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106483/SMarket/product/ir9lhgonw9ksa1jsuokb.jpg','main',0),(1029,1009,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106483/SMarket/product/qr9xagrfbu6a6bsi42ne.jpg','sub',0),(1030,1010,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106486/SMarket/product/ggp9ieextq9xcldqele1.jpg','main',0),(1031,1010,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106486/SMarket/product/t4d71orr2hcshjunsbsn.jpg','sub',0),(1032,1011,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106510/SMarket/product/r2zsczo791nkkcx1ljyo.jpg','main',0),(1033,1011,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106510/SMarket/product/yif4uzlmn8vtnkthztcs.jpg','sub',0),(1034,1012,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106513/SMarket/product/uo2ifnpju6ivemd1amzb.jpg','main',0),(1035,1012,'https://res.cloudinary.com/djz9u9dcc/image/upload/v1698106513/SMarket/product/gofepf0bk2arojn5f7za.jpg','sub',0);

-- Select data -----------------------------------------
select * from tb_user;

select * from tb_product; 

select * from tb_product_images;

select * from tb_category;

select tb_product.*, tb_product_images.image_link
from tb_product
inner join tb_product_images on tb_product.product_id = tb_product_images.product_id
where tb_product_images.type = "main" and tb_product.is_deleted = 0 and tb_product.category_id = 1002;