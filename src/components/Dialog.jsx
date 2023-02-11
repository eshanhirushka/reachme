import React, { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { client } from '../client';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { userQuery } from '../utils/data';


function Dialog  ( {onDialog }) {
  const [user, setUser] = useState();
  const { userId } = useParams();

  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate('/login');
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">  
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h2 className='text-center p-5'>Are You Sure You Need To Logout?</h2>
            <div className='flex justify-center bg-gray=100'>
            {userId === User.googleId && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                <button type="button"
                    className=" bg-red-100 m-5 p-3  cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    >Yes</button>
                    )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
                <button type="button"
                    className=" bg-green-100 m-5 p-3 cursor-pointer outline-none shadow-md"
                    onClick={() => onDialog(false)}
                    >No</button>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Dialog