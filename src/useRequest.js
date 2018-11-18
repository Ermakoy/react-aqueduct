import { useEffect, useState } from 'react';

const useRequest = (request, initialArguments) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    request(...initialArguments)
      .then(setData)
      .catch(setData)
      .finally(() => setIsLoading(false));
  }, initialArguments);

  const updateData = () => {};

  return { data, isLoading, error, updateData };
};

export { useRequest };
