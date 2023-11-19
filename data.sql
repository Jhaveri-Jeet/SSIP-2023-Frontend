-- Created by Jignesh-Rathod

USE `criminalcasedb`;

INSERT INTO `roles` (`Name`) VALUES ('District Court');
INSERT INTO `roles` (`Name`) VALUES ('Admin');
INSERT INTO `roles` (`Name`) VALUES ('High Court');
INSERT INTO `roles` (`Name`) VALUES ('Supreme Court');

INSERT INTO `states` (`Name`) VALUES ('Gujarat');
INSERT INTO `districts` (`Name`) VALUES ('Jamnagar');

INSERT INTO `courts` (`Name`, `IdentificationNumber`, `FullAddress`, `StateId`, `DistrictId`, `RoleId`) VALUES ('District Court', '1234567890', 'address1', 1, 1, 1);
INSERT INTO `courts` (`Name`, `IdentificationNumber`, `FullAddress`, `StateId`, `DistrictId`, `RoleId`) VALUES ('Admin', '1012345678', 'address2', 1, 1, 2);
INSERT INTO `courts` (`Name`, `IdentificationNumber`, `FullAddress`, `StateId`, `DistrictId`, `RoleId`) VALUES ('High Court', '2012354678', 'address3', 1, 1, 3);
INSERT INTO `courts` (`Name`, `IdentificationNumber`, `FullAddress`, `StateId`, `DistrictId`, `RoleId`) VALUES ('Supreme Court', '3012345678', 'address4', 1, 1, 4);

INSERT INTO `users` (`UserName`, `PasswordHash`, `RoleId`, `CourtId`, `DistrictId`) VALUES ('District Court', '123', 1, 1, 1);
INSERT INTO `users` (`UserName`, `PasswordHash`, `RoleId`, `CourtId`, `DistrictId`) VALUES ('Admin', '123', 2, 2, 1);
INSERT INTO `users` (`UserName`, `PasswordHash`, `RoleId`, `CourtId`, `DistrictId`) VALUES ('High Court', '123', 3, 3, 1);
INSERT INTO `users` (`UserName`, `PasswordHash`, `RoleId`, `CourtId`, `DistrictId`) VALUES ('Supreme Court', '123', 4, 4, 1);