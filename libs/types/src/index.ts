export type ListQueryType = {
  count?: number;
  startKey?: any;
  isAll?: boolean;
  attributes?: string[];
};

export type DetailQueryType = {
  types?: string[];
};
