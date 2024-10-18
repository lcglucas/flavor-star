import { twMerge } from "tailwind-merge";

export const classNames = (...inputs) => {
  return twMerge(inputs);
};
