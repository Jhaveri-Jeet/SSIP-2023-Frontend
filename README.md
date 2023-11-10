# Criminal Case Management System

## Overview

The Criminal Case Management System is a web application designed to manage and track criminal cases, providing detailed functionalities for various levels of the legal hierarchy, from district court to the supreme court.

## Database Structure

### Tables

1. **ACTS**
   - Description: Stores information about legal acts.
   - Fields: `Id`, `Name`, `Description`

2. **ADVOCATES**
   - Description: Records details of advocates.
   - Fields: `Id`, `Name`, `EnrollmentNumber`

3. **CASES**
   - Description: Manages information related to criminal cases.
   - Fields: `Id`, `DateFiled`, `CnrNumber`, `Petitioner`, `Defendant`, `JudgeName`, `Description`, `CaseStatus`, `Judgment`, `Comments`, `CaseTypeId`, `CourtId`, `ActId`, `AdvocateId`, `AttorneyId`, `RoleId`, `TransferFromId`, `TransferToId`

4. **CASETYPES**
   - Description: Defines different types of cases.
   - Fields: `Id`, `Name`, `Description`

5. **COURTS**
   - Description: Stores court details.
   - Fields: `Id`, `Name`, `IdentificationNumber`, `FullAddress`, `StateId`, `DistrictId`, `RoleId`

6. **DISTRICTS**
   - Description: Manages district information.
   - Fields: `Id`, `Name`

7. **HEARING**
   - Description: Records details of case hearings.
   - Fields: `Id`, `HearingDate`, `HearingDetails`, `CaseId`

8. **ROLES**
   - Description: Defines roles in the legal system.
   - Fields: `Id`, `Name`

9. **SECTIONS**
   - Description: Contains information about legal sections.
   - Fields: `Id`, `Name`, `Description`, `ActId`

10. **STATES**
    - Description: Stores state information.
    - Fields: `Id`, `Name`

11. **USERS**
    - Description: Manages user accounts.
    - Fields: `Id`, `UserName`, `PasswordHash`, `RoleId`, `CourtId`, `DistrictId`

12. **WITNESS**
    - Description: Records details of case witnesses.
    - Fields: `Id`, `WitnessName`, `WitnessImage`, `CaseId`

13. **__EFMIGRATIONSHISTORY**
    - Description: Keeps track of Entity Framework migrations history.
    - Fields: `MigrationId`, `ProductVersion`

### Indexes

Indexes have been set on various fields for optimized querying.

### Constraints

Foreign key constraints ensure data integrity between related tables.

## Database Migrations

The system uses Entity Framework Migrations for database versioning and management. The history of migrations is stored in the `__efmigrationshistory` table.

## Usage

1. Clone the repository.
2. Configure your database connection in the application settings.
3. Run Entity Framework Migrations to set up the database schema.

## Contributors

- [Jeet Jhaveri](https://github.com/Jhaveri-Jeet)
