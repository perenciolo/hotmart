import React from 'react';

import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Hero from '../components/Hero/Hero';
import StatusCard from '../components/StatusCard/StatusCard';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import {
  CostCenter,
  AccountabilityExtraInfo,
  Person,
  SidebarContent,
  Sort,
} from '../types/default.types';
import { Config } from '../utils/Config';

interface IIndexProps {
  header: {
    id: number;
    title: string;
    collaborator: Person;
    justification: string;
    purpose: string;
    costCenters: CostCenter[];
    project: {
      id: number;
      title: string;
    };
    createdOn: Date;
    accountabilityExtraInfo: AccountabilityExtraInfo;
  };
  sidebar: {
    content: SidebarContent[];
    pageable: {
      sort: Sort;
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    empty: boolean;
  };
}

const Index = ({
  header: {
    id,
    title,
    collaborator,
    justification,
    purpose,
    costCenters,
    project,
    createdOn,
    accountabilityExtraInfo,
  },
  sidebar: { content },
}: IIndexProps) => (
  <Main meta={<Meta title={Config.title} description={Config.description} />}>
    <div className="main__column w-3/12" />
    <div className="w-full bg-gray-100 mt-12">
      <Breadcrumb />
      <div className="flex h-full">
        <div className="w-8/12">
          <div className="ml-8">
            <Hero
              id={id}
              name={title}
              collaborator={collaborator}
              justification={justification}
              purpose={purpose}
              project={project.title}
              amountOfPeople={accountabilityExtraInfo.amountOfPeople}
              budgetForBreakfast={accountabilityExtraInfo.budgetForBreakfast ?? false}
              costCenterNames={costCenters.map((costCenter) => costCenter.name)}
              createdOn={createdOn}
            />
          </div>
        </div>
        <div className="w-4/12 flex items-strech">
          <div className="ml-16 bg-white p-8 w-full">
            <StatusCard />
          </div>
        </div>
      </div>
    </div>
  </Main>
);

export async function getStaticProps(): Promise<{ props: IIndexProps }> {
  const header = await fetch('https://api-front-end-challenge.buildstaging.com/api/header');

  const sidebar = await fetch('https://api-front-end-challenge.buildstaging.com/api/sidebar');

  return {
    props: {
      header: await header.json(),
      sidebar: await sidebar.json(),
    },
  };
}

export default Index;
