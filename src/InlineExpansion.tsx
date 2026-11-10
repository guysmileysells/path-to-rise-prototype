import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

// Anchor the short trigger, never the tall panel. A new scroll supersedes an old
// one, so switching/nested disclosures cannot leave a delayed parent scroll.
function positionExpansion(trigger: HTMLElement, immediate = false) {
  trigger.scrollIntoView({
    block: 'start', inline: 'nearest',
    behavior: immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

export function Disclosure({ children, className, defaultOpen = false }: {
  children: ReactNode
  className?: string
  defaultOpen?: boolean
}) {
  const [initialOpen] = useState(defaultOpen)
  const userToggle = useRef(false)
  return (
    <details className={className} open={initialOpen}
      onClickCapture={(event) => {
        const summary = (event.target as Element).closest('summary')
        if (summary?.parentElement === event.currentTarget) userToggle.current = true
      }}
      onToggle={(event) => {
        // Native toggle events can originate from nested details or initial mount.
        if (event.target !== event.currentTarget || !userToggle.current) return
        userToggle.current = false
        const summary = event.currentTarget.querySelector<HTMLElement>(':scope > summary')
        if (event.currentTarget.open && summary) positionExpansion(summary)
      }}>
      {children}
    </details>
  )
}

export function InlineExpansion({ open, onToggle, label, buttonClassName = 'primary', children }: {
  open: boolean
  onToggle: () => void
  label: ReactNode
  buttonClassName?: string
  children: ReactNode
}) {
  const id = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useLayoutEffect(() => {
    if (open && !wasOpen.current && trigger.current) {
      trigger.current.focus({ preventScroll: true })
      positionExpansion(trigger.current)
    } else if (!open && wasOpen.current && trigger.current === document.activeElement) {
      // Bottom-of-panel return controls focus the surviving trigger before close.
      // Reposition after layout shrinks, not before, without another animation.
      positionExpansion(trigger.current!, true)
    }
    wasOpen.current = open
  }, [open])

  return (
    <div className="inline-expansion">
      <button id={`${id}-trigger`} ref={trigger} className={buttonClassName} type="button" title={open ? 'Collapse section' : 'Expand section'} aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>{label}<span className="expansion-indicator" aria-hidden="true">{open ? ' −' : ' +'}</span></button>
      <div id={`${id}-panel`} className="inline-expansion-panel" role="region" aria-labelledby={`${id}-trigger`} hidden={!open}>
        {open && children}
      </div>
    </div>
  )
}
