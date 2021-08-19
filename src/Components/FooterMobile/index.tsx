import styles from './index.module.scss'

import {useTask } from '../../contexts/TaskContext'

export default function FooterMobile(props:{filter:number,setFilter(int:number):any}){
    const {isDark } = useTask();

    return(
        <div className={isDark ? styles.filterContainerDark:styles.filterContainerWhite}>
            <label onClick={()=>props.setFilter(0)} className={props.filter==0?styles.selectedFilter:""}>All</label>
            <label onClick={()=>props.setFilter(1)} className={props.filter==1?styles.selectedFilter:""}>Active</label>
            <label onClick={()=>props.setFilter(2)} className={props.filter==2?styles.selectedFilter:""}>Completed</label>
        </div>
    )
}