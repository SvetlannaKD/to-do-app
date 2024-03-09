import {useMemo} from 'react';

export function useSortedList (list, sort) {

  const sortedList = useMemo(() => {
    if (sort) {
      return [...list].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return list;
  }, [sort, list]);

  return sortedList;   
}

export function useList (list, sort, query) {
  const sortedList = useSortedList(list, sort);

  const isQueryInString = (string, query) => {
      return string.toLowerCase().includes(query.toLowerCase());
    };
  
    const sortedAndSearchedList = useMemo(() => {
      if (query && query !== " ") {
        return (
            sortedList.filter((post) => {
              return isQueryInString(post.title, query) || isQueryInString(post.text || post.body, query);
            })
          );
      }
      return sortedList;
    }, [query, sortedList]);

    return sortedAndSearchedList;
}