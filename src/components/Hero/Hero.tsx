import React, { useMemo } from 'react';

import { Person } from '../../types/default.types';

interface HeroProps {
  id: number;
  name: string;
  collaborator: Person;
  justification: string;
  purpose: string;
  project: string;
  amountOfPeople: number;
  budgetForBreakfast: boolean;
  costCenterNames: string[];
  createdOn:Date|null;
}

function Hero({
  id,
  name,
  collaborator,
  justification,
  purpose,
  project,
  amountOfPeople,
  budgetForBreakfast,
  costCenterNames,
  createdOn,
}: HeroProps) {
  const created = useMemo(() => {
    const day = new Date(Number(createdOn)).getDate().toString().padStart(2, '0');
    const month = (new Date(Number(createdOn)).getMonth() + 1).toString().padStart(2, '0');
    const year = new Date(Number(createdOn)).getFullYear();
    return `${day}/${month}/${year}`;
  }, [createdOn]);

  return (
    <div className="bg-gradient-to-r from-custom-light-blue to-custom-blue text-white flex flex-col rounded-xl">
      <h2 className="text-xl font-bold ml-12 mb-5 mt-6">
        Reembolso -
        {`# ${id} ${name}`}
      </h2>
      <div className="flex items-center">
        <div className="mb-4 border-r-2 border-white border-opacity-25 w-8/12">
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">Nome</div>
            <div className="flex max-w-xs font-bold">{collaborator.name}</div>
          </div>
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">Email</div>
            <div className="flex max-w-xs font-bold">{collaborator.email}</div>
          </div>
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">Justificativa</div>
            <div className="flex max-w-xs font-bold">{justification}</div>
          </div>
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">Finalidade</div>
            <div className="flex max-w-xs font-bold">{purpose}</div>
          </div>
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">Projeto</div>
            <div className="flex max-w-xs font-bold">{project}</div>
          </div>
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">Quantiade</div>
            <div className="flex max-w-xs font-bold">
              {amountOfPeople}
              {' '}
              pessoa
              {amountOfPeople > 1 && 's'}
            </div>
          </div>
          {created && (
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">
              Data
            </div>
            <div className="flex max-w-xs font-bold">
              {created}
            </div>
          </div>
          )}
          <div className="flex text-sm hero__box">
            <div className="flex justify-end mr-8 pl-12 hero__item">Inclui café da manhã</div>
            <div className="flex max-w-xs font-bold">
              {budgetForBreakfast && 'sim'}
              {!budgetForBreakfast && 'não'}
            </div>
          </div>
        </div>
        <div className="mb-4 border-r-2 border-white border-opacity-25 w-4/12">
          <div className="flex flex-col items-start text-sm hero__box">
            <div className="flex w-8/12 mx-auto">Atribuir analista</div>
            <div className="flex w-8/12 font-bold mx-auto text-grey-500">
              <input type="text" className="rounded-md px-2 py-1 text-gray-500 max-w-100" placeholder="Atribuir analista" />
            </div>
          </div>
          <div className="flex flex-col items-start text-sm hero__box">
            <div className="flex w-8/12 mx-auto">Centro de Custo</div>
            {costCenterNames.map((costCenterName, i) => (
              <div key={`${i}`} className="flex w-8/12 font-bold mx-auto">
                {costCenterName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
