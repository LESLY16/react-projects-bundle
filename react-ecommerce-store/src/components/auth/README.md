# Authentication Components

This directory contains authentication-related components for the e-commerce store.

## Components

### LoginForm
A complete login form with email/password authentication.

**Features:**
- Email and password fields with validation
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Demo credentials display
- Toast notifications
- Redirect after successful login

**Usage:**
```jsx
import { LoginForm } from './components/auth';

function LoginPage() {
  return <LoginForm />;
}
```

**Demo Credentials:**
- User: `john.doe@example.com` / `password123`
- Admin: `admin@ecommerce.com` / `admin123`

---

### RegisterForm
A comprehensive registration form with validation.

**Features:**
- First name, last name, email, phone fields
- Password with strength indicator
- Confirm password validation
- Terms acceptance checkbox
- Real-time validation feedback
- Show/hide password toggles
- Toast notifications

**Usage:**
```jsx
import { RegisterForm } from './components/auth';

function RegisterPage() {
  return <RegisterForm />;
}
```

**Validation Requirements:**
- First/Last name: min 2 characters
- Email: valid email format
- Phone: 10 digits
- Password: min 8 chars, 1 uppercase, 1 lowercase, 1 number

---

### ProtectedRoute
Higher-order component to protect routes requiring authentication.

**Features:**
- Authentication check
- Loading state while checking
- Redirect to login if not authenticated
- Optional admin-only access
- Preserves intended destination

**Usage:**
```jsx
import { ProtectedRoute } from './components/auth';

// Protect a user route
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>

// Protect an admin-only route
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

---

## Dependencies

These components use:
- **Formik**: Form state management
- **Yup**: Validation schemas
- **React Router**: Navigation
- **React Icons**: UI icons
- **React Toastify**: Notifications
- **useAuth hook**: Authentication logic

## Styling

All components use CSS modules and follow the app's design system with CSS custom properties defined in `index.css`.

## Integration

1. Import components in your routing setup:
```jsx
import { LoginForm, RegisterForm, ProtectedRoute } from './components/auth';
```

2. Add routes:
```jsx
<Routes>
  <Route path="/login" element={<LoginForm />} />
  <Route path="/register" element={<RegisterForm />} />
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />
</Routes>
```

3. Ensure `ToastContainer` is added to your App.js:
```jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <YourApp />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
```

## Validation Schemas

All forms use validation schemas from `utils/validationSchemas.js`:
- `loginSchema`: Email and password validation
- `registerSchema`: Full registration validation with password strength rules
