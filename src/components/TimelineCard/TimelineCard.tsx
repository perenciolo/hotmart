import React, { useCallback, useMemo } from 'react';

import { TimelineItem } from '../../types/default.types';

interface TimelineCardProps {
  content: TimelineItem;
}

function TimelineCard({
  content: {
    amountSpent,
    amountTotal,
    cardType,
    currencySymbol,
    invoiceDate,
    resourceUrl,
    status,
  },
}: TimelineCardProps) {
  const formatDate = useCallback(
    (date: Date) => `${new Date(date).getDate().toString().padStart(2, '0')}/${(new Date(date).getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${new Date(date).getFullYear()}`,
    [],
  );

  const card: {
    icon: string;
    txtColor: string;
    bgColor: string;
    showDetails: boolean;
    invoiceDate: string|null;
  } = useMemo(() => {
    switch (cardType) {
      case 'ACCOUNTABILITY_CREATED':
      case 'ACCOUNTABILITY_SUBMITTED':
        return {
          icon: 'asterisk',
          txtColor: 'tealish-green',
          bgColor: 'success-100',
          showDetails: false,
          invoiceDate: invoiceDate ? formatDate(invoiceDate) : null,
        };
      case 'EVALUATION':
        return {
          icon: 'users',
          txtColor: 'slate-grey',
          bgColor: 'hotgray-dark',
          showDetails: true,
          invoiceDate: invoiceDate ? formatDate(invoiceDate) : null,
        };
      case 'EXPENSE':
      default:
        return {
          icon: 'concierge-bell',
          txtColor: 'nice-blue',
          bgColor: 'pale-blue',
          showDetails: true,
          invoiceDate: invoiceDate ? formatDate(invoiceDate) : null,
        };
    }
  }, [cardType]);

  return (
    <div className="flex items-center flex-wrap overflow-hidden rounded-xl bg-white my-6 p-4 shadow-md">
      <div className="w-full overflow-hidden sm:w-full md:w-full lg:w-1/5">
        <div className="w-16 h-16 flex items-center justify-center">
          <div
            className={`rounded-full bg-${card.bgColor} flex items-center justify-center w-12 h-12`}
          >
            <i className={`fa fa-${card.icon} text-${card.txtColor}`} />
          </div>
        </div>
        {card.invoiceDate && <p className="text-sm text-gray-600">{card.invoiceDate}</p>}
      </div>

      <div
        className={`w-full overflow-hidden sm:w-full md:w-full lg:w-${
          !card.showDetails ? '4' : '1'
        }/5`}
      >
        <p className="text-xs text-gray-400">AÇÃO</p>
        <p className="text-md font-bold text-gray-700">Pagamento realizado</p>
      </div>

      {card.showDetails && (
        <>
          <div className="w-full overflow-hidden sm:w-full md:w-full lg:w-1/5">
            {amountTotal && (
            <>
              <p className="text-xs text-gray-400">VALOR</p>
              <p className="text-md font-bold text-gray-700">{`${currencySymbol} ${amountSpent}`}</p>
              <p className="text-xs text-gray-500">
                {`Valor da nota ${currencySymbol} ${amountTotal}`}
              </p>
            </>
            )}
          </div>

          <div className="w-full overflow-hidden sm:w-full md:w-full lg:w-1/5">
            <p className="text-xs text-gray-400">STATUS</p>
            <div className="rounded-xl bg-success-100 text-success-500 border-2 border-success-500 p-1 flex flex-col items-center justify-center">
              <p className="text-xs">
                {status === 'PENDING' ? 'Pendente' : 'Aprovado'}
              </p>
            </div>
            {cardType !== 'EVALUATION' && (
            <p className="text-xs text-gray-500">
              {`Valor aprovado: ${currencySymbol} ${amountTotal}`}
            </p>
            )}

          </div>

          <div className="w-full overflow-hidden text-primary sm:w-full md:w-full lg:w-1/5 flex justify-center">
            <p className="text-sm">
              {cardType !== 'EVALUATION' && (
              <>
                <i className="fa fa-receipt" />
                {' '}
              </>
              )}

              <a href={resourceUrl} className="text-primary hover:no-underline" target="_blank" rel="noreferrer">
                {cardType !== 'EVALUATION' && <>Ver recibo</>}
                {cardType === 'EVALUATION' && <>Ver aprovações</>}
              </a>
              {cardType === 'EVALUATION' && (
              <>
                {' '}
                <i className="fa fa-angle-down" />
              </>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default TimelineCard;
