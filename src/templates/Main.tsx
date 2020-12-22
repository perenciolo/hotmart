import React, { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = ({ meta, children }: IMainProps) => (
  <div className="antialiased w-full flex bg-navy">
    {meta}

    {children}
  </div>
);

export { Main };
