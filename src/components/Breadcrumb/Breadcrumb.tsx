import React from 'react';

// interface BreadcrumbProps {
//   children?: React.ReactNode

// }

function Breadcrumb(
  // {}:BreadcrumbProps
) {
  return (
    <div className="bg-hotgray-dark h-12 py-3 pl-12 text-base text-slate-grey">
      <span className="text-primary">
        Dashboard
        {' '}
      </span>

      /
      {' '}
      <span className="text-primary">/ QuickOps </span>
      / Current
    </div>
  );
}

export default Breadcrumb;
