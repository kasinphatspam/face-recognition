export const config = (message: string, type: string) => {
  return {
    render: `${message}`,
    type: `${type}`,
    isLoading: false,
    containerId: "main",
    closeButton: true,
    autoClose: 3000,
  }
}