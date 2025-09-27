# AKLinks - URL Shortener

A modern Angular 19 application for URL shortening with a clean, responsive design inspired by modern link shortening services.

## Features

- **Clean Modern Design**: Responsive UI with gradient backgrounds and smooth animations
- **Multiple Pages**: Home, Publisher Rates, Payment Proof, and Blog pages
- **Navigation**: Header with dropdown menu for additional options
- **Publisher Program**: Dedicated pages for publisher rates and payment proof
- **Blog Section**: Content management for tips and insights
- **Mobile Responsive**: Optimized for all device sizes

## Pages

### Home Page
- Hero section with URL shortening form
- Statistics section
- Features showcase
- Call-to-action section
- Footer with links

### Publisher Rates
- Detailed pricing plans
- Payment information
- Getting started guide

### Payment Proof
- Recent payment records
- Payment statistics
- Testimonials
- Payment methods

### Blog
- Article listings
- Categories sidebar
- Popular posts
- Newsletter signup

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd aklinks_frontned
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── header/           # Header component with navigation
│   ├── home/             # Landing page component
│   ├── publisher-rates/  # Publisher rates page
│   ├── payment-proof/    # Payment proof page
│   ├── blog/             # Blog page
│   ├── app.component.ts  # Root component
│   └── app.routes.ts     # Routing configuration
├── assets/               # Static assets
├── styles.scss           # Global styles
├── index.html            # Main HTML file
└── main.ts              # Application bootstrap
```

## Technologies Used

- **Angular 19**: Latest version of Angular framework
- **TypeScript**: Type-safe JavaScript development
- **SCSS**: Enhanced CSS with variables and mixins
- **RxJS**: Reactive programming with observables
- **Angular Router**: Client-side routing

## Styling

The application uses a modern design system with:
- Inter font family for clean typography
- Gradient backgrounds and buttons
- Card-based layouts
- Responsive grid systems
- Smooth hover animations
- Mobile-first responsive design

## Development

### Running Tests
```bash
npm test
```

### Code Linting
```bash
npm run lint
```

### Development Server
The development server will automatically reload when you make changes to the source files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.