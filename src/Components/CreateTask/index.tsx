import styles from './style.module.scss'
import {IoMdAdd} from 'react-icons/io' 
import {ChangeEvent, useState} from 'react'

import { TaskContext,useTask } from '../../contexts/TaskContext'

type TaskItem ={
  title:string,
  isDone:boolean
};





export function CreateTask(){
    const { addTask } = useTask();
    const [title,setTitle] = useState("")

    function handleClick(){
      addTask({title:title,isDone:false})
      setTitle("");
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value);
  };
    return(
        <div className={styles.containerDark}>
          <span onClick={()=>handleClick()} className={styles.iconContainer}><IoMdAdd/></span>
          <input type="text" className={styles.textTask} placeholder="Create a new Todo" value={title} onChange={handleOnChange}/>
        </div>
    )
}