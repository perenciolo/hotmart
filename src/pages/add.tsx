/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { DatePicker } from '../components/Datepicker/Datepicker';
import FileInput from '../components/FileInput/FileInput';
import Hero from '../components/Hero/Hero';
import StatusCard from '../components/StatusCard/StatusCard';
import { useAppCtx } from '../context/AppContext';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { TimelineItem } from '../types/default.types';
import { Config } from '../utils/Config';

function Add() {
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
    setTimelineItem,
  } = useAppCtx();
  const router = useRouter();

  const [expenseTypeCode, setExpenseTypeCode] = useState<'hotel-fee' | 'food' | 'transport' | ''>(
    '',
  );
  const [currencyCode, setCurrencyCode] = useState<'BRL' | 'USD' | 'MXN' | ''>('');
  const [amountSpent, setAmountSpent] = useState<string>('');
  const [amountTotal, setAmountTotal] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [resourceUrl, setResourceUrl] = useState<string>('');
  const [cardDate, setCardDate] = useState<Date | null>(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const payload = {
      expenseTypeCode,
      currencyCode,
      amountSpent,
      amountTotal,
      notes,
      resourceUrl,
      cardDate: cardDate && new Date(cardDate).getTime(),
    };
    try {
      const data: TimelineItem = await fetch(
        'https://api-front-end-challenge.buildstaging.com/api/expense/add',
        {
          method: 'post',
          body: JSON.stringify(payload),
        },
      ).then((response) => response.json());
      setTimelineItem(data);
      alert('Success, your expense was saved successfully');
    } catch (error) {
      alert('Error, please verify the data');
    }
  }, []);

  return (
    <Main meta={<Meta title={Config.title} description={Config.description} />}>
      <div className="flex w-full min-h-screen flex-wrap overflow-hidden">
        <div className="w-full overflow-hidden md:w-1/12" />

        <div className="w-full overflow-hidden md:w-11/12 bg-hotgray">
          <Breadcrumb />
          <div className="flex flex-wrap md:h-full overflow-hidden md:-mx-2">
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
                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
                >
                  <div className="flex flex-wrap overflow-hidden">
                    <div className="w-full overflow-hidden sm:w-full md:w-1/2">
                      <p className="text-gray-700 font-bold">Recibo, cupom ou nota fiscal*</p>
                      <div className="mt-2 md:mr-4 mb-4 md:mb-0">
                        <FileInput
                          name="resourceUrl"
                          value={resourceUrl}
                          onChange={(e) => setResourceUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="w-full overflow-hidden sm:w-full md:w-1/2">
                      <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="type-select"
                          >
                            Tipo *
                          </label>
                          <div className="relative">
                            <select
                              className="block appearance-none bg-white w-full border border-grey-lighter focus:border-grey-lighter text-gray-700 py-3 px-4 pr-8 rounded"
                              id="type-select"
                              name="expenseTypeCode"
                              value={expenseTypeCode}
                              onChange={(e) => setExpenseTypeCode(
                                e.target.value as '' | 'hotel-fee' | 'food' | 'transport',
                              )}
                            >
                              <option>Selecione</option>
                              <option value="hotel-fee">Hotel</option>
                              <option value="food">Alimentação</option>
                              <option value="transport">Transporte</option>
                            </select>
                            <div className="absolute text-gray-700 custom__center">
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-1/2 px-3">
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="currencyCode"
                          >
                            Moeda *
                          </label>
                          <div className="relative">
                            <select
                              className="block appearance-none bg-white w-full border border-grey-lighter focus:border-grey-lighter text-gray-700 py-3 px-4 pr-8 rounded"
                              id="currencyCode"
                              name="currencyCode"
                              value={currencyCode}
                              onChange={(e) => setCurrencyCode(e.target.value as '' | 'BRL' | 'USD' | 'MXN')}
                            >
                              <option>Moeda</option>
                              <option value="BRL">BRL</option>
                              <option value="USD">USD</option>
                              <option value="MXN">MXN</option>
                            </select>
                            <div className="absolute text-gray-700 custom__center">
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="notes"
                          >
                            Descrição da despesa *
                          </label>
                          <input
                            className="appearance-none block w-full bg-grey-lighter text-gray-700 border border-grey-lighter rounded py-3 px-4"
                            id="notes"
                            type="text"
                            placeholder="name@example.com"
                            name="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="notes"
                          >
                            Data do comprovante *
                          </label>
                          <DatePicker date={cardDate as Date} onChange={setCardDate} />
                        </div>
                      </div>
                      <div className="-mx-3 md:flex mb-2">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="amountTotal"
                          >
                            Valor da nota / cupom *
                          </label>
                          <input
                            className="appearance-none block w-full bg-grey-lighter text-gray-700 border border-grey-lighter rounded py-3 px-4"
                            id="amountTotal"
                            type="text"
                            placeholder="name@example.com"
                            name="amountTotal"
                            value={amountTotal}
                            onChange={(e) => setAmountTotal(e.target.value)}
                          />
                        </div>
                        <div className="md:w-1/2 px-3">
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="amountSpent"
                          >
                            Valor a ser considerado *
                          </label>
                          <input
                            className="appearance-none block w-full bg-grey-lighter text-gray-700 border border-grey-lighter rounded py-3 px-4"
                            id="amountSpent"
                            type="text"
                            placeholder="name@example.com"
                            name="amountSpent"
                            value={amountSpent}
                            onChange={(e) => setAmountSpent(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex mt-6">
                        <button
                          className="border-slate-grey text-slate-grey border-2 font-bold py-2 px-4 rounded ml-auto md:w-2/6"
                          type="button"
                          onClick={() => router.push('/')}
                        >
                          Cancelar
                        </button>
                        <button
                          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded ml-2 md:w-2/6"
                          type="submit"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-4/12 bg-white">
              <div className="pt-8 pb-4 px-4">
                <StatusCard status="PENDING" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Add;
