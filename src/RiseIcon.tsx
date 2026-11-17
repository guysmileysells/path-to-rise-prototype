type RiseIconName = 'sun' | 'wind' | 'route' | 'heart-handshake' | 'bookmark' | 'lock-keyhole'

/** Local Lucide SVGs from the approved design. Decorative: the control supplies its name. */
export function RiseIcon({ name }: { name: RiseIconName }) {
  return <img className="rise-icon" src={`${import.meta.env.BASE_URL}icons/rise-${name}.svg`} alt="" aria-hidden="true" width="20" height="20" />
}
