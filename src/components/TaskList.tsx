import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface Result {
  task: Task | undefined;
  index: number;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return

    const task = {
      id: parseInt(crypto.randomUUID()),
      title: newTaskTitle,
      isComplete: false
    }

    const newTasks = tasks
    newTasks.push(task)
    
    setTasks([...newTasks])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    }: task)

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const { task, index } = findTask(id)

    if (!task) return;

    const startPositions = [...tasks.slice(0, index)]
    const endPositions = [...tasks.slice(index + 1)] 
    const newTasks = startPositions.concat(endPositions)

    return setTasks([...newTasks])
  }

  function findTask(id: number): Result  {
    const task = tasks.find(task => task.id === id)
  
    if (!task) return {
      task: undefined,
      index: 0
    }

    const index = tasks.indexOf(task)

    return {
      task,
      index
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}