export const config = (message, type) => {
  return {
    render: `${message}`,
    type: `${type}`,
    isLoading: false,
    containerId: "main",
    closeButton: true,
    autoClose: 3000,
  }
}