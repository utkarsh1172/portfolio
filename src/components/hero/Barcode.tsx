/**
 * A decorative barcode drawn from a string, so the waybill carries a real
 * identifier (the GitHub handle) rather than random noise. Not scannable.
 */
export function Barcode({ value, className }: { value: string; className?: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    for (let bit = 0; bit < 4; bit++) {
      const w = ((code >> bit) & 1) + 1; // 1 or 2 units wide
      const gap = ((code >> (bit + 2)) & 1) + 1;
      bars.push({ x, w });
      x += w + gap;
    }
  }
  return (
    <svg viewBox={`0 0 ${x} 24`} preserveAspectRatio="none" className={className} aria-hidden focusable="false">
      <g fill="currentColor">
        {bars.map((b) => (
          <rect key={b.x} x={b.x} y={0} width={b.w} height={24} />
        ))}
      </g>
    </svg>
  );
}
