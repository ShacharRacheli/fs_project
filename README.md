# 🎨 Pic A Pick

**A Community-Driven AI Art Platform**

## 📖 Overview

Pic A Pick is an innovative web application that brings together AI art enthusiasts in a vibrant community platform. Users can showcase their AI-generated artwork through weekly challenges, vote on their favorites, and compete for recognition in our winners' gallery.

## ✨ Features

### 🎯 Core Features
- **Weekly AI Art Challenges** - Fresh themes and prompts released regularly
- **Community Voting System** - Democratic selection of winning artwork
- **User Authentication** - Secure login/registration system
- **Winners Gallery** - Showcase of champion artwork
- **Email Notifications** - Automated winner announcements

### 👥 User Experience
- Browse and discover AI-generated artwork
- Participate in active challenges by uploading creations
- Vote for favorite submissions (authenticated users only)

### 🛠️ Management Dashboard
- **Challenge Management** - Create and configure new weekly challenges
- **User Analytics** - Comprehensive user management and insights
- **Performance Metrics** - Visual graphs and statistics
- **Challenge Overview** - Monitor all past and current challenges

## 🏗️ Architecture

### Client Side
- **User Interface** - Responsive web applications built with React.js and Angular
- **Authentication** - JWT-based secure user login and registration
- **Image Upload** - Seamless artwork submission with AWS S3 integration
- **Voting System** - Interactive voting mechanism for active challenges
- **Gallery Views** - Browse challenges and winners

### Manager Side
- **Admin Dashboard** - Comprehensive management interface
- **Challenge Creator** - Tools for setting up new challenges
- **Analytics Panel** - User and engagement metrics
- **Data Visualization** - Interactive graphs and charts

## 🚀 Getting Started

### Prerequisites
- .NET Core SDK (v8.0 or higher)
- npm or yarn package manager
- MySQL database server
- AWS account with S3 access
- Email service configuration

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShacharRacheli/fs_project.git
   cd fs_project
   ```

2. **Backend Setup (.NET Core)**
   ```bash
    # Restore .NET packages
   dotnet restore
    # Configure environment
   cp appsettings.example.json appsettings.json
   # Edit appsettings.json with your connection strings and AWS credentials
   ```

3. **Database Setup**
   ```bash
   # Run Entity Framework migrations
   dotnet ef database update
   ```

4. **Frontend Setup**
    **React Client:**
   ```bash
   # Navigate to React client directory
   cd client
   
   # Install React dependencies
   npm install
   
   # Configure environment
   cp .env.example .env
   # Edit .env with your environment variables
   ```
  **Angular Admin:**
  ```bash
   # Navigate to Angular admin directory (from project root)
    cd admin

    # Install Angular dependencies
    npm install
  ```

5. **Start the application**
   ```bash
   # Backend
   dotnet run
   
   # Frontend (React)
   cd client
   npm start
   
   # Frontend (Angular)
   cd admin
   ng serve
   ```

## 📱 Usage

### For Community Members
1. **Register/Login** to your account
2. **Browse** current and past challenges
3. **Upload** your AI-generated artwork to active challenges
4. **Vote** for your favorite submissions
5. **Check** the winners gallery for results

### For Managers
1. **Access** the admin dashboard
2. **Create** new weekly challenges with themes and deadlines
3. **View** analytics and performance metrics
4. **Manage** user accounts and submissions

## 🎨 Challenge Workflow

```
1. Manager creates new challenge → 2. Challenge goes live
                                      ↓
5. Winner announced via email ← 4. Voting period ends ← 3. Users submit & vote
                ↓
6. Winning artwork featured in gallery
```

## 🏆 Winners System

- **Automated Selection** - Highest voted submission wins
- **Email Notification** - Winners receive congratulatory emails
- **Gallery Feature** - Winning artwork displayed prominently
- **Recognition** - Winner profiles highlighted in community

## 🔧 Technical Stack

- **Frontend**: React.js, Angular, CSS3, HTML5
- **Backend**: .NET Core, ASP.NET Core Web API
- **Database**: MySQL
- **Authentication**: JWT tokens
- **Cloud Storage**: Amazon Web Services (AWS S3)
- **Deployment**: Render Cloud Platform

