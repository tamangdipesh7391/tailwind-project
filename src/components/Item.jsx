export function CartItem({ item, deleteItem, handleItemQuantity }) {
    item.quantity === 0 && deleteItem(item.id)
    return (
        <div className="flex items-center py-4 group">
            <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
                <img className="w-16 h-16 rounded-xl object-cover ring-1 ring-gray-100" src={item.image} alt={item.title} />
                <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{item.subtitle}</p>
                </div>
            </div>

            <div className="w-[120px] flex items-center justify-center gap-1">
                <button
                    onClick={() => handleItemQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                >
                    −
                </button>
                <span className="w-6 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                <button
                    onClick={() => handleItemQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>

            <div className="w-[80px] text-right text-sm font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
            </div>

            <div className="w-[40px] flex justify-end">
                <button
                    onClick={() => deleteItem(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Remove item"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
