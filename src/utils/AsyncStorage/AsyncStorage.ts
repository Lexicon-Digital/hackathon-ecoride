import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getData<T>(key: string): Promise<T | undefined> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value != null ? (JSON.parse(value) as T) : undefined;
    }
  } catch (e) {
    console.error(`Failed to get data for key '${key}'`);
    console.error(e);
  }
}

export async function storeData<T>(key: string, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(
      `Failed to save the following data ${value} with the key '${key}'`,
    );
    console.error(e);
  }
}
