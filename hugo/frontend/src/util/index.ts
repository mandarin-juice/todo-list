export const storageAvailable = (): boolean => {
  let storage;
  try {
    storage = window.localStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e: unknown) {
    return (
      e instanceof DOMException &&
      // Firefox를 제외한 모든 브라우저
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // 코드가 존재하지 않을 수도 있기 떄문에 이름 필드도 확인합니다.
        // Firefox를 제외한 모든 브라우저
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
      (storage ? true : false) &&
      storage?.langth !== 0
    );
  }
};

export const makeId = (): number => {
  const date = new Date();
  return date.getTime();
};
