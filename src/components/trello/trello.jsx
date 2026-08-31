import { MainContent } from "./mainContent"
import { Sidebar } from "./sidebar"
import "./index.css"

export function MiniTrello() {
    return (
        <div className="flex h-svh">
            <Sidebar />
            < MainContent />
        </div>
    )
}