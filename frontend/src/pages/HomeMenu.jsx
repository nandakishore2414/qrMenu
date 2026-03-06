import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShoppingBag, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function HomeMenu() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [justAdded, setJustAdded] = useState(null);

    const { addToCart, totalItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/categories').then(res => setCategories(res.data)).catch(console.error);
        axios.get('http://localhost:5000/api/menu').then(res => setMenuItems(res.data)).catch(console.error);
    }, []);

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = activeCategory === "All" || item.categoryId?._id === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (item) => {
        if (!item.available) return;
        addToCart(item);
        setJustAdded(item._id);
        setTimeout(() => setJustAdded(null), 1200);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-24">
            {/* Header */}
            <header className="fixed top-0 w-full z-10 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 pt-4 pb-3">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-black tracking-tight text-white">
                        GAN<span className="text-orange-500">GRILL</span>
                    </h1>
                    <span className="text-zinc-500 text-xs">Vellangallur</span>
                </div>
                <div className="max-w-3xl mx-auto mt-3 relative">
                    <Search className="absolute left-3 top-2.5 text-zinc-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search grill, shawarma, burgers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-800/80 text-white rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all border border-zinc-700 text-sm"
                    />
                </div>
            </header>

            {/* Category Tabs */}
            <div className="fixed top-[104px] left-0 right-0 z-10 bg-zinc-950/95 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shrink-0 ${activeCategory === "All" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                        🍽️ All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat._id}
                            onClick={() => setActiveCategory(cat._id)}
                            className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shrink-0 ${activeCategory === cat._id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <main className="max-w-3xl mx-auto px-4 mt-44 space-y-3">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-16 text-zinc-600">No items found.</div>
                ) : (
                    filteredItems.map(item => (
                        <div key={item._id} className={`bg-zinc-900 border rounded-2xl overflow-hidden flex ${!item.available ? 'opacity-60 border-zinc-800' : 'border-zinc-800 hover:border-zinc-700 transition-colors'}`}>
                            {/* Image */}
                            <div className="w-[120px] min-h-[110px] bg-zinc-800 relative shrink-0">
                                {item.image
                                    ? <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                    : <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-xs">No Image</div>}
                                {!item.available && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-red-400 text-[10px] font-bold bg-red-900/50 px-2 py-0.5 rounded-full">UNAVAILABLE</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                                <div>
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-white leading-tight">{item.name}</h3>
                                        {item.isPopular && (
                                            <span className="shrink-0 bg-orange-500/15 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/20 whitespace-nowrap">⭐ Popular</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{item.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-lg font-black text-white">₹{item.price}</span>
                                    {item.available ? (
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${justAdded === item._id ? 'bg-green-500 text-white scale-95' : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-90'}`}>
                                            {justAdded === item._id ? <><Check className="w-3.5 h-3.5" /> Added</> : <><Plus className="w-3.5 h-3.5" /> Add</>}
                                        </button>
                                    ) : (
                                        <span className="text-red-500 text-xs font-semibold">Unavailable</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>

            {/* Floating Cart Button */}
            {totalItems > 0 && (
                <div className="fixed bottom-6 left-0 right-0 px-4 z-20 flex justify-center">
                    <button
                        onClick={() => navigate('/order')}
                        className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-4 px-8 rounded-full shadow-2xl shadow-orange-500/40 transition-all">
                        <ShoppingBag className="w-5 h-5" />
                        <span>View Order</span>
                        <span className="bg-white text-orange-500 font-black text-sm rounded-full w-7 h-7 flex items-center justify-center ml-1">{totalItems}</span>
                    </button>
                </div>
            )}
        </div>
    );
}
