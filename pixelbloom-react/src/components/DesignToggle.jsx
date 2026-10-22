import { useEffect } from 'react'
import './DesignToggle.css'

export default function DesignToggle({ designVersion, onChange }) {
  const showPreviousDesign = designVersion === 'previous'

  useEffect(() => {
    if (!showPreviousDesign) return undefined

    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.href = `${import.meta.env.BASE_URL}previous-design.css`
    stylesheet.dataset.previousDesign = 'true'
    stylesheet.onerror = () => {
      console.error(`Unable to load the previous design stylesheet: ${stylesheet.href}`)
    }
    document.head.append(stylesheet)

    return () => stylesheet.remove()
  }, [showPreviousDesign])

  return (
    <div className="design-toggle">
      <span className="design-toggle-label">
        {showPreviousDesign ? 'Previous design' : 'Current design'}
      </span>
      <button
        className="design-toggle-switch"
        type="button"
        role="switch"
        aria-checked={showPreviousDesign}
        aria-label={`Switch to ${showPreviousDesign ? 'current' : 'previous'} website design`}
        onClick={() => onChange(showPreviousDesign ? 'current' : 'previous')}
      >
        <span className="design-toggle-thumb" />
      </button>
    </div>
  )
}
