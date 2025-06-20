import { GENDERS } from '../constants/genders.js';

const parseNumber = (value, defaultValue) => {
  const parsed = Number.parseInt(value);
  if (Number.isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
};

const parseBoolean = (value) => {
  if (['true', 'false'].includes(value)) return JSON.parse(value);
};

const parseGender = (value) => {
  if (Object.values(GENDERS).includes(value)) return value;
};

const parseSortOrder = (value) => {
  if (['asc', 'desc'].includes(value)) {
    return value;
  }

  return 'asc';
};

const parseSortBy = (value) => {
  if (['name', 'avgMark', 'age'].includes(value)) {
    return value;
  }

  return '_id';
};

export const parseSortParams = (obj) => {
  return {
    sortOrder: parseSortOrder(obj.sortOrder),
    sortBy: parseSortBy(obj.sortBy),
  };
};

export const parseFilters = (obj) => {
  return {
    minAge: parseNumber(obj.minAge),
    maxAge: parseNumber(obj.maxAge),
    minAvgMark: parseNumber(obj.minAvgMark),
    maxAvgMark: parseNumber(obj.maxAvgMark),
    onDuty: parseBoolean(obj.onDuty),
    gender: parseGender(obj.gender),
  };
};

export const parsePaginationParams = (obj) => {
  return {
    page: parseNumber(obj.page, 1),
    perPage: parseNumber(obj.perPage, 10),
  };
};
