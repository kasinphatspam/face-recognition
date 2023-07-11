-- CLEAR ALL TABLE --
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `organization`;
DROP TABLE IF EXISTS `department`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `contact`;

-- CREATE TABLE --
CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `email` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `fname` VARCHAR(20) NOT NULL,
    `lname` VARCHAR(20) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `dob` DATE,
    `profile_image` VARCHAR(20),
    `organization_id` INT,
    `department_id` INT,
    `role_id` INT,
    PRIMARY KEY (`id`),
    CONSTRAINT `unique_id` UNIQUE (`id`),
    CONSTRAINT `unique_email` UNIQUE (`email`)
);

CREATE TABLE `organization` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `code_created_time` TIMESTAMP NOT NULL,
    `code_modified_time` TIMESTAMP NOT NULL,
    `vtiger_token` VARCHAR(45) NOT NULL,
    `vtiger_accesskey` VARCHAR(45) NOT NULL,
    `vtiger_link` VARCHAR(100) NOT NULL,
    CONSTRAINT `unique_id` UNIQUE (`id`),
    CONSTRAINT `unique_code` UNIQUE (`code`),
    PRIMARY KEY (`id`)
);

CREATE TABLE `department` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    CONSTRAINT `unique_id` UNIQUE (`id`),
    PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `organization_id` INT NOT NULL,
    CONSTRAINT `unique_id` UNIQUE (`id`),
    PRIMARY KEY (`id`)
);

CREATE TABLE `contact` (
    `id` INT NOT NULL, 
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `organization_name` VARCHAR(45) NOT NULL,
    `title` VARCHAR(45) NOT NULL,
    `office_phone` VARCHAR(45) NOT NULL,
    `mobile` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `alternate_email` VARCHAR(45) NOT NULL,
    `dob` DATE NOT NULL,
    `contact_owner` VARCHAR(45) NOT NULL,
    `created_time` TIMESTAMP NOT NULL,
    `modified_time` TIMESTAMP NOT NULL,
    `line_id` VARCHAR(45) NOT NULL,
    `facebook` VARCHAR(45) NOT NULL,
    `linkedin` VARCHAR(45) NOT NULL,
    `encoded_data` VARCHAR(300) NOT NULL
    PRIMARY KEY (`id`)
);

CREATE TABLE `role_has_permission` (
    `role_id` INT NOT NULL,
    `permission_id` INT NOT NULL,
    PRIMARY KEY (`role_id`,`permission_id`)
);

CREATE TABLE `organization_department` (
    `organization_id` INT NOT NULL,
    `department_id` INT NOT NULL,
    PRIMARY KEY (`organization_id`,`department_id`)
);

CREATE TABLE `organization_contact` (
    `organization_id` INT NOT NULL,
    `contact_id` INT NOT NULL,
    PRIMARY KEY (`organization_id`,`contact_id`)
);