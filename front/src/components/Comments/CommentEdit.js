// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import commentSchema from '../../YupSchemas/commentSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/context';

// COMPONENTS
import CommentDeleteImage from './CommentDeleteImage';

// DATA
import { apiComment, getHeaders } from '../../data/apiData';

const CommentEdit = ({ data }) => {

  const { setIsEditing, text, attachment, commentId } = data;

  const { register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(commentSchema) });

  const { setRefreshToogle } = useContext(refreshData);
  const { token } = useContext(loginContext);

  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDeletingImg, setIsDeletingImg] = useState(false);
  const [caractersNb, setCaractersNb] = useState(text.length);
  const [apiError, setApiError] = useState('');
  const [isShowingMediaInfos, setIsShowingMediaInfos] = useState(false);

  /* useEffect qui va regarder si une image a été sélectionnée 
  si oui, on utilise la méthode créateObject pour générer une URL et
  la mettre dans un state ImageUrl */
  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);

  // useEffect qui va supprimer l'erreur affichée venant de l'api au bout d'une seconde
  useEffect(() => apiError && setTimeout(() => setApiError(''), 1000), [apiError]);

  /* fonction qui va gérer l'envoi du formulaire avec l'interface formData.
  On rafraîchit ensuite l'affichage des données avec un appel à l'api et on change
  le state pour indiquer que l'on est plus en mode édition */
  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('commentInfos', JSON.stringify(data));
    formData.append('image', data[`commentPictureEdit-${commentId}`][0]);

    try {
      await axios.put(`${apiComment}/${commentId}`, formData, getHeaders(token, 'multipart'));
      setRefreshToogle((e) => !e);
      setIsEditing(false);
    }
    catch (err) {
      const { message } = err.response.data;
      /* on envoie le message d'erreur dans l'api dans un state
      qui sera utilisé pour afficher le message à la fin du formulaire */
      setApiError(message);
    }
  };

  /* fonction permettant de reset le state qui indique si on affiche une image et va
  aussi retirer l'image précédemment enregistrée dans le formulaire */
  const resetImg = () => {
    setDisplayImage(null);
    reset({ [`commentPictureEdit-${commentId}`]: { length: 0 } });
  };

  return (
    <form className="form" onSubmit={handleSubmit(sendForm)}>

      {(imageUrl || attachment) && (
        <>
          <div className='image-post-edit__container'>
            <div className='post-picture__container'>
              <img src={imageUrl || attachment} className="post__picture" alt="media lié au commentaire"></img>
            </div>
          </div>
          {imageUrl
            ? <button type="button" onClick={resetImg} className="btn btn-abort">Annuler</button>
            : isDeletingImg
              ? <CommentDeleteImage data={{ setIsDeletingImg, commentId }} />
              : <button type="button" onClick={() => setIsDeletingImg(true)} className="btn btn-delete">Supprimer</button>}
        </>
      )}

      <input
        type="file" id={`commentPictureEdit-${commentId}`} style={{ display: "none" }}
        onInput={(e) => setDisplayImage(e.target.files[0])}
        onClick={(e) => e.target.value = null}
        {...register(`commentPictureEdit-${commentId}`)}>
      </input>

      <div className='input-label__container'>
        <label htmlFor="text">Votre Commentaire {caractersNb}/500</label>
        {isShowingMediaInfos && (
          <div className="media-infos">
            <p className='size'><span>Taille maximale :</span>3mo</p>
            <p className='formats'><span>Formats acceptés :</span>gif | png | jp(e)g | webp</p>
          </div>
        )}
        <label
          onMouseOver={() => setIsShowingMediaInfos(true)}
          onMouseLeave={() => setIsShowingMediaInfos(false)}
          htmlFor={`commentPictureEdit-${commentId}`}
          className='btn-browse'>
        </label>
        <textarea
          placeholder="Comment : entre 10 et 500 caractères"
          id='text' defaultValue={text}
          {...register('text')}
          maxLength="500"
          onInput={(e) => setCaractersNb(e.target.value.length)}
        />
        {errors.text && <small>{errors.text.message}</small>}
      </div>

      <div className="submit-abort__container">
        <input type="submit" className='send-msg__btn btn'></input>
        <button type="button" className='btn' onClick={() => setIsEditing(false)}>Annuler</button>
        {apiError && <small>Erreur : {apiError}</small>}
      </div>

    </form>
  );
};

export default CommentEdit;