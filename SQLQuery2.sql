INSERT INTO Users
(Name, Surname, Username, PasswordHash, Email, TCKimlikNo, Phone, RoleId, IsDeleted)
VALUES
('System', 'Admin', 'admin', '123456', 'admin@admin.com', '11111111111', '5555555555', 1, 0);

SELECT * FROM Users;
