const defaults = { theme: 'light', notifications: { email: true, digest: 'weekly' } };
const store = new Map();

export function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      target[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export function getSettings(user) {
  return store.get(user) ?? structuredClone(defaults);
}

export function updateSettings(user, patch) {
  const next = deepMerge(getSettings(user), patch);
  store.set(user, next);
  return next;
}
