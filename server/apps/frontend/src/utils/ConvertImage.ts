import Resizer from "react-image-file-resizer";

function hasBase64Prefix(base64String: string): boolean {
  return base64String.startsWith('data:image/') || base64String.startsWith('data:video/') || base64String.startsWith('data:audio/');
}

/** convert base64 to image files type image/jpeg */
export function base64toFile(base64String: string, fileName: string): File {
  const image = hasBase64Prefix(base64String) ? base64String.split(",")[1] : base64String;
  const byteCharacters = atob(image);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });
  const file = new File([blob], fileName, { type: "image/jpeg" });
  return file;
}

export async function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
}

/** image optimizer */
export const convertImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const maxWH = 1000;
    Resizer.imageFileResizer(
      file,
      maxWH,
      maxWH, // width x height
      "JPEG", // Specify the format
      80, // Quality
      0, // Rotation
      (uri) => {
        resolve(uri as File);
      },
      "file" //(base64, blob, or file)
    );
  });
};