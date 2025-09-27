import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Blog</h1>
          <p>Latest insights, tips, and updates about URL shortening and digital marketing</p>
        </div>

        <div class="blog-content">
          <div class="blog-posts">
            <article class="blog-post featured">
              <div class="post-image">
                <div class="placeholder-image">📊</div>
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">January 30, 2024</span>
                  <span class="post-category">Analytics</span>
                </div>
                <h2><a href="#" (click)="$event.preventDefault()">How to Track Link Performance: A Complete Guide</a></h2>
                <p>Learn how to effectively track and analyze your shortened links to maximize your marketing ROI. Discover the key metrics that matter and how to use them to improve your campaigns.</p>
                <div class="post-footer">
                  <a href="#" (click)="$event.preventDefault()" class="read-more">Read More →</a>
                  <div class="post-stats">
                    <span>5 min read</span>
                    <span>•</span>
                    <span>1.2k views</span>
                  </div>
                </div>
              </div>
            </article>

            <article class="blog-post">
              <div class="post-image">
                <div class="placeholder-image">🚀</div>
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">January 25, 2024</span>
                  <span class="post-category">Marketing</span>
                </div>
                <h2><a href="#" (click)="$event.preventDefault()">10 Creative Ways to Use Short Links in Your Marketing</a></h2>
                <p>Discover innovative strategies for incorporating short links into your marketing campaigns to boost engagement and drive more conversions.</p>
                <div class="post-footer">
                  <a href="#" (click)="$event.preventDefault()" class="read-more">Read More →</a>
                  <div class="post-stats">
                    <span>3 min read</span>
                    <span>•</span>
                    <span>890 views</span>
                  </div>
                </div>
              </div>
            </article>

            <article class="blog-post">
              <div class="post-image">
                <div class="placeholder-image">🔒</div>
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">January 20, 2024</span>
                  <span class="post-category">Security</span>
                </div>
                <h2><a href="#" (click)="$event.preventDefault()">URL Shortener Security: Best Practices for Safe Linking</a></h2>
                <p>Protect your brand and users with these essential security practices when using URL shorteners. Learn about common threats and how to avoid them.</p>
                <div class="post-footer">
                  <a href="#" (click)="$event.preventDefault()" class="read-more">Read More →</a>
                  <div class="post-stats">
                    <span>7 min read</span>
                    <span>•</span>
                    <span>650 views</span>
                  </div>
                </div>
              </div>
            </article>

            <article class="blog-post">
              <div class="post-image">
                <div class="placeholder-image">💰</div>
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">January 15, 2024</span>
                  <span class="post-category">Monetization</span>
                </div>
                <h2><a href="#" (click)="$event.preventDefault()">Maximizing Revenue with Link Monetization</a></h2>
                <p>Turn your traffic into revenue with effective link monetization strategies. Learn how to optimize your short links for maximum earning potential.</p>
                <div class="post-footer">
                  <a href="#" (click)="$event.preventDefault()" class="read-more">Read More →</a>
                  <div class="post-stats">
                    <span>6 min read</span>
                    <span>•</span>
                    <span>1.1k views</span>
                  </div>
                </div>
              </div>
            </article>

            <article class="blog-post">
              <div class="post-image">
                <div class="placeholder-image">📱</div>
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">January 10, 2024</span>
                  <span class="post-category">Mobile</span>
                </div>
                <h2><a href="#" (click)="$event.preventDefault()">Mobile-First Link Shortening: Why It Matters</a></h2>
                <p>With mobile traffic dominating the web, learn why mobile-optimized link shortening is crucial for your success and how to implement it effectively.</p>
                <div class="post-footer">
                  <a href="#" (click)="$event.preventDefault()" class="read-more">Read More →</a>
                  <div class="post-stats">
                    <span>4 min read</span>
                    <span>•</span>
                    <span>750 views</span>
                  </div>
                </div>
              </div>
            </article>

            <article class="blog-post">
              <div class="post-image">
                <div class="placeholder-image">🎯</div>
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">January 5, 2024</span>
                  <span class="post-category">SEO</span>
                </div>
                <h2><a href="#" (click)="$event.preventDefault()">SEO Impact of URL Shorteners: What You Need to Know</a></h2>
                <p>Understand how URL shorteners affect your SEO efforts and learn best practices for maintaining search engine visibility while using short links.</p>
                <div class="post-footer">
                  <a href="#" (click)="$event.preventDefault()" class="read-more">Read More →</a>
                  <div class="post-stats">
                    <span>8 min read</span>
                    <span>•</span>
                    <span>950 views</span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <aside class="blog-sidebar">
            <div class="sidebar-widget">
              <h3>Categories</h3>
              <ul class="category-list">
                <li><a href="#" (click)="$event.preventDefault()">Analytics <span>(12)</span></a></li>
                <li><a href="#" (click)="$event.preventDefault()">Marketing <span>(18)</span></a></li>
                <li><a href="#" (click)="$event.preventDefault()">Security <span>(8)</span></a></li>
                <li><a href="#" (click)="$event.preventDefault()">Monetization <span>(15)</span></a></li>
                <li><a href="#" (click)="$event.preventDefault()">Mobile <span>(6)</span></a></li>
                <li><a href="#" (click)="$event.preventDefault()">SEO <span>(10)</span></a></li>
              </ul>
            </div>

            <div class="sidebar-widget">
              <h3>Popular Posts</h3>
              <div class="popular-posts">
                <div class="popular-post">
                  <h4><a href="#" (click)="$event.preventDefault()">The Future of URL Shortening</a></h4>
                  <span class="popular-date">Jan 28, 2024</span>
                </div>
                <div class="popular-post">
                  <h4><a href="#" (click)="$event.preventDefault()">Building Trust with Custom Domains</a></h4>
                  <span class="popular-date">Jan 22, 2024</span>
                </div>
                <div class="popular-post">
                  <h4><a href="#" (click)="$event.preventDefault()">API Integration Best Practices</a></h4>
                  <span class="popular-date">Jan 18, 2024</span>
                </div>
              </div>
            </div>

            <div class="sidebar-widget">
              <h3>Newsletter</h3>
              <p>Subscribe to get the latest updates and tips delivered to your inbox.</p>
              <form class="newsletter-form">
                <input type="email" placeholder="Enter your email" class="newsletter-input">
                <button type="submit" class="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      margin-top: 2rem;
    }
    
    .blog-posts {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .blog-post {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .blog-post:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
    
    .blog-post.featured {
      border: 2px solid #667eea;
    }
    
    .post-image {
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .placeholder-image {
      font-size: 4rem;
      color: white;
    }
    
    .post-content {
      padding: 1.5rem;
    }
    
    .post-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    
    .post-date {
      color: #666;
    }
    
    .post-category {
      background: #667eea;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-weight: 500;
    }
    
    .post-content h2 {
      margin-bottom: 1rem;
      color: #333;
    }
    
    .post-content h2 a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .post-content h2 a:hover {
      color: #667eea;
    }
    
    .post-content p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .read-more {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .read-more:hover {
      color: #5a6fd8;
    }
    
    .post-stats {
      color: #999;
      font-size: 0.875rem;
    }
    
    .blog-sidebar {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .sidebar-widget {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }
    
    .sidebar-widget h3 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
    
    .category-list {
      list-style: none;
    }
    
    .category-list li {
      margin-bottom: 0.5rem;
    }
    
    .category-list a {
      color: #666;
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f0f0f0;
      transition: color 0.3s ease;
    }
    
    .category-list a:hover {
      color: #667eea;
    }
    
    .category-list span {
      background: #f8f9fa;
      color: #666;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.75rem;
    }
    
    .popular-posts {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .popular-post {
      padding-bottom: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .popular-post:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .popular-post h4 {
      margin-bottom: 0.5rem;
    }
    
    .popular-post h4 a {
      color: #333;
      text-decoration: none;
      font-size: 0.9rem;
      line-height: 1.4;
      transition: color 0.3s ease;
    }
    
    .popular-post h4 a:hover {
      color: #667eea;
    }
    
    .popular-date {
      color: #999;
      font-size: 0.8rem;
    }
    
    .newsletter-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .newsletter-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
    }
    
    .newsletter-input:focus {
      outline: none;
      border-color: #667eea;
    }
    
    @media (max-width: 768px) {
      .blog-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .post-footer {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class BlogComponent {
}

