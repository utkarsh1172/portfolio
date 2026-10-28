/** Shown only while a route segment streams in; every page is static, so this is rarely visible. */
export default function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-accent" aria-hidden />
        <span className="font-medium text-muted">Loading</span>
      </div>
    </div>
  );
}
