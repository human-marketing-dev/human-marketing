"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lee una media query sin espejarla en estado.
 *
 * El snapshot de servidor es siempre `false`: en SSR no hay `window`, y
 * arrancar en `true` provocaria desajuste de hidratacion. Quien consuma esto
 * debe tratar `false` como "todavia no sabemos", no como "no aplica".
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
