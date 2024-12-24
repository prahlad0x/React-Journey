import { useEffect, useState } from "react";

export function useLocalStorage(initialValue, key) {
  const [value, setValue] = useState(() => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : initialValue;
  });

  useEffect(() => {
    if (!value.length) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
