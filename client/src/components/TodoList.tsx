import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodos } from "../services/todoService";
import { Todo } from "../types/todo";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editTodo,setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        console.log("Setting todos:", data);
        setTodos(data);
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const addedTodo = await addTodo(newTodo);
      setTodos((prev) => [...prev, addedTodo]);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo");
    }
  };

  const handleUpdateTodo = async (e:React.FormEvent) => {
        e.preventDefault();
        if(!editTodo || !editTodo.title.trim()) return;

        try {
            const updatedTodo = await updateTodos(editTodo._id, editTodo.title);
            setTodos((prev)=>prev.map(todo=>
                todo._id === editTodo._id? updatedTodo :  todo
            ))
            setEditTodo(null);

        } catch (error) {
            console.error("Error updating todo:", error);
            setError("Failed to update todo")
        }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
      setError("Failed to delete todo");
    }
  };

  if (loading) return <div className="text-center text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <>
         <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li className="flex items-center justify-between bg-white p-2 rounded shadow" key={todo._id}>
                            {editTodo?._id === todo._id ? (
                                <form onSubmit={handleUpdateTodo} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editTodo.title}
                                        onChange={(e) => setEditTodo({...editTodo, title: e.target.value})}
                                        className="flex-1 p-2 border rounded"
                                    />
                                    <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
                                    <button type="button" onClick={() => setEditTodo(null)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                                </form>
                            ) : (
                                <>
                                    <span className="text-gray-700">{todo.title}</span>
                                    <div className="flex gap-2">
                                    <button  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => setEditTodo(todo)}>Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
          <form onSubmit={handleAddTask} className="flex-gap=2 mb-4 mt-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new task"
              className="flex-1 p-2 border rounded"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Add New Task</button>
           
          </form>
        </>
      )}
    </div>
  );
};

export default TodoList;
