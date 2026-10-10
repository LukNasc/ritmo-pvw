"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function subscribeKey(key: string, callback: () => void) {
    let set = listeners.get(key);
    if (!set) listeners.set(key, (set = new Set()));
    set.add(callback);

    const onStorage = (e: StorageEvent) => {
        if (e.key === key || e.key === null) callback();
    };
    window.addEventListener("storage", onStorage);

    return () => {
        set!.delete(callback);
        window.removeEventListener("storage", onStorage);
    };
}

function emit(key: string) {
    listeners.get(key)?.forEach((cb) => cb());
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
    // Snapshot é a string crua: comparável por valor, estável entre renders
    const raw = useSyncExternalStore(
        useCallback((cb) => subscribeKey(key, cb), [key]),
        () => window.localStorage.getItem(key),
        () => null, // snapshot do servidor
    );

    const isLoaded = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    const value = useMemo<T>(() => {
        if (raw === null) return initialValue;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return initialValue;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raw]);

    const setValue = useCallback(
        (next: T | ((prev: T) => T)) => {
            try {
                // Lê SEMPRE o valor mais recente direto do storage
                const currentRaw = window.localStorage.getItem(key);
                const current: T =
                    currentRaw === null ? initialValue : JSON.parse(currentRaw);
                const resolved =
                    next instanceof Function ? next(current) : next;

                window.localStorage.setItem(key, JSON.stringify(resolved));
                emit(key); // o evento 'storage' não dispara na própria aba
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [key],
    );

    return [value, setValue, isLoaded];
}