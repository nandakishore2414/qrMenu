import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomeMenu from './pages/HomeMenu';
import OrderPage from './pages/OrderPage';
import BillPage from './pages/BillPage';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomeMenu />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/bill" element={<BillPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
