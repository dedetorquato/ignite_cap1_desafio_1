import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let newTask: Task | undefined  = tasks.find((task)=>newTaskTitle === task.title);
    if(newTask){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome.",
        [
          { text: "OK", onPress: () => {}}
        ]
      );
    }else{
       newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done:false
      };
      const newTasks:Task[] = [...tasks, newTask];
      console.log('newTasks', newTasks);
      setTasks(newTasks)
    }

  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const newTasks: Task[] = [];
    tasks.forEach((task) => {
      if(id === task.id){
        task.title = newTaskTitle;
      }
      newTasks.push(task);
    });
    setTasks(newTasks); 

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
    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Sim", 
          onPress: () => {
            const newTasks: Task[] = tasks.filter((task)=>id !== task.id);
            setTasks(newTasks); 
          } 
        }
      ]
    );

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}

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