export const config = (
  message: string,
  type: string,
  isLoading: boolean = false,
  containerId: string = "main",
  closeButton: boolean = true,
  autoClose: number = 3000
) => {
  return {
    render: `${message}`,
    type: `${type}`,
    isLoading: isLoading,
    containerId: containerId,
    closeButton: closeButton,
    autoClose: autoClose,
  };
};
