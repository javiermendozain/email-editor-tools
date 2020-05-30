const regNicName = new RegExp(/^[a-zA-Z0-9_-]{5,25}$/);

export const isNickName = (text) => regNicName.test(text);
