import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2 class="logo">AKLinks</h2>
        </div>
        
        <!-- User Profile Card -->
        <div class="user-profile-card">
          <div class="user-avatar">
            <span>👤</span>
          </div>
          <div class="user-info">
            <div class="username">Admin User</div>
            <div class="user-role">Administrator</div>
          </div>
          <div class="user-menu">
            <span>⋮</span>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <!-- HOME Section -->
          <div class="nav-section">
            <div class="nav-category">HOME</div>
            <ul class="nav-list">
              <li class="nav-item">
                <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-link">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/admin/news" class="nav-link">
                  News & Updates
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/admin/plans" class="nav-link">
                  Manage Plans
                </a>
              </li>
            </ul>
          </div>

          <!-- LINKS Section -->
          <div class="nav-section">
            <div class="nav-category">LINKS</div>
            <ul class="nav-list">
              <li class="nav-item">
                <a routerLink="/admin/links" class="nav-link">
                  Manage Links
                  <span class="nav-chevron">›</span>
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/admin/traffic" class="nav-link">
                  Traffic Sources
                  <span class="nav-chevron">›</span>
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/admin/tools" class="nav-link">
                  Tools
                  <span class="nav-chevron">›</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- PAYOUTS Section -->
          <div class="nav-section">
            <div class="nav-category">PAYOUTS</div>
            <ul class="nav-list">
              <li class="nav-item">
                <a routerLink="/admin/payments" class="nav-link">
                  Payments
                  <span class="nav-chevron">›</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- SUPPORT Section -->
          <div class="nav-section">
            <div class="nav-category">SUPPORT</div>
            <ul class="nav-list">
              <li class="nav-item">
                <a routerLink="/admin/support" class="nav-link">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            Logout
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Admin Header -->
        <header class="admin-header">
          <div class="header-left">
            <button class="hamburger-menu">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
            <button class="shorten-link-btn">
              Shorten Link
              <span class="plus-icon">+</span>
            </button>
          </div>
          
          <div class="header-right">
            <button class="header-icon theme-toggle">
              <span>☀️</span>
            </button>
            <button class="header-icon notifications">
              <span>🔔</span>
              <span class="notification-badge">3</span>
            </button>
            <button class="header-icon profile">
              <span>👤</span>
            </button>
          </div>
        </header>

        <!-- Top Bar -->
        <header class="top-bar">
          <div class="top-bar-left">
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Welcome back! Here's what's happening with your links.</p>
          </div>
        </header>

        <!-- Dashboard Content -->
        <div class="dashboard-content">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">🔗</div>
              <div class="stat-content">
                <h3 class="stat-number">1,234</h3>
                <p class="stat-label">Total Links</p>
                <span class="stat-change positive">+12% from last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <h3 class="stat-number">567</h3>
                <p class="stat-label">Active Users</p>
                <span class="stat-change positive">+8% from last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">👁️</div>
              <div class="stat-content">
                <h3 class="stat-number">89.2K</h3>
                <p class="stat-label">Total Clicks</p>
                <span class="stat-change positive">+15% from last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">💰</div>
              <div class="stat-content">
                <h3 class="stat-number">$2,456</h3>
                <p class="stat-label">Revenue</p>
                <span class="stat-change positive">+23% from last month</span>
              </div>
            </div>
          </div>

          <!-- New Metric Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">👁️</div>
              <div class="stat-content">
                <h3 class="stat-number">807</h3>
                <p class="stat-label">Total Views</p>
                <span class="stat-change positive">+18% from last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">🔗</div>
              <div class="stat-content">
                <h3 class="stat-number">$6.96</h3>
                <p class="stat-label">Average CPM</p>
                <span class="stat-change positive">+5% from last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <h3 class="stat-number">$4.37</h3>
                <p class="stat-label">Referral Earnings</p>
                <span class="stat-change positive">+12% from last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">💰</div>
              <div class="stat-content">
                <h3 class="stat-number">$5.62</h3>
                <p class="stat-label">Total Earnings</p>
                <span class="stat-change positive">+8% from last month</span>
              </div>
            </div>
          </div>

          <!-- Statistics Section -->
          <div class="statistics-section">
            <div class="statistics-header">
              <h2 class="statistics-title">Statistics</h2>
              <div class="statistics-tabs">
                <button class="tab-button active">Table</button>
                <button class="tab-button">Top 10 Links</button>
              </div>
            </div>
            
            <div class="statistics-content">
              <div class="table-container">
                <table class="statistics-table">
                  <thead>
                    <tr>
                      <th>DATE</th>
                      <th>VIEWS</th>
                      <th>DAILY CPM</th>
                      <th>EARNINGS</th>
                      <th>REFERRALS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2025-10-11</td>
                      <td>120</td>
                      <td>$6.95</td>
                      <td>$0.83</td>
                      <td>$0.31</td>
                    </tr>
                    <tr>
                      <td>2025-10-10</td>
                      <td>54</td>
                      <td>$6.67</td>
                      <td>$0.36</td>
                      <td>$0.48</td>
                    </tr>
                    <tr>
                      <td>2025-10-09</td>
                      <td>53</td>
                      <td>$7.58</td>
                      <td>$0.40</td>
                      <td>$0.41</td>
                    </tr>
                    <tr>
                      <td>2025-10-08</td>
                      <td>89</td>
                      <td>$6.25</td>
                      <td>$0.56</td>
                      <td>$0.38</td>
                    </tr>
                    <tr>
                      <td>2025-10-07</td>
                      <td>76</td>
                      <td>$7.12</td>
                      <td>$0.54</td>
                      <td>$0.29</td>
                    </tr>
                    <tr>
                      <td>2025-10-06</td>
                      <td>95</td>
                      <td>$6.89</td>
                      <td>$0.65</td>
                      <td>$0.42</td>
                    </tr>
                    <tr>
                      <td>2025-10-05</td>
                      <td>67</td>
                      <td>$7.34</td>
                      <td>$0.49</td>
                      <td>$0.35</td>
                    </tr>
                    <tr>
                      <td>2025-10-04</td>
                      <td>82</td>
                      <td>$6.78</td>
                      <td>$0.56</td>
                      <td>$0.33</td>
                    </tr>
                    <tr>
                      <td>2025-10-03</td>
                      <td>71</td>
                      <td>$7.01</td>
                      <td>$0.50</td>
                      <td>$0.28</td>
                    </tr>
                    <tr>
                      <td>2025-10-02</td>
                      <td>58</td>
                      <td>$6.45</td>
                      <td>$0.37</td>
                      <td>$0.31</td>
                    </tr>
                    <tr>
                      <td>2025-10-01</td>
                      <td>63</td>
                      <td>$6.95</td>
                      <td>$0.44</td>
                      <td>$0.26</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Charts and Tables Section -->
          <div class="dashboard-grid">
            <!-- Recent Activity -->
            <div class="dashboard-card">
              <div class="card-header">
                <h3 class="card-title">Recent Activity</h3>
                <a href="#" class="card-action">View All</a>
              </div>
              <div class="card-content">
                <div class="activity-list">
                  <div class="activity-item">
                    <div class="activity-icon">🔗</div>
                    <div class="activity-content">
                      <p class="activity-text">New link created: <strong>bit.ly/abc123</strong></p>
                      <span class="activity-time">2 minutes ago</span>
                    </div>
                  </div>
                  
                  <div class="activity-item">
                    <div class="activity-icon">👤</div>
                    <div class="activity-content">
                      <p class="activity-text">New user registered: <strong>john_doe</strong></p>
                      <span class="activity-time">15 minutes ago</span>
                    </div>
                  </div>
                  
                  <div class="activity-item">
                    <div class="activity-icon">👁️</div>
                    <div class="activity-content">
                      <p class="activity-text">Link clicked: <strong>bit.ly/xyz789</strong></p>
                      <span class="activity-time">1 hour ago</span>
                    </div>
                  </div>
                  
                  <div class="activity-item">
                    <div class="activity-icon">💰</div>
                    <div class="activity-content">
                      <p class="activity-text">Payment processed: <strong>$25.00</strong></p>
                      <span class="activity-time">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top Performing Links -->
            <div class="dashboard-card">
              <div class="card-header">
                <h3 class="card-title">Top Performing Links</h3>
                <a href="#" class="card-action">View All</a>
              </div>
              <div class="card-content">
                <div class="table-container">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>Link</th>
                        <th>Clicks</th>
                        <th>Revenue</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="link-cell">
                            <span class="link-short">bit.ly/abc123</span>
                            <span class="link-original">https://example.com/very-long-url</span>
                          </div>
                        </td>
                        <td>1,234</td>
                        <td>$12.34</td>
                        <td><span class="status-badge active">Active</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div class="link-cell">
                            <span class="link-short">bit.ly/xyz789</span>
                            <span class="link-original">https://example.com/another-long-url</span>
                          </div>
                        </td>
                        <td>987</td>
                        <td>$9.87</td>
                        <td><span class="status-badge active">Active</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div class="link-cell">
                            <span class="link-short">bit.ly/def456</span>
                            <span class="link-original">https://example.com/yet-another-url</span>
                          </div>
                        </td>
                        <td>654</td>
                        <td>$6.54</td>
                        <td><span class="status-badge paused">Paused</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <h3 class="section-title">Quick Actions</h3>
            <div class="actions-grid">
              <button class="action-btn">
                <span class="action-icon">➕</span>
                <span class="action-text">Create New Link</span>
              </button>
              
              <button class="action-btn">
                <span class="action-icon">📊</span>
                <span class="action-text">View Analytics</span>
              </button>
              
              <button class="action-btn">
                <span class="action-icon">👥</span>
                <span class="action-text">Manage Users</span>
              </button>
              
              <button class="action-btn">
                <span class="action-icon">⚙️</span>
                <span class="action-text">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 280px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .sidebar-header {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: #667eea;
    }

    /* User Profile Card */
    .user-profile-card {
      background: rgba(255, 255, 255, 0.05);
      margin: 1rem 1.5rem;
      padding: 1rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: #667eea;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .user-info {
      flex: 1;
    }

    .username {
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .user-role {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.8rem;
    }

    .user-menu {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.2rem;
      cursor: pointer;
    }

    .sidebar-nav {
      flex: 1;
      padding: 0.5rem 0;
    }

    .nav-section {
      margin-bottom: 1.5rem;
    }

    .nav-category {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 0.5rem 1.5rem;
      margin-bottom: 0.5rem;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .nav-link.active {
      background-color: rgba(102, 126, 234, 0.2);
      color: white;
      border-left-color: #667eea;
    }

    .nav-icon {
      margin-right: 0.75rem;
      font-size: 1.1rem;
    }

    .nav-chevron {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2rem;
      font-weight: bold;
    }

    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logout-btn {
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logout-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      margin-left: 280px;
      padding: 0;
    }

    /* Admin Header */
    .admin-header {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .hamburger-menu {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      cursor: pointer;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .hamburger-menu:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .hamburger-line {
      width: 22px;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .shorten-link-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      padding: 0.875rem 1.75rem;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .shorten-link-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .plus-icon {
      font-size: 1.1rem;
      font-weight: bold;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-icon {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.75rem;
      border-radius: 12px;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      font-size: 1.1rem;
    }

    .header-icon:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    .notifications {
      position: relative;
    }

    .notification-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #e74c3c;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
    }

    .top-bar {
      background: white;
      padding: 2rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 0.5rem 0;
    }

    .page-subtitle {
      color: #666;
      margin: 0;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      color: #333;
    }

    .user-role {
      font-size: 0.875rem;
      color: #666;
    }

    /* Dashboard Content */
    .dashboard-content {
      padding: 2rem;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      font-size: 2.5rem;
      opacity: 0.8;
    }

    .stat-content {
      flex: 1;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 0.25rem 0;
    }

    .stat-label {
      color: #666;
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
    }

    .stat-change {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .stat-change.positive {
      color: #28a745;
    }

    /* Dashboard Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .dashboard-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .card-action {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
    }

    .card-action:hover {
      text-decoration: underline;
    }

    .card-content {
      padding: 1.5rem;
    }

    /* Activity List */
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .activity-icon {
      font-size: 1.5rem;
      opacity: 0.7;
    }

    .activity-content {
      flex: 1;
    }

    .activity-text {
      margin: 0 0 0.25rem 0;
      color: #333;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #666;
    }

    /* Data Table */
    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    .data-table th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #333;
    }

    .link-cell {
      display: flex;
      flex-direction: column;
    }

    .link-short {
      font-weight: 600;
      color: #667eea;
    }

    .link-original {
      font-size: 0.75rem;
      color: #666;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-badge.active {
      background-color: #d4edda;
      color: #155724;
    }

    .status-badge.paused {
      background-color: #fff3cd;
      color: #856404;
    }

    /* Quick Actions */
    .quick-actions {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 1.5rem 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1.5rem;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .action-icon {
      font-size: 2rem;
    }

    .action-text {
      font-weight: 500;
    }

    /* Statistics Section */
    .statistics-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
      overflow: hidden;
    }

    .statistics-header {
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .statistics-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .statistics-tabs {
      display: flex;
      gap: 0.5rem;
    }

    .tab-button {
      padding: 0.5rem 1rem;
      border: 1px solid #e9ecef;
      background: white;
      color: #666;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .tab-button:hover {
      background: #f8f9fa;
      color: #333;
    }

    .tab-button.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .statistics-content {
      padding: 0;
    }

    .statistics-table {
      width: 100%;
      border-collapse: collapse;
    }

    .statistics-table th {
      background-color: #f8f9fa;
      padding: 1rem 1.5rem;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 1px solid #e9ecef;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .statistics-table td {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #f1f3f4;
      color: #333;
      font-size: 0.875rem;
    }

    .statistics-table tbody tr:hover {
      background-color: #f8f9fa;
    }

    .statistics-table tbody tr:last-child td {
      border-bottom: none;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .main-content {
        margin-left: 0;
      }

      .admin-header {
        padding: 1rem;
      }

      .shorten-link-btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }

      .header-right {
        gap: 0.5rem;
      }

      .header-icon {
        width: 35px;
        height: 35px;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    // Implement logout functionality
    console.log('Logout clicked');
    // Clear any stored authentication data
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    
    // Redirect to login page
    this.router.navigate(['/auth/login']);
  }
}
