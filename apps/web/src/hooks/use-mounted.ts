import { useSyncExternalStore } from "react";

const emptySubscribe = () => {
  return () => undefined;
};

export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
