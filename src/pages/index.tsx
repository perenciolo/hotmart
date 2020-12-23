import React from 'react';

import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Hero from '../components/Hero/Hero';
import MoneyCard from '../components/MoneyCard/MoneyCard';
import StatusCard from '../components/StatusCard/StatusCard';
import TimelineCard from '../components/TimelineCard/TimelineCard';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import {
  CostCenter,
  AccountabilityExtraInfo,
  Person,
  SidebarContent,
  Sort,
  TimelineItem,
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
  timeline: {
    content: TimelineItem[];
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
  timeline: { content: timelineContent },
}: IIndexProps) => (
  <Main meta={<Meta title={Config.title} description={Config.description} />}>
    <div className="flex w-full flex-wrap overflow-hidden">
      <div className="w-full overflow-hidden md:w-1/12" />

      <div className="w-full overflow-hidden md:w-11/12 bg-hotgray">
        <Breadcrumb />
        <div className="flex flex-wrap overflow-hidden md:-mx-2">
          <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-8/12">
            <div className="px-4 md:pl-8 md:pr-2">
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

              {timelineContent?.map((timelineItem) => (
                <div key={`${timelineItem.expenseId}-${timelineItem.id}`}>
                  <TimelineCard content={timelineItem} />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-4/12">
            <div className="px-4">
              {content.map((item) => (
                <React.Fragment key={item.accountabilityId + item.declared}>
                  <StatusCard status={item.accountabilityStatus} />
                  <div className="my-4">
                    <MoneyCard content={item} />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Main>
);

export async function getStaticProps(): Promise<{ props: IIndexProps }> {
  const header = await fetch('https://api-front-end-challenge.buildstaging.com/api/header');

  const sidebar = await fetch('https://api-front-end-challenge.buildstaging.com/api/sidebar');

  const timeline = await fetch('https://api-front-end-challenge.buildstaging.com/api/timeline');

  return {
    props: {
      header: await header.json(),
      sidebar: await sidebar.json(),
      timeline: await timeline.json(),
    },
  };
}

export default Index;
