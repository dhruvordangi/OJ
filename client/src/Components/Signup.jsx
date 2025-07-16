import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthProvider';

export default function Signup() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data, isAdmin = false) => {
    console.log("sign up data ->",data);
    console.log("IsAdmin->",isAdmin);
    const endpoint = isAdmin ? 'http://localhost:4000/admin/signup' : 'http://localhost:4000/user/signup';
    // const userInfo = {
    //   fullname: data.fullname,
    //   email: data.email,
    //   password: data.password,
    //   location:data.location,
    //   profilePic:data.profilePic,
    // };

    const formData = new FormData();
  formData.append('fullname', data.fullname);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('location', data.location);

  if (data.profilePic && data.profilePic.length > 0) {
    formData.append('profilePic', data.profilePic[0]); 
  }
  // console.log("Form Data->",formData);

    try {
      
  
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData, 
      credentials: 'include',
    });
      
      const result = await response.json();
      console.log(result.admin);
      if (response.ok) {
        toast.success(isAdmin ? 'Admin Signup Successful' : 'User Signup Successful');
        isAdmin ? localStorage.setItem('Users', JSON.stringify(result.admin)): localStorage.setItem('Users', JSON.stringify(result.user));
        isAdmin ? setAuthUser(result.admin) : setAuthUser(result.user)
        navigate('/');
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Signup Error:', error);
    }
  };

  return (
    <>
      <div className='flex h-screen items-center justify-center border'>
        <div className='w-[500px]'>
          <div className='modal-box'>
            <form onSubmit={handleSubmit((data) => handleSignup(data, false))} method='dialog'>
              <Link to='/' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</Link>
              <h3 className='font-bold text-lg'>Signup</h3>

              {/* Name */}
              <div className='mt-4 space-y-2'>
                <span>Name</span>
                <br />
                <input type='text' placeholder='Enter your FullName' className='w-80 px-3 py-1 border rounded-md outline-none' {...register('fullname', { required: true })} />
                {errors.fullname && <span className='text-sm text-red-500'>This field is required</span>}
              </div>

              {/* Email */}
              <div className='mt-4 space-y-2'>
                <span>Email</span>
                <br />
                <input type='email' placeholder='Enter your Email' className='w-80 px-3 py-1 border rounded-md outline-none' {...register('email', { required: true })} />
                {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
              </div>

              {/* Password */}
              <div className='mt-4 space-y-2'>
                <span>Password</span>
                <br />
                <input type='password' placeholder='Enter your Password' className='w-80 px-3 py-1 border rounded-md outline-none' {...register('password', { required: true })} />
                {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
              </div>
              {/* Location */}
              <div className='mt-4 space-y-2'>
                  <label htmlFor='location'>Location</label>
                  <input id='location' type='text' placeholder='Enter your Location' className='w-80 px-3 py-1 border rounded-md outline-none' {...register('location', { required: true })} />
                  {errors.location && <span className='text-sm text-red-500'>This field is required</span>}
              </div>
              
              {/* Profile pic */}
              <div className='mt-4 space-y-2'>
                  <input 
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  {...register("profilePic", {
                  required: false,
                  validate: (fileList) => {
                  if (!fileList || fileList.length === 0) return true; // No file = valid
                  const file = fileList[0];
                  const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
                  return allowedExtensions.includes(file.type)
                  ? true
                  : "Invalid file type! Only .png, .jpg, and .jpeg files are accepted.";
                  },
                })}
              style={{ marginBottom: "10px" }} 
            />
            {errors.profilePic && (
            <p style={{ color: "red" }}>{errors.profilePic.message}</p>
            )}

              </div>

              {/* Buttons */}
              <div className='flex justify-around mt-4'>
                <button type='submit' className='btn btn-secondary'>Signup</button>
                <button type='button' onClick={handleSubmit((data) => handleSignup(data, true))} className='btn btn-primary'>Admin Signup</button>
              </div>

              <p className='mt-4'>
                Have An Account? <button className='underline text-blue-500 cursor-pointer' onClick={() => document.getElementById('my_modal_3').showModal()}>Login</button>
                <Login />
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
