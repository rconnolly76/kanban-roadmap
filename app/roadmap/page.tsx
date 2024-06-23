"use client";

import { useState } from 'react';
import './roadmap.css'; // Assuming we have a CSS file for styling specific to this page

type Task = {
  id: number;
  title: string;
  status: 'backlog' | 'in-progress' | 'completed';
};

const initialTasks: Task[] = [
  { id: 1, title: 'Set up projects', status: 'backlog' },
  { id: 2, title: 'Create roadmap', status: 'in-progress' },
  { id: 3, title: 'Develop features', status: 'backlog' },
  { id: 4, title: 'Deploy to production', status: 'completed' },
];

export default function RoadmapPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const renderTasks = (status: Task['status']) => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <div className="button-group">
            {status !== 'backlog' && <button onClick={() => moveTask(task.id, 'backlog')}>Backlog</button>}
            {status !== 'in-progress' && <button onClick={() => moveTask(task.id, 'in-progress')}>In Progress</button>}
            {status !== 'completed' && <button onClick={() => moveTask(task.id, 'completed')}>Completed</button>}
          </div>
        </div>
      ));
  };

  return (
    <div>
      <h2>Roadmap Kanban Board</h2>
      <div className="kanban-board">
        <div className="kanban-column">
          <h3>Backlog</h3>
          {renderTasks('backlog')}
        </div>
        <div className="kanban-column">
          <h3>In Progress</h3>
          {renderTasks('in-progress')}
        </div>
        <div className="kanban-column">
          <h3>Completed</h3>
          {renderTasks('completed')}
        </div>
      </div>
    </div>
  );
}
