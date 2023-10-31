declare module 'jest-localstorage-mock' {
    const mock: {
      setItem: (key: string, value: string) => void;
      getItem: (key: string) => string | null;
      removeItem: (key: string) => void;
      clear: () => void;
    };
    export default mock;
  }
  