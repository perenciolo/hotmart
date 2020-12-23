import React, {
  createContext, useCallback, useState, useContext, useEffect,
} from 'react';

import {
  Person,
  CostCenter,
  AccountabilityExtraInfo,
  SidebarContent,
  Sort,
  TimelineItem,
} from '../types/default.types';

interface AppContextData {
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
  setTimelineItem: (payload: TimelineItem) => void;
}
const AppContext = createContext<AppContextData>({} as AppContextData);

interface AppProviderProps {
  children?: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [header, setHeader] = useState<AppContextData['header']>({} as AppContextData['header']);
  const [sidebar, setSideBar] = useState<AppContextData['sidebar']>(
    {} as AppContextData['sidebar'],
  );
  const [timeline, setTimeline] = useState<AppContextData['timeline']>(
    {} as AppContextData['timeline'],
  );

  const setTimelineItem = useCallback((payload: TimelineItem) => {
    setTimeline({ ...timeline, ...payload });
  }, []);

  const requests = useCallback(async () => {
    setHeader(
      await fetch('https://api-front-end-challenge.buildstaging.com/api/header').then((res) => res.json()),
    );

    setSideBar(
      await fetch('https://api-front-end-challenge.buildstaging.com/api/sidebar').then((res) => res.json()),
    );

    setTimeline(
      await fetch('https://api-front-end-challenge.buildstaging.com/api/timeline').then((res) => res.json()),
    );
  }, []);

  useEffect(() => {
    requests();
  }, []);

  return (
    <AppContext.Provider value={{
      header, sidebar, timeline, setTimelineItem,
    }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppCtx(): AppContextData {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppCtx must be used within an AppProvider');
  }

  return context;
}
