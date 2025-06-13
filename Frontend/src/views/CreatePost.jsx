import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import { FiPlus, FiUpload } from 'react-icons/fi';
import './CreatePost.css';


function CreatePost() {
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Obtener archivo
    if (file) {
      setImageFile(file);             // Guardar archivo en estado
      setImage(URL.createObjectURL(file));  // Crear URL para vista previa
    }
  };


  const handlePost = async () => {
    if (!username || !caption || !imageFile) {
      alert('Complete todos los campos y suba una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('caption', caption);
    formData.append('image', imageFile); 

    try {
      const res = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Respuesta del servidor:', data);
      if (!data.is_approved) {
        alert('Violencia detectada en la imagen, no se puede publicar.');
        setUsername('');
        setCaption('');
        setImage(null);
        setImageFile(null);
        return;
      }
      console.log('Post guardado con ID:', data.id);
      alert('Post creado exitosamente!');
      
      setUsername('');
      setCaption('');
      setImage(null);
      setImageFile(null);
      window.location.href = '/'; 

    } catch (error) {
      console.error(error);
    }
  };

   return (
    <div className="create-post-container">
      <Header showPostButton={false} />
      <div className="flex justify-center items-center mt-10" style={{justifyContent: "space-between"}}>
        <div className="inner-box">
          {/* Cuadro de imagen */}
          <div className="image-box">
            {image ? (
              <img src={image} alt="preview" className="image-preview" />
            ) : (
              <>
                <label htmlFor="image-upload" className="image-placeholder">
                  <FiPlus size={40} color="#CAC4D0" />
                </label>
                <input
                  id = "image-upload"
                  type="file"
                  accept="image/*"
                  onChange= {(e) => {handleImageChange(e)}}
                  style={{ display: 'none' }}
                />
                  
              </>
            )}
          </div>

          {/* Formulario */}
          <div className="form-section" style={{ display: "flex", height:"300px", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <label  style={{ display: "flex", justifyContent:"left", marginLeft: "15px"}}>Username</label>
              <div className='input' style={{ height: "25px"}}>
              <input
                type="text"
                placeholder="Choose a name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="textarea"
              />
              </div>
            </div>
            <div>
              <label style={{ display: "flex", justifyContent: "left", marginLeft: "15px" }}>
                Caption
              </label>

              <div className='input' style={{ height: "95px"}}>
                <textarea
                  placeholder="Let the image speak."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="textarea"
                  style={{verticalAlign: "top", resize: "none", fontFamily: "Arial"}}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "right"}}>
              <button onClick={handlePost} className="button">
                <FiUpload size={18} /> Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

