import { useLocalStorage } from "react-use";

export default function useStorageBoolean(key: string): [boolean, (to: boolean) => void] {
    const storage = useLocalStorage<boolean>(key);
    return [
        storage[0] || false,
        storage[1]
    ]
}