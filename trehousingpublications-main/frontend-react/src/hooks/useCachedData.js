import { useState, useEffect } from 'react';
import axios from 'axios';
import { extractArrayData } from '../apiConfig.js';

// In-memory global cache store
const memoryCache = new Map();
const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useCachedData(key, url, options = {}) {
  const staleTime = options.staleTime || DEFAULT_STALE_TIME;
  const cached = memoryCache.get(key);

  const [data, setData] = useState(() => {
    if (cached && (Date.now() - cached.timestamp < staleTime)) {
      return cached.data;
    }
    return options.initialData || null;
  });

  const [loading, setLoading] = useState(() => {
    return !(cached && (Date.now() - cached.timestamp < staleTime));
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const cachedEntry = memoryCache.get(key);
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < staleTime)) {
      setData(cachedEntry.data);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    axios.get(url)
      .then(res => {
        if (!isMounted) return;
        const result = options.transform ? options.transform(res.data) : res.data;
        memoryCache.set(key, { data: result, timestamp: Date.now() });
        setData(result);
        setError(null);
      })
      .catch(err => {
        if (!isMounted) return;
        console.error(`Cache fetch error [${key}]:`, err);
        setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [key, url, staleTime]);

  const invalidate = () => {
    memoryCache.delete(key);
  };

  return { data, loading, error, invalidate };
}
