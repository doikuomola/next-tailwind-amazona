import Link from 'next/link';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import axios from 'axios';

export default function Register() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md mt-20"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Please enter name',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className="w-full"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
              validate: (value) => value === getValues('password'),
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">Passwords do not match</div>
            )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
          Already have an account? &nbsp;
          <Link href={`/login?redirect=${redirect || '/'}`}>Login</Link>
        </div>
      </form>
    </Layout>
  );
}
