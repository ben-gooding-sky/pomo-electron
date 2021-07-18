interface None<A> {
  _tag: 'none';
  map: <B>(f: (m: A) => B) => None<A>;
  get: (fallback: A) => A;
}

interface Some<A> {
  _tag: 'some';
  map: <B>(f: (m: A) => B) => Some<B>;
  get: (fallback: A) => A;
}

export function some<A>(val: A): Some<A> {
  return {
    _tag: 'some',
    get: () => val,
    map: (fn) => some(fn(val)),
  };
}

export function none<A>(): None<A> {
  return {
    _tag: 'none',
    get: (fallback) => fallback,
    map: () => none(),
  };
}

export type Option<A> = None<A> | Some<A>;
