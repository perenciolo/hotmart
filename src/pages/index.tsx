import React from 'react';

import Link from 'next/link';

import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Hero from '../components/Hero/Hero';
import MoneyCard from '../components/MoneyCard/MoneyCard';
import StatusCard from '../components/StatusCard/StatusCard';
import TimelineCard from '../components/TimelineCard/TimelineCard';
import { useAppCtx } from '../context/AppContext';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Config } from '../utils/Config';

const Index = () => {
  const {
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
  } = useAppCtx();
  return (
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
                  project={project?.title || ''}
                  amountOfPeople={accountabilityExtraInfo?.amountOfPeople || 0}
                  budgetForBreakfast={accountabilityExtraInfo?.budgetForBreakfast ?? false}
                  costCenterNames={costCenters?.map((costCenter) => costCenter.name) || []}
                  createdOn={createdOn}
                />

                <Link href="/add">
                  <a className="rounded-md bg-pale-blue text-nice-blue border-2 border-nice-blue p-2 flex justify-center md:w-2/6 mt-6 ml-auto">
                    <p className="text-base">
                      <span className="inline-block pr-2">
                        <i className="fa fa-receipt" />
                        {' '}
                      </span>
                      Adicionar despesa
                    </p>
                  </a>
                </Link>

                {timelineContent?.map((timelineItem) => (
                  <div key={`${timelineItem.expenseId}-${timelineItem.id}`}>
                    <TimelineCard content={timelineItem} />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-4/12 bg-white shadow-md">
              <div className="pt-8 pb-4 px-4">
                {content?.map((item) => (
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
};

export default Index;
