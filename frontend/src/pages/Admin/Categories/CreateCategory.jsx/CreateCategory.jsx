import { useState } from 'react';
import './CreateCategory.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createCategory } from '../../../../store/actions/categoryActions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const maxLength = 999;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      file: '',
    },
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  const onSubmit = (data) => {
    const { name, description } = data;
    const formData = new FormData();

    formData.append('data', JSON.stringify({ name, description }));
    formData.append('file', file);

    try {
      dispatch(createCategory(formData)).then(({ payload }) => {
        Swal.fire({
          icon: 'success',
          title: payload,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/admin/categories');
      });
    } catch (error) {
      console.log(error);
      reset();
    }
  };

  return (
    <div className='create-category'>
      <div className='create-category-container'>
        <div className='create-category-title'>
          <h1>Crear categoría</h1>
        </div>
        <form
          className='create-category-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='create-category-form-group'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              className='form-control'
              placeholder='Nombre de la categoría'
              {...register('name', { required: true })}
            />
          </div>
          <div className='create-category-form-group'>
            <label htmlFor='description'>Descripción</label>
            <textarea
              id='description'
              className='form-control'
              placeholder='Descripción de la categoría'
              {...register('description', {
                required: true,
                maxLength,
              })}
            ></textarea>
            {errors.description?.type === 'maxLength' && (
              <span>Se ha excedido el límite de caracteres.</span>
            )}
          </div>
          <div className='create-category-form-group'>
            <label htmlFor='image'>Elegir Imagen</label>
            <input
              onChange={handleImage}
              type='file'
              id='image'
              className='form-control'
              style={{ display: 'none' }}
            />
            <img src={image} alt='' />
          </div>
          <div className='create-category-form-group'>
            <div className='buttons'>
              <button className='btn btn-primary'>Crear categoría</button>
              <Link to='/admin/categories'>
                <button className='btn btn-tertiary'>Cancelar</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
