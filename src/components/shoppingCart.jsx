import { useState } from "react"
import { initialItems } from "../data"
import { CartItem } from "./Item"


export function ShoppingCart() {
    const [items, setItems] = useState(initialItems)
    const [discount_percentage, setDiscount] = useState(10)
    const [discountInput, setDiscountInput] = useState("")

    function handleItemQuantity(id, quantity) {
        const newItems = items.map(item => {
            if (item.id == id) {
                return {
                    ...item,
                    quantity: quantity
                }
            }

            return item
        })

        setItems(newItems)
    }

    function deleteItem(id) {
        const arrayItems = items.filter(item => item.id !== id)

        setItems(arrayItems)
    }

    function applyDiscount(value) {
        setDiscount(Number(value) || 0)
    }

    const SubTotal = items.reduce((sum, item) => { return sum + (item.quantity * item.price) }, 0);
    const discount = (discount_percentage / 100) * SubTotal;
    const DeliveryFee = 100;
    const total = SubTotal - discount + DeliveryFee

    // handleItemQuantity(2, 10)
    // deleteItem(2)

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
                    <p className="mt-1 text-sm text-gray-500">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* product */}
                    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                        <div className="flex text-xs font-semibold uppercase tracking-wide text-gray-400 pb-4 border-b border-gray-100">
                            <h2 className="flex-1">Product</h2>
                            <h2 className="w-[120px] text-center">Quantity</h2>
                            <h2 className="w-[80px] text-right">Total</h2>
                            <h2 className="w-[40px]"></h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {
                                items.length > 0 ? items.map(item => <CartItem key={item.id} item={item} deleteItem={deleteItem} handleItemQuantity={handleItemQuantity} />)
                                    :
                                    <p className="py-16 text-center text-sm text-gray-400">Your cart is empty</p>
                            }
                        </div>
                    </div>

                    {/* summary */}
                    <div className="w-full lg:w-95 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-5">Order Summary</h2>

                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                placeholder="Discount code"
                                className="flex-1 min-w-0 border border-gray-200 rounded-xl px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                                value={discountInput}
                                onChange={(e) => setDiscountInput(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
                                onClick={() => applyDiscount(discountInput)}
                            >
                                Apply
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Sub Total</span>
                                <span className="font-medium text-gray-900">${SubTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Discount ({discount_percentage}%)</span>
                                <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Delivery fee</span>
                                <span className="font-medium text-gray-900">${DeliveryFee.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-5 pt-5 border-t border-gray-100">
                            <span className="text-base font-semibold text-gray-900">Total</span>
                            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}