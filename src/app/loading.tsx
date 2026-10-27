/** Shown only while a route segment streams in; the home page is static, so this is rarely visible. */
export default function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span className="relative grid h-10 w-10 place-items-center" aria-hidden>
          <span className="absolute inset-0 pulse-ring rounded-full bg-accent/40" />
          <span className="h-4 w-4 rounded-md bg-accent" />
        </span>
        <span className="font-semi font-semibold text-muted">Loading</span>
      </div>
    </div>
  );
}
