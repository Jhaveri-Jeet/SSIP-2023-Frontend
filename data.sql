USE `criminalcasedb`;

INSERT INTO `roles` (`Name`) VALUES ('District Court');
INSERT INTO `roles` (`Name`) VALUES ('Admin');
INSERT INTO `roles` (`Name`) VALUES ('High Court');
INSERT INTO `roles` (`Name`) VALUES ('Supreme Court');

INSERT INTO `states` (`Name`) VALUES ('Gujarat');
INSERT INTO `districts` (`Name`) VALUES ('Jamnagar');

INSERT INTO `courts` (`Name`, `IdentificationNumber`, `FullAddress`, `StateId`, `DistrictId`, `RoleId`) VALUES ('Jamnagar District Court', '1234567890', 'Jamnagar', 1, 1, 1);

INSERT INTO `users` (`UserName`, `PasswordHash`, `RoleId`, `CourtId`, `DistrictId`) VALUES ('Jamnagar District Court', '123', 1, 1, 1);