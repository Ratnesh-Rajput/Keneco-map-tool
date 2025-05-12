# Keneco Map Tool Frontend

A React-based web application for managing and visualizing geographical polygons for land restoration projects.

## 🚀 Features

- View list of existing land restoration projects
- Draw new polygons on Google Maps
- Calculate area and perimeter of drawn polygons
- Interactive map visualization
- Responsive design for desktop and mobile

## 📁 File Structure

```
keneco-map-tool/
├── src/
│   ├── api/                 # API integration
│   │   └── Polygon.js       # Polygon-related API calls
│   ├── components/          # Reusable components
│   │   └── PolygonMap.jsx   # Google Maps component
│   ├── pages/              # Page components
│   │   ├── PolygonListPage.jsx  # List view of polygons
│   │   └── DrawPolygonPage.jsx  # Polygon drawing interface
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Setup and Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd keneco-map-tool
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_BASE_URL=your_backend_api_url
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_GOOGLE_MAPS_API_KEY | Google Maps API key for map functionality | Yes |
| VITE_API_BASE_URL | Base URL for the backend API | Yes |

## 🗺️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | PolygonListPage | View list of all polygons |
| `/draw` | DrawPolygonPage | Draw new polygons on map |

## 🛠️ Technologies Used

- React
- React Router DOM
- Google Maps API
- Tailwind CSS
- Vite

## 📦 Dependencies

Key dependencies include:
- `@react-google-maps/api`: Google Maps integration
- `react-router-dom`: Routing
- `tailwindcss`: Styling

## 🚀 Development

1. Start development server:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

## 📝 API Integration

The application integrates with a backend API for polygon management. API endpoints are defined in `src/api/Polygon.js`:

- `getPolygons()`: Fetch all polygons
- `submitPolygon(data)`: Submit a new polygon

## 🎨 Styling

The application uses Tailwind CSS for styling. Custom styles are defined in `src/index.css`.

## 🔒 Security Notes

- Never commit the `.env` file
- Keep your Google Maps API key secure
- Use environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


