import React from 'react';

import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Hero from '../components/Hero/Hero';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { CostCenter, AccountabilityExtraInfo, Person } from '../types/default.types';
import { Config } from '../utils/Config';

interface IIndexProps {
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
}

const Index = ({
  id,
  title,
  collaborator,
  justification,
  purpose,
  costCenters,
  project,
  createdOn,
  accountabilityExtraInfo,
}: IIndexProps) => (
  <Main meta={<Meta title={Config.title} description={Config.description} />}>
    <div className="main__column w-3/12" />
    <div className="w-full bg-gray-100 mt-12">
      <Breadcrumb />
      <div className="flex h-full">
        <div className="w-9/12">
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
        <div className="w-3/12">
          <div className="ml-16 bg-white h-full">
            TEst
          </div>
        </div>
      </div>
    </div>
  </Main>
);

export async function getStaticProps(): Promise<{ props: IIndexProps }> {
  const res = await fetch('https://api-front-end-challenge.buildstaging.com/api/header');

  const props = await res.json();
  return {
    props,
  };
}

export default Index;
