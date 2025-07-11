import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getWidgetColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
// import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import { Input, Textarea } from 'rizzui';
import ContactUs from './contactUs';
// import { useState } from 'react';

export const metadata = {
  ...metaObject('Contact us'),
};

const pageHeader = {
  title: 'Contact Us',
  breadcrumb: [
  ],
};

export default function StickyTablePage() {

  return (
    <div className='mt-20 w-[80%] mx-auto'>
      {/* <TableLayout
        title={pageHeader.title}
        breadcrumb={[]}
        data={orderData}
        fileName="order_data"
        header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
      > */}
      <h1>Contact Us</h1>
      <ContactUs />
      {/* </TableLayout> */}
    </div>
  );
}
