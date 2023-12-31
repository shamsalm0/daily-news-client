import React, { useContext, useState } from 'react' ;
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider';
import '../SIgnIn/SignIn.css'
import { toast } from 'react-hot-toast';
const SignUp = () => {
    const {createUser,emailVerify,updateUserProfile}=useContext(AuthContext);
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const handleSubmit=e=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value
        const email=form.email.value;
        const password=form.password.value;
        const confirm=form.confirm.value;
        const image=form.image.value;
        if(password.length<6){
            setError('Use atleast 6 character ');
            console.log(password)
            e.preventDefault();
            return;
        }
        else if(password!==confirm){
            setError('password didnot match');
            e.preventDefault();
            return;
        }
        createUser(email,password)
        .then(result=>{
            const user=result.user;
            setSuccess(true)
            console.log(user);
            setError('')
            form.reset()
            handleupdateUserProfile(name,image)
            
        })
        .catch(error=>{console.error(error)
        setError(error.message)
        })
    }
    const handleupdateUserProfile=(name,image)=>{
      const profile={
        displayName:name,
        photoURL:image
      }
      updateUserProfile(profile)
    }
    emailVerify()
    .then(()=>{
      toast.success('verification message is sent in your mail')
    })
    const handleCheckBox=e=>{
      console.log(e.target.checked)
      setIsChecked(e.target.checked);
    }
    return (
        <div>
        <div className="flex justify-center items-center h-screen">
 <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
   <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
   <div className="mb-4">
     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
       Name
     </label>
     <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="name"
       name='name'
       type="text"
       placeholder="Enter your name"
     />
   </div>
   <div className="mb-4">
     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
       Email
     </label>
     <input
       className= "input-box shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="email"
       name='email'
       type="email"
       placeholder="Enter your email"
       required
     />
   </div>
   <div className="mb-4">
     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
       Photo
     </label>
     <input
       className= "input-box shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="image"
       name='image'
       type="text"
       
       placeholder="Enter your image url"
       required
     />
   </div>
   <div className="mb-4">
     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
       Password
     </label>
     <input
       className="input-box shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="password"
       name='password'
       type="password"
       placeholder="Enter your password"
       required
     />
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
       Confirm Password
     </label>
        <input
       className="input-box shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="confirmPassword"
       name='confirm'
       type="password"
       placeholder="Enter your password"
       required
     />
   </div>
 <p>{error}</p>
   {
       success?<p>Successfull</p>:<p>if you have already account please<Link className='text-blue-500' to='/signin'> Sign In</Link></p>
   }
        <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckBox}
        />
        <span className="ml-2">I accept the terms and conditions</span>
      </label>
   <div className="flex items-center justify-between">
     <button
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       type="submit" disabled={!isChecked}
     >
       Sign Up
     </button>
   </div>
 </form>
</div>

   </div>
    );
};

export default SignUp;