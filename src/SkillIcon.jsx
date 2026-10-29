/** Renders a skill icon from CMS data.
 *  icon can be:
 *   - image URL (starts with / or http) → shows image
 *   - short text (Ps, Ai, etc.) → colored badge
 */
export default function SkillIcon({ icon, name, color, size = 32 }) {
  const isImage = icon && (icon.startsWith('/') || icon.startsWith('http') || icon.startsWith('data:'));
  const bg = color || '#3b82f6';
  const label = (icon || name || '?').toString().slice(0, 2);

  if (isImage) {
    return (
      <img
        src={icon}
        alt={name || ''}
        style={{
          width: size,
          height: size,
          borderRadius: Math.max(8, size * 0.22),
          objectFit: 'cover',
          flexShrink: 0,
          boxShadow: '0 4px 10px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)',
        }}
      />
    );
  }

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(8, size * 0.22),
        background: `linear-gradient(145deg, ${bg}ee, ${bg})`,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 800,
        flexShrink: 0,
        letterSpacing: '-0.02em',
        boxShadow: '0 4px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
      }}
      title={name}
    >
      {label}
    </span>
  );
}
