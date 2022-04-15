import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Stores';
import useStyles from '../../utils/styles';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function Allusers() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    users: [],
    error: '',
  });
  console.log('users', users);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/login`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchUsers();
  }, []);

  let x = 1;
  return (
    <>
      <Layout>
        <div className="flex ">
          <AdminLayout></AdminLayout>
          <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
            <div className="container mx-auto mt-12">
              <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Number
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Name
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Email
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            User Id
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Role
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-500">
                                {x++}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://source.unsplash.com/user/erondu"
                                    alt="admin dashboard ui"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium leading-5 text-gray-900">
                                    {user.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-500">
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-500">
                                {user._id}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-500">
                                {/* {user.isAdmin} */}
                                {user.isAdmin ? 'Admin' : 'User'}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
