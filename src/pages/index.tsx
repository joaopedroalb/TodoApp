import styles from './Home.module.scss'
import { CreateTask } from '../Components/CreateTask'

import {useTask } from '../contexts/TaskContext'

import {useState} from 'react'

export default function Home() {
  const [filter,setFilter] = useState(0)
  const { taskList,changeStateTask,taskLeft,clearTaskFinished } = useTask();

  return (
    <div className={styles.containerDark}>
      <div className={styles.containerHeader}></div>
      <div className={styles.containerBody}>

        <div className={styles.containerHeaderInfo}>
          <h1>TODO</h1>
          <img src="icon-sun.svg" />
        </div>
        <CreateTask />
        <br /><br />
        <div className={styles.listContainer}>
          <ul>
            {
              filter==0? (taskList.map(item=>{
                return (
                  <li key={item.id} onClick={()=>changeStateTask(item.id)}>
                    <input type="checkbox" className={styles.checkAround} checked={item.isDone}/>
                    {item.isDone? (<label><s>{item.title}</s></label>):<label>{item.title}</label>}
                  </li>
                )
              })):filter==1?
              taskList.filter(item=>(!item.isDone)).map(item=>{
                return (
                  <li key={item.id} onClick={()=>changeStateTask(item.id)}>
                    <input type="checkbox" className={styles.checkAround} checked={item.isDone}/>
                    {item.isDone? (<label><s>{item.title}</s></label>):<label>{item.title}</label>}
                  </li>
                )
              }):
              taskList.filter(item=>(item.isDone)).map(item=>{
                return (
                  <li key={item.id} onClick={()=>changeStateTask(item.id)}>
                    <input type="checkbox" className={styles.checkAround} checked={item.isDone}/>
                    {item.isDone? (<label><s>{item.title}</s></label>):<label>{item.title}</label>}
                  </li>
                )
              })
            }
          </ul>
          <div className={styles.footerAfterList}>
            <label>{taskLeft} items left</label>
            <div className={styles.filterContainer}>
              <label onClick={()=>setFilter(0)} className={filter==0?styles.selectedFilter:""}>All</label>
              <label onClick={()=>setFilter(1)} className={filter==1?styles.selectedFilter:""}>Active</label>
              <label onClick={()=>setFilter(2)} className={filter==2?styles.selectedFilter:""}>Completed</label>
            </div>
            <label onClick={()=>clearTaskFinished()} className={styles.clearLbl}>Clear Completed</label>
          </div>
        </div>
      </div>
    </div>
  )
}
