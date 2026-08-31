import { useState } from "react";
import { TaskCard } from "./task";

export function Board({
        board,
        tasks,
        onDeleteTask,
        showAddTaskButton,
        setActiveBoard,
        addNewTask,
        formData,
        setFormData,
        cancelAddTask,
        moveTask
    }) {
    const [isDragOver, setIsDragOver] = useState(false);

    function handleDragOver(e) {
        e.preventDefault(); // required so onDrop actually fires
        e.dataTransfer.dropEffect = "move";
        setIsDragOver(true);
    }

    function handleDragLeave() {
        setIsDragOver(false);
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragOver(false);
        moveTask(e, board.value);
    }

    return (
        <div className={`board-column col-${board.value}`}>
            <div className="board-header">
                <div className="header-left">
                    <span className={`dot dot-${board.value}`}></span>
                    <h2>{board.label}</h2>
                </div>
                <button className="more-btn">•••</button>
            </div>

            <div
                className={`task-list task-list-${board.value}${isDragOver ? " drop-target" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {tasks.length === 0 ? (
                    <p className="empty-state">No tasks yet.</p>
                ) : (
                    <>
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />
                        ))}
                    </>
                )}
            </div>

            {showAddTaskButton ? (
                <button
                    className="add-task-btn"
                    onClick={() => setActiveBoard(board.value)}
                >
                    + Add Task
                </button>
            ) : (
                <form className="inline-task-form" >
                    <input
                        type="text"
                        name="title"
                        placeholder="Task title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        autoFocus
                    />
                    <textarea
                        name="description"
                        rows="2"
                        placeholder="Task description..."
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                    <div className="form-actions">
                        <button type="submit" className="btn-save" onClick={(e) => addNewTask(e, board.value)}>Save</button>
                        <button type="button" className="btn-cancel cancel-task-btn" onClick={cancelAddTask} >Cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
}