import { useEffect, useState } from 'react';
import './CreateCategory.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  createCategory,
  updateCategory,
} from '../../../../store/actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Spinner } from '../../../../components';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const maxLength = 999;

  const { categories, status } = useSelector((state) => state.category);
  const loading = status === 'loading';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (id) {
      const category = categories.find((category) => category.id == id);

      setImage(category?.imageUrl);
      setValue('name', category?.name);
      setValue('description', category?.description);
    }
  }, [id, categories, status, setValue]);

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

    formData.append('file', file);
    formData.append('data', JSON.stringify({ name, description }));

    if (id) {
      dispatch(updateCategory({ category: formData, id })).then(
        ({ payload }) => {
          if (typeof payload === 'string') {
            Swal.fire({
              icon: 'success',
              text: payload,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/admin/categories');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error. Intente nuevamente.',
            });
          }
        },
      );
      return;
    } else {
      try {
        dispatch(createCategory(formData)).then(({ payload }) => {
          if (typeof payload === 'string') {
            Swal.fire({
              icon: 'success',
              title: payload,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/admin/categories');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error. Intente nuevamente.',
            });
          }
        });
      } catch (error) {
        console.log(error);
        reset();
      }
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <Spinner />
          </div>
        </>
      ) : (
        <div className='create-category'>
          <div className='create-category-container'>
            <div className='create-category-title'>
              <h1>{id ? 'Editar' : 'Crear'} categoría</h1>
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
                  <button className='btn btn-primary'>
                    {id ? 'Confirmar' : 'Crear categoría'}
                  </button>
                  <Link to='/admin/categories'>
                    <button className='btn btn-tertiary'>Cancelar</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCategory;
