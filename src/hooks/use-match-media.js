import { useState, useLayoutEffect } from "react";

const queries = ["(max-width: 640px)", "(min-width: 641px)"];

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));

  const getValues = mediaQueryLists.map((mql) => mql.matches);

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));

    return () => mediaQueryLists.forEach((mql) =>
      mql.removeEventListener("change", handler)
    );
  });

  return values
};
