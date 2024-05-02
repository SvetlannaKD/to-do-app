import {useState} from 'react';

/**
 * @param callback {Function}
 */
export function useFetching (callback) {

  const [isLoading, setIsLoading] = useState(false); //Индикатор загрузки
  const [error, setError] = useState('');

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (ev) {
      setError(ev.message);   
    } finally {
      setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
    
}