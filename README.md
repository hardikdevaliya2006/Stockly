# Stockly - Modern Inventory Management System

Stockly is a sleek, responsive, full-stack inventory management web application built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**. It provides retail store operators and inventory managers with real-time catalogue tracking, stock statistics, advanced filtering and sorting, image uploads, and dual Grid / List view layouts.

---

## Features List

### 🔐 Authentication & Security
- **Email & Password Authentication**: User signup and signin backed by Supabase Auth.
- **Protected Routes**: Client-side authentication guarding dashboard and product management pages.
- **Persistent Sessions**: User session state restored automatically via Supabase Auth listeners.
- **User Profile Menu**: Dropdown displaying active user name, email, and one-click sign out.

### 📊 Real-Time Dashboard & Analytics
- **Live Inventory KPI Cards**:
  - **Total Products**: Active catalogue count.
  - **Low Stock**: Items below threshold (`< 10` units) highlighted in amber.
  - **Out of Stock**: Depleted inventory highlighted in rose.
  - **Total Inventory Value**: Dynamically calculated valuation formatted in localized currency (₹ INR).

### 🔍 Catalogue Browsing & Filtering
- **Dual View Modes**:
  - **Visual Grid View**: Responsive card grid with product imagery, stock status badges, category tags, and prices.
  - **High-Density List View**: Structured tabular data view displaying product thumbnails, descriptions, categories, stock pills, active status dots, and direct detail links.
  - **Persistent Preference**: View toggle preference saved across browser sessions via `localStorage`.
- **Real-Time Search**: Instant debounce filtering by product name.
- **Category Filter**: Dropdown filtering by product category dynamically fetched from database.
- **Stock Level Filter**: Quick filter by *All stock levels*, *In stock* (≥10), *Low stock* (1–9), and *Out of stock* (0).
- **Multi-criteria Sorting**: Sort by *Newest*, *Oldest*, *Name (A–Z)*, *Price: Low to High*, and *Price: High to Low*.
- **Pagination**: 12 items per page with responsive page controls.

### 📦 Product Management
- **Create & Edit Products**: Full CRUD support for product names, descriptions, categories, positive pricing, and non-negative stock counts.
- **Direct Image Uploads**: Upload product images (PNG, JPG, WEBP up to 5 MB) directly to Supabase Storage bucket with live preview, change, and remove actions.
- **Delete Confirmation Modal**: Accessible confirmation modal preventing accidental deletions.
- **Form Validations**: Real-time client-side checks and PostgreSQL constraints ensuring data integrity.

---

## Tech Stack Used

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design Tokens |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Row-Level Security + Supabase Auth) |
| **Object Storage** | [Supabase Storage](https://supabase.com/storage) (`product-images` bucket) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Icons** | [Lucide](https://lucide.dev/) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |

---

## Project Structure

```text
Stockly/
├── public/                     # Static public assets (e.g. logos, favicon)
│   └── stockly_logo.png
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── FilterBar.jsx       # Search, category, stock level, and sort controls
│   │   ├── Icon.jsx            # Lucide icon adapter
│   │   ├── LoadingSpinner.jsx  # Accessible loading spinner
│   │   ├── Modal.jsx           # Reusable confirmation modal backdrop & dialog
│   │   ├── Navbar.jsx          # Header with branding, avatar, and logout
│   │   ├── ProductCard.jsx     # Card component for grid view
│   │   ├── ProductForm.jsx     # Product creation/edit form with image uploader
│   │   ├── ProductListItem.jsx # Tabular row component for list view
│   │   ├── ProtectedRoute.jsx  # Route guard for authenticated views
│   │   └── StatsCard.jsx       # KPI card with color coding and icon
│   ├── context/                # Context & custom hooks
│   │   ├── AuthContext.jsx     # Supabase auth session provider
│   │   ├── authContext.js      # Auth context instance
│   │   └── useAuth.js          # useAuth custom hook
│   ├── pages/                  # Page route components
│   │   ├── Dashboard.jsx       # Main dashboard (KPIs, grid/list view, filters)
│   │   ├── LoginPage.jsx       # Sign in page
│   │   ├── ProductDetail.jsx   # Add / Edit / Delete product page
│   │   └── RegisterPage.jsx    # User registration page
│   ├── services/
│   │   └── api.js              # Supabase client and query/mutation services
│   ├── App.jsx                 # App routes and notification toaster configuration
│   ├── index.css               # Global styling, Tailwind CSS directives & theme fonts
│   └── main.jsx                # Application root entry point
├── .env                        # Local environment variables (do not commit secrets)
├── .env.example                # Example environment variables template
├── index.html                  # HTML document template
├── package.json                # Project dependencies and npm scripts
├── supabase_setup.sql          # Database schema, tables, RLS, and storage policies
└── vite.config.js              # Vite configuration
```

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer)
- npm or yarn package manager
- A free [Supabase](https://supabase.com/) account and project

### 1. Clone or Open the Repository
```bash
git clone https://github.com/your-username/stockly.git
cd stockly
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase Database & Storage
1. Open your Supabase Project Dashboard and navigate to the **SQL Editor**.
2. Open [`supabase_setup.sql`](./supabase_setup.sql) in this repository, copy its contents, paste them into the SQL Editor, and click **Run**.
   - This creates the `products` table, `categories` table with sample data, UUID generator, and Row Level Security (RLS) policies.
3. In your Supabase Dashboard, go to **Storage** and click **New Bucket**:
   - Bucket Name: `product-images`
   - Make the bucket **Public**: Yes (toggle on).
   - Click **Save**.

### 4. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase project credentials:
```bash
cp .env.example .env
```
*(On Windows PowerShell, use `Copy-Item .env.example .env`)*

### 5. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore Stockly.

### 6. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
To preview the generated production build locally:
```bash
npm run preview
```

---

## Environment Variables Needed

The application relies on Vite environment variables prefixed with `VITE_`.

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | **Yes** | Your Supabase project URL (e.g. `https://xyz.supabase.co`). Found under Project Settings → API. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | **Yes** | Your Supabase anon / publishable public API key. Found under Project Settings → API. |
| `VITE_IMAGEKIT_URL_ENDPOINT` | *Optional* | Optional ImageKit CDN URL endpoint if integrating ImageKit delivery. |

---

## .env Configuration

Create a file named `.env` in the project root directory with the following configuration:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key