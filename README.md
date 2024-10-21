# Auction Management System

This is an Auction Management System built using React for the frontend and .NET API (C#) for the backend with an SQL Server database. The system allows users to participate in auctions, place bids, and manage auctions from an admin dashboard. The system includes authentication, role-based access, and other auction-related features.

## Features

- User authentication (login/register)
- Role-based access (admin/user)
- Bidding system
- Auction management (for admin)
- Notifications for bid events (*to be added*)
- Auction end handling and payment gateway integration (*to be added*)

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: ASP.NET Core, C#
- **Database**: SQL Server
- **Other**: Entity Framework Core, JWT Authentication

## Prerequisites

Before running this application locally, ensure you have the following installed:

- Node.js (for the React frontend)
- .NET SDK (for the ASP.NET Core backend)
- SQL Server (for the database)
- Visual Studio (or any code editor)
- SQL Server Management Studio (SSMS)

## Getting Started

1. **Clone the repository**

    ```bash
    git clone https://github.com/HasithFernando/Auction-Management-System.git
    cd auction-management-system
    ```

2. **Install frontend dependencies**

    Navigate to the `Frontend` folder and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

3. **Install backend dependencies**

    Navigate to the `Backend` folder and restore NuGet packages:

    ```bash
    cd Backend/Backend
    dotnet restore
    ```

4. **Update environment variables**

    In the `Backend` folder, ensure that your `appsettings.Development.json` file contains valid JWT settings and SQL Server connection string:

    ```json
    {
        "ConnectionStrings": {
            "DefaultConnection": "Server=localhost; Database=AuctionDb; Trusted_Connection=true"
        },
        "Jwt": {
            "Key": "qFz2$8(1hP]9u7LJz6+K$2hG2v7b1mB!wG6#R@j*U0pH",
            "Issuer": "http://localhost:5229"
        }
    }
    ```

## Database Setup and Migrations

Before running the application, you need to set up the database using Entity Framework Core migrations. Follow these steps to create and apply migrations.

1. **Create a Migration**

    If any changes have been made to the models, you will need to create a migration. In the `Backend` folder, open a terminal and run:

    ```bash
    dotnet ef migrations add InitialCreate
    ```

    This will scaffold a new migration based on your current model definitions.

2. **Apply Migrations to the Database**

    After creating the migration, you can apply it to the SQL Server database by running:

    ```bash
    dotnet ef database update
    ```

    This command will create or update the database schema based on the current migration files.

3. **Check Migration Status**

    If you want to verify which migrations have been applied, run:

    ```bash
    dotnet ef migrations list
    ```

    This will list all migrations, showing which ones have been applied and which are still pending.

4. **Rolling Back a Migration**

    If you need to undo the last migration, you can run:

    ```bash
    dotnet ef database update PreviousMigrationName
    ```

    This will revert the database to the state before the most recent migration.

## Running the Application

1. **Run the Backend (.NET API)**

    From the Backend folder, run:

    ```bash
    dotnet run
    ```

    The backend should be running at `http://localhost:5229`.

2. **Run the Frontend (React)**

    Open a new terminal window, navigate to the client folder, and run:

    ```bash
    npm start
    ```

    The frontend should be running at `http://localhost:3000`.

### Group Members

   [![Hasith Fernando](https://img.shields.io/badge/Hasith%20Fernando-Click%20to%20View-2ea44f?style=for-the-badge&logo=github)](https://github.com/HasithFernando)
   [![Hiruni Chathurya](https://img.shields.io/badge/Hiruni%20Chathurya-Click%20to%20View-2ea44f?style=for-the-badge&logo=github)](https://github.com/HiruniChathurya)
   [![Akshaya Kannan](https://img.shields.io/badge/Akshaya%20Kannan-Click%20to%20View-2ea44f?style=for-the-badge&logo=github)](https://github.com/Akshayaakannan)
   [![Sithum Yugantha](https://img.shields.io/badge/Sithum%20Yugantha-Click%20to%20View-2ea44f?style=for-the-badge&logo=github)](https://github.com/Yugantha02)
   [![Sadeesha Jayaweera](https://img.shields.io/badge/Sadeesha%20Jayaweera-Click%20to%20View-2ea44f?style=for-the-badge&logo=github)](https://github.com/SadeeshaJayaweera)
   [![Thuvaragan Gobalakrishnan](https://img.shields.io/badge/Thuvaragan%20Gobalakrishnan-Click%20to%20View-2ea44f?style=for-the-badge&logo=github)](https://github.com/gthuva)
