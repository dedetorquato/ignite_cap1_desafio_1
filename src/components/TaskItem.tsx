import React, {useState, useRef, useEffect} from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { Task } from './TasksList';

interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskTitle: string) => void;
  }

export function TaskItem({task, toggleTaskDone, removeTask, editTask}: TaskItemProps) {
  const [taskInEditing, setTaskInEditing] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(task.title);
  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (textInputRef.current) {
      if (taskInEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [taskInEditing])
  
  function handleStartEditing() {
    setTaskInEditing(true);
  }
  
  function handleCancelEditing() {
    setNewTaskTitle(task.title);
    setTaskInEditing(false);
  }
  function handleSubmitEditing() {
    editTask(task.id, newTaskTitle);
    setTaskInEditing(false);
  }
  return (
    <>
      <View style={styles.container}>
        <View style={{flex:1}}>
            <TouchableOpacity
            testID={`button-${task.id}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={()=>{toggleTaskDone(task.id)}}
            >
            <View 
                testID={`marker-${task.id}`}
                style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            >
                { task.done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>
            <TextInput
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              editable={taskInEditing}
              onSubmitEditing={handleSubmitEditing}
              style={task.done ? styles.taskTextDone : styles.taskText}
              ref={textInputRef}
            />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', alignItems: 'center', paddingLeft:12, paddingRight:24}}>
          {taskInEditing 
          ? (
              <TouchableOpacity
                  testID={`trash-${task.id}`}
                  onPress={handleCancelEditing}
                  
              >        
                  <Icon name="x" size={24} color="#b2b2b2" />
              </TouchableOpacity>
            ) 
            :(
                <TouchableOpacity
                  testID={`trash-${task.id}`}
                  onPress={handleStartEditing}
                  
                >        
                  <Image source={editIcon} />   
                </TouchableOpacity>
              )}

          <View 
              style={ styles.iconsDivider }
            />
        
            <TouchableOpacity
                testID={`trash-${task.id}`}
                onPress={()=>{removeTask(task.id)}}
                disabled={taskInEditing}
            >        
                <Image source={trashIcon} style={{ opacity: taskInEditing ? 0.2 : 1 }} />   
            </TouchableOpacity>
        </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    flexDirection:'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider:{
    width:1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal:12,
  }
})