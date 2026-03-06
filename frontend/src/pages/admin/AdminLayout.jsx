import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function AdminLayout() {
    const isAuthenticated = localStorage.getItem("adminToken");
    const location = useLocation();

    if (!isAuthenticated && location.pathname !== '/admin/login') {
        return <Navigate to="/admin/login" replace />;
    }

    if (isAuthenticated && location.pathname === '/admin/login') {
        return <Navigate to="/admin" replace />;
    }

    return (
        <div className="min-h-screen bg-zinc-950 font-sans text-white">
            {isAuthenticated && (
                <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-black tracking-tight"><span className="text-orange-500">ADMIN</span> PORTAL</h2>
                    <button
                        onClick={() => {
                            localStorage.removeItem("adminToken");
                            window.location.href = "/admin/login";
                        }}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        Sign Out
                    </button>
                </nav>
            )}
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}
