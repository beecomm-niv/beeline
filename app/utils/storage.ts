type KEYS = 'user';

type GetItemProps = {
  (key: KEYS, parse: false): string;
  (key: KEYS, parse: true): any;
};

export class StorageUtils {
  public static getItem: GetItemProps = (key, parse) => {
    try {
      const value = localStorage.getItem(key);

      if (!value) {
        return null;
      }

      if (!parse) {
        return value;
      }

      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  public static setItem = (key: KEYS, value: any) => {
    if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
      localStorage.setItem(key, value?.toString());
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
}
