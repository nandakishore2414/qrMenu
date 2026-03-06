import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Utensils } from 'lucide-react';

export default function BillPage() {
    const { cartItems, subtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    const handleDone = () => {
        clearCart();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-10">
            {/* Header */}
            <header className="bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto flex items-center gap-3">
                    <button onClick={() => navigate('/order')} className="text-zinc-400 hover:text-white transition-colors text-2xl leading-none">←</button>
                    <h1 className="text-xl font-black">Bill <span className="text-orange-500">Estimate</span></h1>
                </div>
            </header>

            <div className="max-w-2xl mx-auto p-4">

                {/* Confirmed Banner */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 flex items-center gap-4 mt-4 mb-6">
                    <CheckCircle className="text-green-400 w-10 h-10 shrink-0" />
                    <div>
                        <p className="font-bold text-green-400 text-lg">Order Confirmed!</p>
                        <p className="text-zinc-400 text-sm mt-0.5">Please show this bill to the waiter or pay at the counter.</p>
                    </div>
                </div>

                {/* Cafe Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-black tracking-tight">GAN<span className="text-orange-500">GRILL</span></h2>
                    <p className="text-zinc-400 text-sm mt-1">Vellangallur</p>
                    <div className="border-t border-dashed border-zinc-700 mt-4" />
                </div>

                {/* Items Table */}
                <div className="space-y-3 mb-6">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-zinc-500 text-sm">₹{item.price} × {item.qty}</p>
                            </div>
                            <p className="font-bold text-white">₹{item.price * item.qty}</p>
                        </div>
                    ))}
                </div>

                {/* Bill Breakdown */}
                <div className="border-t border-dashed border-zinc-700 pt-4 space-y-2">
                    <div className="flex justify-between text-zinc-400 text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-sm">
                        <span>GST (5%)</span>
                        <span>₹{gst}</span>
                    </div>
                    <div className="border-t border-zinc-700 pt-3 flex justify-between text-xl font-black">
                        <span>Total Payable</span>
                        <span className="text-orange-500">₹{total}</span>
                    </div>
                </div>

                {/* Thank You */}
                <div className="border-t border-dashed border-zinc-700 mt-6 pt-6 text-center">
                    <Utensils className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                    <p className="text-zinc-500 text-sm">Thank you for dining at Gangrill!</p>
                    <p className="text-zinc-600 text-xs mt-1">Your food is being prepared 🔥</p>
                </div>

                {/* Back to Menu */}
                <button
                    onClick={handleDone}
                    className="w-full mt-8 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-2xl transition-colors">
                    ← Back to Menu
                </button>
            </div>
        </div>
    );
}
