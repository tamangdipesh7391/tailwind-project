import { Board } from "./boardColumn";
import { useState } from "react";
import {initialTasks} from "./data";

export function MainContent() {
    const taskBoards = [
        {value: "todo", label: "To Do"},
        {value: "in-progress", label: "In Progress"},
        {value: "done", label: "Done"},
    ];
    const [tasks, setTasks] = useState(initialTasks);

    function deleteTask(taskId) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }

    const [activeBoard, setActiveBoard] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    function addNewTask(e, boardValue) {
        e.preventDefault();
        const newTask = {
            id: `sample-${tasks.length + 1}`,
            title: formData.title || "Sample Task",
            description: formData.description || "Task description...",
            status: boardValue
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setFormData({ title: "", description: "" });
        setActiveBoard(null);
    }

    function cancelAddTask() {
        setFormData({ title: "", description: "" });
        setActiveBoard(null);
    }

    function moveTask(e, targetStatus) {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: targetStatus } : task
            )
        );
    }

    return (
        <main className="main-content">
            <header className="topbar border-b border-gray-700">
                <div className="search-bar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search a task..." />
                    <span className="shortcut">⌘K</span>
                </div>
                <div className="user-profile">
                    <div className="avatar-group">
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                    </div>
                </div>
            </header>

            <div className="project-header">
                <h1>NovaBoard Mobile App</h1>
                <div className="project-meta">
                    <span className="meta-item">Client: <strong>Arcadia Solutions</strong></span>
                    <span className="meta-dot">•</span>
                    <span className="meta-item menu-item-second">Timeline: <strong>May 20 - June 30, 2025</strong></span>
                    <span className="status-pill">In Progress</span>
                </div>
            </div>

            <section className="board-container" id="board">
                {
                    taskBoards.map(board => {
                        const taskList = tasks.filter(task => task.status === board.value);
                        const showAddTaskButton = activeBoard !== board.value;
                        return <Board
                            key={board.value}
                            board={board}
                            tasks={taskList}
                            onDeleteTask={deleteTask}
                            showAddTaskButton={showAddTaskButton}
                            setActiveBoard={setActiveBoard}
                            addNewTask={addNewTask}
                            formData={formData}
                            setFormData={setFormData}
                            cancelAddTask={cancelAddTask}
                            moveTask={moveTask}
                        />;
                    })
                }
            </section>
        </main>
    )
}