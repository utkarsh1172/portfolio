"use client";

import { ArrowUpRight, Briefcase, Copy, CornerDownLeft, Download, Hash, Mail, Search } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useCaseSelection } from "@/components/providers/CaseSelectionProvider";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/projects";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll";

type Group = "Go to" | "Case studies" | "Links";

interface Command {
  id: string;
  label: string;
  group: Group;
  keywords: string;
  icon: ReactNode;
  run: () => void | Promise<void>;
  /** Keep the palette open after running (for actions that report back). */
  stay?: boolean;
}

const subscribeNoop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

/** The visitor's shortcut label, rendered as "Ctrl K" on the server. */
function useShortcutLabel(): string {
  const mac = useSyncExternalStore(subscribeNoop, isMac, () => false);
  return mac ? "⌘K" : "Ctrl K";
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = profile.resume.path;
  a.download = profile.resume.fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Keyboard-first navigation: Ctrl+K / Cmd+K opens a searchable list of
 * sections, case studies and links. A native <dialog> handles focus trapping,
 * Escape and the backdrop; the list follows the WAI-ARIA combobox pattern.
 */
export function CommandPalette() {
  const { openCase } = useCaseSelection();
  const shortcut = useShortcutLabel();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => () => {
      requestAnimationFrame(() => scrollToSection(id));
    };
    const list: Command[] = [
      {
        id: "nav-top",
        label: "Top of the page",
        group: "Go to",
        keywords: "home hero start",
        icon: <Hash size={16} />,
        run: goTo("top"),
      },
      ...navigation.map((n) => ({
        id: `nav-${n.id}`,
        label: n.label,
        group: "Go to" as const,
        keywords: `section ${n.id}`,
        icon: <Hash size={16} />,
        run: goTo(n.id),
      })),
      ...caseStudies.map((c) => ({
        id: `case-${c.id}`,
        label: c.name,
        group: "Case studies" as const,
        keywords: `${c.kind} ${c.company} ${c.stack.join(" ")} ${c.summary} ${c.built.join(" ")} project`,
        icon: <Briefcase size={16} />,
        run: () => openCase(c.id),
      })),
      {
        id: "link-resume",
        label: "Download resume (PDF)",
        group: "Links",
        keywords: "cv pdf download",
        icon: <Download size={16} />,
        run: downloadResume,
      },
      {
        id: "copy-email",
        label: `Copy email: ${profile.email}`,
        group: "Links",
        keywords: "contact mail address",
        icon: <Copy size={16} />,
        stay: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setStatus("Email copied to clipboard.");
          } catch {
            setStatus(`Copy isn't available here. The address is ${profile.email}.`);
          }
        },
      },
      {
        id: "email",
        label: "Write an email",
        group: "Links",
        keywords: "contact mail hire",
        icon: <Mail size={16} />,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
    ];
    if (profile.links.github) {
      const url = profile.links.github;
      list.push({
        id: "github",
        label: "Open GitHub",
        group: "Links",
        keywords: "code repositories repos",
        icon: <ArrowUpRight size={16} />,
        run: () => openExternal(url),
      });
    }
    if (profile.links.linkedin) {
      const url = profile.links.linkedin;
      list.push({
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Links",
        keywords: "connect profile network",
        icon: <ArrowUpRight size={16} />,
        run: () => openExternal(url),
      });
    }
    return list;
  }, [openCase]);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.group} ${c.keywords}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [commands, query]);

  const show = useCallback(() => {
    setQuery("");
    setActive(0);
    setStatus("");
    setOpen(true);
  }, []);

  // Global shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) dialogRef.current?.close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show]);

  // Sync React state with the native dialog.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const run = async (c: Command | undefined) => {
    if (!c) return;
    if (!c.stay) dialogRef.current?.close();
    await c.run();
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const last = results.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i >= last ? 0 : i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? last : i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Enter") {
      e.preventDefault();
      void run(results[active]);
    }
  };

  // Keep the active option visible while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId]);

  let lastGroup: Group | null = null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-label="Search and jump to"
        className="hidden min-h-10 items-center gap-2 rounded-full border border-line px-3 text-sm text-muted transition hover:border-ink/40 hover:text-ink md:inline-flex"
      >
        <Search size={15} aria-hidden />
        <kbd className="font-semi font-semibold tabular-nums">{shortcut}</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search and jump to"
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="fixed inset-x-0 top-[12vh] mx-auto w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] backdrop:bg-[rgb(0_0_0/0.55)] backdrop:backdrop-blur-sm"
      >
        {open && (
          <div>
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="shrink-0 text-muted" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
                aria-autocomplete="list"
                aria-label="Type a section, project or link"
                placeholder="Jump to a section, project or link"
                className="h-14 w-full bg-transparent text-[1.05rem] outline-none placeholder:text-muted"
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 text-xs text-muted sm:block">Esc</kbd>
            </div>

            <ul id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-muted">
                  Nothing matches &ldquo;{query}&rdquo;. Try a section name or a technology.
                </li>
              )}
              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                return (
                  <li key={c.id} role="presentation">
                    {header && (
                      <p className="px-3 pt-3 pb-1 font-semi text-[0.8rem] font-semibold text-muted" aria-hidden>
                        {header}
                      </p>
                    )}
                    <div
                      id={`${listId}-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => void run(c)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5",
                        i === active ? "bg-surface-2 text-ink" : "text-ink/85",
                      )}
                    >
                      <span className={cn("shrink-0", i === active ? "text-accent" : "text-muted")} aria-hidden>
                        {c.icon}
                      </span>
                      <span className="flex-1 truncate">{c.label}</span>
                      {i === active && <CornerDownLeft size={15} className="shrink-0 text-muted" aria-hidden />}
                    </div>
                  </li>
                );
              })}
            </ul>

            <p role="status" className={cn("text-sm text-muted", status && "border-t border-line px-4 py-2.5")}>
              {status}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
