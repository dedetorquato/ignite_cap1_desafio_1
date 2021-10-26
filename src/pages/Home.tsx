import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done:false
    };
    const newTasks:Task[] = [...tasks, newTask];
    console.log('newTasks', newTasks);
    setTasks(newTasks)
  }

  function handleToggleTaskDone(id: number) {
    const newTasks: Task[] = [];
    tasks.forEach((task) => {
      if(id === task.id){
        task.done = !task.done;
      }
      newTasks.push(task);
    });
    setTasks(newTasks); 
  }

  function handleRemoveTask(id: number) {
    const newTasks: Task[] = tasks.filter((task)=>id !== task.id);
    setTasks(newTasks); 
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})