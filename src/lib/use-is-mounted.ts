"use client";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during the server render and the hydrating render, `true` afterwards.
 *
 * The canonical "am I hydrated yet" hook: `useSyncExternalStore` gives React a
 * different snapshot for SSR than for the client, so the swap happens as part of
 * hydration instead of as a setState inside an effect (which triggers a
 * cascading render and is flagged by react-hooks/set-state-in-effect).
 */
export function useIsMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
