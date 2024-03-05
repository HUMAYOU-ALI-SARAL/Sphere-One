export function saveToLocalStorage(name: string, state: any) {
    if (typeof window !== 'undefined') {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(name, serializedState);
    }
}

export function loadFromLocalStorage(name: string) {
    if (typeof window !== 'undefined') {
        const serializedState = localStorage.getItem(name);
        if (serializedState === null) return undefined;
        try {
            return JSON.parse(serializedState);
        } catch (error) {
            return;
        }
    }
}  