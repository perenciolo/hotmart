import React, { useMemo } from 'react';

interface StatusCardProps {
  status: 'OPEN'|'CLOSED'|'FINISHED'
}

function StatusCard(
  { status }:StatusCardProps,
) {
  const statusTxt = useMemo(() => {
    if (status === 'OPEN') return 'Aberto';
    return 'Finalizado';
  }, [status]);
  return (
    <div className="rounded-md bg-success-100 text-success-500 border-2 border-success-500 p-2 flex flex-col items-center">
      <p className="text-base">
        Status
      </p>
      <p className="font-bold text-2xl mt-2">{statusTxt}</p>
    </div>
  );
}

export default StatusCard;
