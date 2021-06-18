const secure = {
  // Melakukan Enkripsi
  decode(value: any) {
    return (value) ? atob(value) : null
  },
  encode(value: any) {
    return btoa(JSON.stringify(value))
  },
}
export {
  secure
};
