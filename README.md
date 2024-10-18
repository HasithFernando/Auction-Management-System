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
    git clone https://github.com/your-username/auction-management-system.git
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
    cd Backend
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

    The frontend should be running at [http://localhost:3000](http://localhost:3000).