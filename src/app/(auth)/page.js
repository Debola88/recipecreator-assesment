'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { FaEnvelope, FaLock } from 'react-icons/fa6';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/usercontext/UserContext';
import { firebase } from '../config/firebase';

export default function Home() {
  const router = useRouter();
  const { setUser } = useUser();
  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData({
      ...signinData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('Form Data', signinData);
  }, [signinData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, signinData.email, signinData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        console.log('user', user);
        router.push('/dashboard/recipes');
      })
      .catch((error) => {
        console.log('User Error', error);
      });
  };

  return (
    <main className="flex py-10 min-h-screen bg-neutral-100 flex-col items-center justify-between md:p-20 px-5">
      <div className="bg-white rounded-2xl shadow-2xl flex max-md:flex-col md:w-2/3 w-full max-w-4xl md:max-h-4xl">
        <form onSubmit={handleSubmit} className="md:w-3/5 text-center p-10 md:py-12 md:px-20 max-w-full">
          <h2 className="text-green-500 text-3xl font-bold mb-2">Sign in to Account</h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
          <p className="mb-2 text-sm mt-10 text-gray-400">Fill up the information in order to login and explore.</p>
          <div className="flex flex-col items-center mt-8">
            <div className="bg-gray-100 w-full rounded flex items-center px-2">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                className="w-full rounded md:text-sm bg-gray-100 p-2 outline-none h-10 flex-1"
                placeholder="Email"
                name="email"
                value={signinData.email}
                onChange={handleChange}
              />
            </div>
            <div className="bg-gray-100 w-full rounded flex mt-4 mb-4 items-center px-2">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                className="w-full rounded md:text-sm bg-gray-100 p-2 outline-none h-10 flex-1"
                placeholder="Password"
                name="password"
                value={signinData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Sign in</Button>
          </div>
        </form>
        <div className="md:w-2/5 py-10 px-10 max-w-full text-center bg-green-500 max-md:rounded-b-2xl md:rounded-r-2xl text-white md:py-36 md:px-12">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-2 text-sm">Fill up personal information and start journey with us.</p>
          <Link href="/signup">
            <div className="inline-block mt-2">
              <Button>Sign Up</Button>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
