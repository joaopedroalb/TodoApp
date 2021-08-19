import styles from './style.module.scss'
import {IoMdAdd} from 'react-icons/io' 
import {ChangeEvent, useState} from 'react'

import { TaskContext,useTask } from '../../contexts/TaskContext'

type TaskItem ={
  id:number,
  title:string,
  isDone:boolean
};


export function CreateTask(){
    const { taskList,addTask } = useTask();
    const [title,setTitle] = useState("")

    function handleClick(){
      const idValue = taskList.length > 0 ? taskList[taskList.length-1].id+1:0;
      if(title.length>0){
        addTask({title:title,isDone:false,id:idValue})
        setTitle("");
      }
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