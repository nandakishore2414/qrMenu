import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'categories'
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    // Forms state
    const [catName, setCatName] = useState('');
    const [catDesc, setCatDesc] = useState('');

    const [menuName, setMenuName] = useState('');
    const [menuDesc, setMenuDesc] = useState('');
    const [menuPrice, setMenuPrice] = useState('');
    const [menuCat, setMenuCat] = useState('');
    const [menuPopular, setMenuPopular] = useState(false);
    const [menuAvailable, setMenuAvailable] = useState(true);
    const [menuImage, setMenuImage] = useState(null);

    const token = localStorage.getItem('adminToken');
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
        try {
            const [catRes, menuRes] = await Promise.all([
                axios.get('http://localhost:5000/api/categories'),
                axios.get('http://localhost:5000/api/menu')
            ]);
            setCategories(catRes.data);
            setMenuItems(menuRes.data);
            if (catRes.data.length > 0 && !menuCat) setMenuCat(catRes.data[0]._id);
        } catch (err) {
            console.error("Failed to fetch data", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/categories', { name: catName, description: catDesc }, axiosConfig);
            setCatName(''); setCatDesc('');
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Delete category?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/categories/${id}`, axiosConfig);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', menuName);
        formData.append('description', menuDesc);
        formData.append('price', menuPrice);
        formData.append('categoryId', menuCat);
        formData.append('isPopular', menuPopular);
        formData.append('available', menuAvailable);
        if (menuImage) formData.append('image', menuImage);

        try {
            await axios.post('http://localhost:5000/api/admin/menu', formData, axiosConfig);
            setMenuName(''); setMenuDesc(''); setMenuPrice(''); setMenuImage(null);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteMenu = async (id) => {
        if (!window.confirm("Delete item?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/menu/${id}`, axiosConfig);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleAvailability = async (id, currentVal) => {
        try {
            await axios.patch(`http://localhost:5000/api/admin/menu/availability/${id}`, { available: !currentVal }, axiosConfig);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-zinc-800 pb-4 mb-6">
                <button
                    onClick={() => setActiveTab('menu')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'menu' ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}>
                    Menu Items
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'categories' ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}>
                    Categories
                </button>
            </div>

            {activeTab === 'categories' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 md:col-span-1 h-fit">
                        <h3 className="text-xl font-bold mb-4">Add Category</h3>
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <input
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3"
                                placeholder="Category Name"
                                value={catName} onChange={e => setCatName(e.target.value)} required
                            />
                            <textarea
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3"
                                placeholder="Description (Optional)"
                                value={catDesc} onChange={e => setCatDesc(e.target.value)}
                            />
                            <button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg">Add Category</button>
                        </form>
                    </div>
                    <div className="md:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                        <h3 className="text-xl font-bold mb-4">Existing Categories</h3>
                        <div className="space-y-3">
                            {categories.map(cat => (
                                <div key={cat._id} className="flex justify-between items-center bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                                    <div>
                                        <p className="font-bold">{cat.name}</p>
                                        <p className="text-sm text-zinc-400">{cat.description}</p>
                                    </div>
                                    <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg text-sm font-bold">Delete</button>
                                </div>
                            ))}
                            {categories.length === 0 && <p className="text-zinc-500">No categories found.</p>}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'menu' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 md:col-span-1 h-fit">
                        <h3 className="text-xl font-bold mb-4">Add Menu Item</h3>
                        <form onSubmit={handleAddMenuItem} className="space-y-4">
                            <input
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3"
                                placeholder="Item Name"
                                value={menuName} onChange={e => setMenuName(e.target.value)} required
                            />
                            <select
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white appearance-none"
                                value={menuCat} onChange={e => setMenuCat(e.target.value)} required>
                                <option value="" disabled>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3"
                                placeholder="Price (₹)"
                                value={menuPrice} onChange={e => setMenuPrice(e.target.value)} required
                            />
                            <textarea
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 h-20"
                                placeholder="Short Description"
                                value={menuDesc} onChange={e => setMenuDesc(e.target.value)}
                            />

                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="popular" checked={menuPopular} onChange={e => setMenuPopular(e.target.checked)} className="w-4 h-4 accent-orange-500" />
                                <label htmlFor="popular" className="text-sm">Mark as Popular</label>
                            </div>

                            <div className="flex items-center space-x-2 pb-2">
                                <input type="checkbox" id="available" checked={menuAvailable} onChange={e => setMenuAvailable(e.target.checked)} className="w-4 h-4 accent-orange-500" />
                                <label htmlFor="available" className="text-sm">Available Status</label>
                            </div>

                            <div className="border border-zinc-800 rounded-lg p-3 bg-zinc-950">
                                <label className="block text-sm text-zinc-400 mb-2">Item Image (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setMenuImage(e.target.files[0])}
                                    className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                                />
                            </div>

                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg mt-2">Add Item</button>
                        </form>
                    </div>

                    <div className="md:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                        <h3 className="text-xl font-bold mb-4">Manage Menu</h3>
                        <div className="space-y-3">
                            {menuItems.map(item => (
                                <div key={item._id} className="flex gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                                    <div className="w-20 h-20 bg-zinc-900 rounded-lg shrink-0 overflow-hidden relative">
                                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="font-bold text-lg">{item.name}</h4>
                                            <span className="font-black text-orange-500">₹{item.price}</span>
                                        </div>
                                        <p className="text-sm text-zinc-400">{item.categoryId?.name || 'Uncategorized'}</p>

                                        <div className="flex items-center space-x-4 mt-3">
                                            <button
                                                onClick={() => toggleAvailability(item._id, item.available)}
                                                className={`px-3 py-1 rounded text-xs font-bold ${item.available ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {item.available ? 'Available' : 'Unavailable'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteMenu(item._id)}
                                                className="text-red-500 hover:underline text-sm font-bold ml-auto">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {menuItems.length === 0 && <p className="text-zinc-500">No menu items found.</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
