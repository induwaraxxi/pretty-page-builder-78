import { useSyncExternalStore } from "react";

const KEY = "exploreday.plan";

let ids: string[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) ids = JSON.parse(raw) as string[];
  } catch {
    ids = [];
  }
}

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const EMPTY: string[] = [];

export function usePlan() {
  return useSyncExternalStore(
    subscribe,
    () => ids,
    () => EMPTY,
  );
}

export const planActions = {
  toggle(id: string) {
    hydrate();
    ids = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    persist();
    emit();
  },
  remove(id: string) {
    hydrate();
    ids = ids.filter((x) => x !== id);
    persist();
    emit();
  },
  move(id: string, direction: -1 | 1) {
    hydrate();
    const i = ids.indexOf(id);
    const j = i + direction;
    if (i < 0 || j < 0 || j >= ids.length) return;
    const next = [...ids];
    [next[i], next[j]] = [next[j], next[i]];
    ids = next;
    persist();
    emit();
  },
  clear() {
    ids = [];
    persist();
    emit();
  },
};
