import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Stores';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function Index() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  let x = 1;
  return (
    <>
      <Layout>
        <div className="flex">
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
                            Category
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Status
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Description
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Update
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {products.map((order) => (
                          <tr key={order._id}>
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
                                    {order.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-500">
                                {order.category}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-500">
                                {order.description}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-500">
                                {order.countInStock}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                              <Link
                                href={`/admin/productDetails/${order._id}`}
                                passHref
                              >
                                <a>
                                  {' '}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-red-400"
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
                                </a>
                              </Link>
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
