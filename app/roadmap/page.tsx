"use client";

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart, DragUpdate } from 'react-beautiful-dnd';
import './roadmap.css'; // Assuming we have a CSS file for styling specific to this page


enum TaskStatus {
  SHIPPED = 'shipped',
  NOW = 'now',
  NEXT = 'next',
  LATER = 'later',
}

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

const initialTasks: Task[] = [
  { id: 1, title: 'Set up projects', status: TaskStatus.SHIPPED },
  { id: 2, title: 'Create roadmap', status: TaskStatus.NOW },
  { id: 3, title: 'Develop features', status: TaskStatus.NEXT },
  { id: 4, title: 'Deploy to production', status: TaskStatus.LATER },
];

const RoadmapPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const onDragStart = (start: DragStart) => {
    console.log('Drag started:', start);
  };

  const onDragUpdate = (update: DragUpdate) => {
    console.log('Drag updated:', update);
  };

  const onDragEnd = (result: DropResult) => {
    console.log('Drag ended:', result);
    if (!result.destination) {
      console.log('No destination, aborting drag.');
      return;
    }

    const { source, destination } = result;

    console.log('Source:', source);
    console.log('Destination:', destination);

    const task = tasks.find(task => task.id.toString() === result.draggableId);
    if (task) {
      moveTask(task.id, destination.droppableId as TaskStatus);
    } else {
      console.error('Task not found for draggableId:', result.draggableId);
    }
  };

  const renderTasks = (status: Task['status']) => {
    console.log(`Rendering tasks for status: ${status}`);
    return tasks
      .filter(task => task.status === status)
      .map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={`task-card`}
              style={{ ...provided.draggableProps.style }}
            >
              <h3>{task.title}</h3>
              <p>{`Task ID: ${task.id}`}</p>
              <p>{`Draggable ID: ${task.id.toString()}`}</p>
            </div>
          )}
        </Draggable>
      ));
  };

  const renderColumn = (status: TaskStatus, title: string) => {
    return (
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`kanban-column ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            <h3>{title}</h3>
            {renderTasks(status)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <h2>Roadmap Kanban Board</h2>
      {winReady ? <div className="kanban-board">

        {renderColumn(TaskStatus.SHIPPED, 'Shipped')}
        {renderColumn(TaskStatus.NOW, 'Now')}
        {renderColumn(TaskStatus.NEXT, 'Next')}
        {renderColumn(TaskStatus.LATER, 'Future')}      </div>
 : null}
    </DragDropContext>
  );
};

export default RoadmapPage;
