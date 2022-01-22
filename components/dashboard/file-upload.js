import { useRef, useState } from "react";

const FileUpload = ({onFileUpload}) => {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)

    const openExplorer = () => {
        inputRef.current.click();
    }

    const onDragged = () => {
        console.log("file dragged in")
    }

    const handleFileInput = (e) => {
        console.log("file selected")
        const file = e.target.files[0]

        if(file.size > 1024) {
            // file too large, return error
        } else if(file.type != "image/jpeg" || file.type != "image/png") {
            // Wrong file format, return error
        }

        setImage(URL.createObjectURL(file))
        setFile(file)
    }
    

    const uploadImage = () => {
        onFileUpload(file)
    }

    return (
        <div className="w-full h-full pt-2 pb-4">
                {!image ? (
            <button className="h-full w-full hover:bg-gray-100" onClick={openExplorer}>
                <div className="h-full flex flex-col justify-center items-center border-2">
                    <p className="text-lg pb-2">Select Image to upload</p>
                    <p className="text-gray-600 text-sm">or Drag and Drop here</p>
                </div>
            </button>
                ) : (
                    <div className="h-full flex flex-col items-center justify-between">
                        <div className="w-1/3">
                            <img className="shadow-lg rounded-full border" src={image} alt="preview image" />
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <button className="text-sm" onClick={() => {setImage(null)}}>Select another image</button>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded-lg" onClick={uploadImage}>Upload</button>
                        </div>
                    </div>
                )}
                <input type="file" id="file" accept="image/jpeg, image/png" ref={inputRef} style={{display: "none"}} onChange={handleFileInput}/>

                
        </div>
    )
}

export default FileUpload