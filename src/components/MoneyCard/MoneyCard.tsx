import React from 'react';

import { SidebarContent } from '../../types/default.types';

interface MoneyCardProps {
  content: SidebarContent;
}

function MoneyCard({
  content: {
    declared, currency, approved, received, balance,
  },
}: MoneyCardProps) {
  return (
    <div className="rounded-md text-gray-500 border-2 border-gray-500 flex flex-col items-center py-4">
      <p className="text-sm">SALDO</p>
      <p className="text-2xl text-navy font-bold">{`${currency.symbol} ${balance.toFixed(2)}`}</p>

      <div className="flex flex-wrap overflow-hidden">
        <div className="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2 border-r-2 border-gray-100 pr-2">
          <div className="flex flex-wrap overflow-hidden">
            <div className="w-full overflow-hidden md:w-1/3">
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="rounded-full border-2 border-gray-400 flex items-center justify-center w-8 h-8">
                  <i className="fa fa-arrow-up text-gray-400" />
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden md:w-2/3">
              <div className="text-xs">Gastou</div>
              <div className="text-base text-gray-700 font-bold">
                {`${
                  currency.symbol
                } ${declared.toFixed(2)}`}

              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2">
          <div className="flex flex-wrap overflow-hidden">
            <div className="w-full overflow-hidden md:w-1/3">
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="rounded-full border-2 border-gray-400 flex items-center justify-center w-8 h-8">
                  <i className="fa fa-arrow-up text-gray-400 transform rotate-180" />
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden md:w-2/3">
              <div className="text-xs">Recebeu</div>
              <div className="text-base text-gray-700 font-bold">
                {`${
                  currency.symbol
                } ${received.toFixed(2)}`}

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4">
        <p className="text-sm font-bold text-gray-700 pb-2 border-b-2 border-gray-100 w-full mb-5">
          Extrato
        </p>
        <div className="flex">
          <p className="text-xs text-navy flex-grow">Descrição</p>
          <p className="text-xs text-navy">Valor</p>
        </div>
        <div>
          <div className="flex">
            <p className="text-sm text-navy font-bold flex-grow">Despesas declaradas</p>
            <p className="text-sm text-navy font-bold">{`${currency.symbol} ${declared}`}</p>
          </div>
          <span className="block text-xs text-gray-400">Despesas declaradas pelo trooper</span>
        </div>
        <div>
          <div className="flex">
            <p className="text-sm text-navy font-bold flex-grow">Despesas aprovadas</p>
            <p className="text-sm text-navy font-bold">
              {`${currency.symbol} ${approved.toFixed(
                2,
              )}`}

            </p>
          </div>
          <span className="block text-xs text-gray-400">Despesas aprovadas pelo financeiro</span>
        </div>
        <div>
          <div className="flex">
            <p className="text-sm text-navy font-bold flex-grow">Pagamento realizado</p>
            <p className="text-sm text-success-400 font-bold">
              {`${
                currency.symbol
              } ${received.toFixed(2)}`}

            </p>
          </div>
          <span className="block text-xs text-gray-400">Pagamentos realizados pelo financeiro</span>
        </div>
      </div>
    </div>
  );
}

export default MoneyCard;
