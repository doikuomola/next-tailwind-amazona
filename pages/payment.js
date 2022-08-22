import React from 'react';
import { CheckoutWizard, Layout } from '../components';

export default function Payment() {
  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2} />
    </Layout>
  );
}
