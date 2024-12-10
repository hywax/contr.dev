export default eventHandler(async (event) => {
  const storage = useStorage('blob')
  await storage.setItem('key.txt', 'value')

  return {
    status: true,
  }
})
