import { useEffect, useRef, useState } from "react";

const FileUpload = ({onFileUpload}) => {
    const inputRef = useRef(null);
    const dropRef = useRef(null);

    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        let div = dropRef.current
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragLeave)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)
       
    }, [])
    const openExplorer = () => {
        setErrorMessage("")
        inputRef.current.click();
    }

    const handleDragIn = (e) => {e.preventDefault()}
    const handleDragLeave = (e) => {e.preventDefault()}
    const handleDrag = (e) => {e.preventDefault()}

    const handleDrop = (e) => {
        e.preventDefault()

        const file = e.dataTransfer.files[0]
        processFileInput(file)
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0]
        processFileInput(file)
    }

    const processFileInput = (file) => {
        console.log(file.size)
        if(file.size > 1000000) {
            // file too large, return error
            setErrorMessage("Please choose a file smaller than 1mb")
            return
        } else if(file.type != "image/jpeg" && file.type != "image/png") {
            setErrorMessage("Please choose a jpg file")
            return
        }

        setErrorMessage("")
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
                <div className="h-full flex flex-col justify-center items-center border-2" onDrop={handleDrop} ref={dropRef}>
                    {errorMessage && (
                        <p className="pb-2 text-red-600">{errorMessage}</p>
                    )}
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