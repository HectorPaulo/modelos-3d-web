import { useState, useRef, useEffect } from 'react';
import { useResponsiveContext } from "../../context/ResponsiveContext";

const ImageInput = ({ 
  onChange, 
  value, 
  className = '', 
  accept = "image/*", 
  maxSize = 10, // en MB
  aspectRatio,
  label = "Upload Image",
  disabled = false
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { isMobile } = useResponsiveContext();
  
  useEffect(() => {
    if (value instanceof File) {
      handlePreviewFromFile(value);
    } else if (typeof value === 'string' && value) {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  // Crear el preview desde la imagen seleccionada
  const handlePreviewFromFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Archivo valido?
  const validateFile = (file) => {
    setError(null);
    
    // Qué tipo de archivo es?
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona una imagen');
      return false;
    }
    
    // Checa el tamaño de la imagen    
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    if (fileSize > maxSize) {
      setError(`El archivo debe ser menor a ${maxSize}MB`);
      return false;
    }
    
    return true;
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    
    if (file && validateFile(file)) {
      handlePreviewFromFile(file);
      onChange && onChange(file);
    } else if (!file) {
      setPreviewUrl(null);
      onChange && onChange(null);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      handlePreviewFromFile(file);
      onChange && onChange(file);
    }
  };

  // Limpiar el input y el preview de la imagen anterior seleccionada
  const handleClear = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = '';
    setPreviewUrl(null);
    onChange && onChange(null);
    setError(null);
  };

  // Nueva función para abrir la cámara
  const openCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("No se pudo acceder a la cámara: " + err.message);
      setIsCameraOpen(false);
    }
  };

  // Nueva función para capturar foto
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Establecer dimensiones del canvas según el video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Dibujar el frame actual del video en el canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convertir a archivo
    canvas.toBlob((blob) => {
      if (blob) {
        // Crear un objeto File desde el Blob
        const file = new File([blob], "camera_photo.jpg", { type: "image/jpeg" });
        
        if (validateFile(file)) {
          // Detener la transmisión de video
          const stream = video.srcObject;
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
          
          // Actualizar estado
          handlePreviewFromFile(file);
          onChange && onChange(file);
          setIsCameraOpen(false);
        }
      }
    }, 'image/jpeg', 0.9);
  };

  // Cerrar cámara
  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  // Si la cámara está abierta, mostramos la interfaz correspondiente
  if (isCameraOpen) {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="relative bg-black rounded-lg overflow-hidden" 
             style={{ aspectRatio: aspectRatio || '16/9' }}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={closeCamera}
              className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={capturePhoto}
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>}
      
      <div 
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-blue-950'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100'}
          ${error ? 'border-red-500' : ''}
        `}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ 
          minHeight: '150px',
          aspectRatio: aspectRatio
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
        />
        
        {previewUrl ? (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="object-contain w-full h-full"
            />
            {!disabled && (
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                onClick={handleClear}
                type="button"
                aria-label="Quitar imagen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            {isDragging ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" clipRule="evenodd" />
                <path d="M8 7a1 1 0 00-1 1v2a1 1 0 002 0V8a1 1 0 00-1-1z" />
              </svg>
            )}
            <p className="text-sm text-gray-500">
              {isDragging ? 'Soltar imagen aquí' : 'Da clic o arrastra una imagen'}
            </p>
            <p className="text-xs text-gray-400">
              Formatos JPG y PNG no mayores a {maxSize}MB
            </p>
            
            {/* Botón de cámara para móviles */}
            {isMobile && !disabled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openCamera();
                }}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Usar cámara
              </button>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageInput;