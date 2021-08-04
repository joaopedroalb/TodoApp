
import styles from './Home.module.scss'
import { CreateTask } from '../Components/CreateTask'

import {useTask } from '../contexts/TaskContext'

export default function Home() {

  const { taskList,changeStateTask,taskLeft } = useTask();

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
              taskList.map(item=>{
                return (
                  <li key={item.id}>
                    <input type="checkbox" className={styles.checkAround} onClick={()=>changeStateTask(item.id)}/>
                    <label>{item.title}</label>
                  </li>
                )
              })
            }
          </ul>
          <div className={styles.footerAfterList}>
            <label>{taskLeft} items left</label>
            <div className={styles.filterContainer}>
              <label>All</label>
              <label>Active</label>
              <label>Completed</label>
            </div>
            <label>Clear Completed</label>
          </div>
        </div>
      </div>
    </div>
  )
}
