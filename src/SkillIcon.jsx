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
        style={{ width: size, height: size, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: bg,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 700,
        flexShrink: 0,
        letterSpacing: '-0.02em',
      }}
      title={name}
    >
      {label}
    </span>
  );
}
