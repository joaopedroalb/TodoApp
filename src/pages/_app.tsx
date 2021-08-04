import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { useState } from 'react';
import {TaskContextProvider} from '../contexts/TaskContext'

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <TaskContextProvider>
      <Component {...pageProps}/>
    </TaskContextProvider>
  )
}
export default MyApp
