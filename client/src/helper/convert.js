/** Converting image to base 64 format*/
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload =() =>{
            resolve(fileReader.result)
        }
        fileReader.onerror = (error)=>{
            reject(error);
        }
    })
}