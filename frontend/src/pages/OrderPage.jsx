import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function OrderPage() {
    const { cartItems, updateQty, removeFromCart, subtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const gst = Math.round(subtotal * 0.05); // 5% GST
    const total = subtotal + gst;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-6">
                <ShoppingBag className="w-16 h-16 text-zinc-700 mb-4" />
                <h2 className="text-2xl font-bold text-zinc-400">Your order is empty</h2>
                <p className="text-zinc-600 mt-2 mb-6">Go back and add some items!</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                    Browse Menu
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto flex items-center gap-3">
                    <button onClick={() => navigate('/')} className="text-zinc-400 hover:text-white transition-colors text-2xl leading-none">←</button>
                    <h1 className="text-xl font-black">Your <span className="text-orange-500">Order</span></h1>
                </div>
            </header>

            <div className="max-w-2xl mx-auto p-4 space-y-3 pb-48">
                {cartItems.map(item => (
                    <div key={item._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-center">
                        {/* Image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                            {item.image
                                ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No Img</div>}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="font-bold truncate">{item.name}</p>
                            <p className="text-orange-500 font-black text-lg">₹{item.price}</p>
                        </div>

                        {/* Qty Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => updateQty(item._id, item.qty - 1)}
                                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors">
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-6 text-center font-bold text-lg">{item.qty}</span>
                            <button
                                onClick={() => updateQty(item._id, item.qty + 1)}
                                className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-colors ml-1">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bill Summary Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
                <div className="max-w-2xl mx-auto space-y-2">
                    <div className="flex justify-between text-zinc-400 text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-sm">
                        <span>GST (5%)</span>
                        <span>₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-white font-black text-xl border-t border-zinc-700 pt-2">
                        <span>Total</span>
                        <span className="text-orange-500">₹{total}</span>
                    </div>
                    <button
                        onClick={() => navigate('/bill')}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl text-lg transition-colors mt-2 active:scale-95">
                        Confirm Order →
                    </button>
                </div>
            </div>
        </div>
    );
}
