import type React from 'react'
import ReactDOM from 'react-dom'
 
export const reportAccessibility = async (
  App: typeof React,
  config?: Record<string, unknown>
): Promise<void> => {
  if (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV !== 'production'
  ) {
    const axe = await import('@axe-core/react') 
    axe.default(App, ReactDOM, 100, config)
  }
}
 
export default reportAccessibility
