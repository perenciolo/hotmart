import React, { useMemo } from 'react';

interface StatusCardProps {
  status: 'OPEN'|'PENDING'|'FINISHED'
}

function StatusCard(
  { status }:StatusCardProps,
) {
  const statusTxt = useMemo(() => {
    if (status === 'OPEN') return 'Aberto';
    if (status === 'PENDING') return 'Em preenchimento';

    return 'Finalizado';
  }, [status]);
  return (
    <div className={`rounded-md bg-${status === 'OPEN' ? 'success-100' : 'hotgray-dark'} text-${status === 'OPEN' ? 'success-500' : 'navy'} border-2 border-${status === 'OPEN' ? 'success-500' : 'navy'} p-2 flex flex-col items-center`}>
      <p className="text-base">
        Status
      </p>
      <p className="font-bold text-2xl mt-2">{statusTxt}</p>
    </div>
  );
}

export default StatusCard;
