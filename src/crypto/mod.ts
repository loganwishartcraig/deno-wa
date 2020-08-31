const IncrediblyInsecureCrypto = {
  randomBytes(numBytes: number): Uint8Array {
    const buff = new Uint8Array(numBytes);
    for (let i = 0; i < numBytes; i++) {
      buff[i] = Math.floor(Math.random() * (2 ** 8));
    }
    return buff;
  },
  randomString(len: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      },
    );
  },
} as const;

export default IncrediblyInsecureCrypto;
