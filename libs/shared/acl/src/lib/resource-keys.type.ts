type ResourceKeyUnion<T, K extends keyof T = keyof T> = K extends string
  ? `${K}` | '*' | `!${K}`
  : never;

export type ResourceKeys<T, K extends keyof T = keyof T> = ResourceKeyUnion<T, K>[];
