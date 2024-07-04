'use client';

import Customers from '../components/list/Customers';

export default function Page({ params: { id } }: { params: { id: number } }) {
  return <Customers id={id} />;
}
