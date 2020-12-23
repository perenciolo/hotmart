import React, { useRef, useContext } from 'react';

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'react-feather';
import { Manager, Reference, Popper } from 'react-popper';

import { DatepickerCtx, useDatepickerCtx } from '../../context/DatepickerContext';

const buttonClassName = 'hover:bg-gray-200 rounded p-1 text-sm flex align-center justify-center focus:outline-none';

const daysOfWeekNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const inputStyle = {
  paddingTop: '0.375rem',
  paddingBottom: '0.375rem',
};

interface IRawDatePickerProps {
  date: Date|null;
  onChange: (date: Date) => void;
}
export function RawDatePicker({ date, onChange }: IRawDatePickerProps) {
  const popupNode = useRef<HTMLElement>();
  const ctxValue = useDatepickerCtx(date, onChange, popupNode);

  return (
    <DatepickerCtx.Provider value={ctxValue}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className="flex border-2 rounded" ref={ref}>
              <button
                className="bg-hotgray-dark rflex items-center justify-center text-sm font-semibold text-gray-700 px-2 focus:outline-none"
                onClick={(e) => ctxValue.toggleCalendar()}
                type="button"
              >
                <CalendarIcon size="20" color="#666" />
              </button>
              <input
                className="px-3 outline-none focus:border-gray-400 flex-grow text-gray-700 text-sm"
                type="text"
                style={inputStyle}
                onFocus={(e) => ctxValue.showCalendar()}
                value={date ? formattedDate(date) : ''}
                readOnly
                placeholder="Select date"
              />
            </div>
          )}
        </Reference>
        <Popper placement="bottom-start" innerRef={(node) => { (popupNode.current = node); }}>
          {({
            ref, style, placement,
          }) => (ctxValue.isVisible ? (
            <Calendar
              placement={placement}
              style={style}
              ref={ref as React.Ref<HTMLDivElement>}
            />
          ) : null)}
        </Popper>
      </Manager>
    </DatepickerCtx.Provider>
  );
}

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

export function DatePicker(props:DatePickerProps) {
  return (
    <RawDatePicker date={props.date} onChange={props.onChange} />
  );
}

interface ICalButtonProps {
  chevron?: 'right' | 'left';
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: string;
  children: React.ReactNode;
}
function CalButton(props: ICalButtonProps) {
  let children = null;

  if (props.chevron && props.chevron === 'left') {
    children = <ChevronLeft size={20} className="stroke-current" />;
  } else if (props.chevron && props.chevron === 'right') {
    children = <ChevronRight size={20} className="stroke-current" />;
  } else children = props.children;

  return (
    <button
      className={`${buttonClassName} ${props.className}`}
      style={props.style}
      onClick={props.onClick}
      type={props.type || 'button'}
    >
      {children}
    </button>
  );
}

interface CalendarProps {
  style: React.CSSProperties;
  placement: string;
  ref: React.Ref<HTMLDivElement>;
}

const Calendar: React.FC<CalendarProps> = React.forwardRef<HTMLDivElement, CalendarProps>(
  (props, ref) => {
    const { view } = useContext(DatepickerCtx);

    let selectionComponent = null;
    switch (view) {
      case 'date':
        selectionComponent = <DateSelection />;
        break;
      case 'month':
        selectionComponent = <MonthSelection />;
        break;
      case 'year':
        selectionComponent = <YearSelection />;
        break;
      default:
        break;
    }

    return (
      <div
        className="bg-white relative shadow-lg z-30 max-w-xs w-full p-2 rounded-lg"
        ref={ref}
        data-placement={props.placement}
        style={props.style}
      >
        {selectionComponent}
      </div>
    );
  },
);

/**
 * Date Selection Component
 * @param props
 */
const DateSelection: React.FC<{}> = (props) => {
  const {
    nextMonth,
    prevMonth,
    viewMonths,
    viewYears,
    selectDate,
    visible: { month, year },
    isSelectedDate,
  } = useContext(DatepickerCtx);

  const dates = [];

  for (let i = 0; i < beginningDayOfWeek(month, year); i++) {
    dates.push(<div key={`emptybefore${i}`} />);
  }

  for (let i = 1; i <= daysInMonth(month, year); i++) {
    dates.push(
      <button
        key={`day${i}`}
        className={`hover:bg-gray-200 rounded p-1 text-sm ${
          isSelectedDate(i) ? 'bg-gray-300 font-semibold' : ''
        }`}
        onClick={() => selectDate(i)}
        style={{ textAlign: 'center' }}
      >
        {i}
      </button>,
    );
  }

  return (
    <div
      className="text-gray-800"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateRows: '2rem auto',
        alignItems: 'stretch',
      }}
    >
      <button className={buttonClassName} onClick={(e) => prevMonth()} type="button">
        <ChevronLeft size={20} className="stroke-current" />
      </button>

      <button
        className={`${buttonClassName} font-semibold`}
        style={{ gridColumn: '2/5' }}
        onClick={(e) => viewMonths()}
        type="button"
      >
        {monthNames[month]}
      </button>

      <button
        className={`${buttonClassName} font-semibold`}
        style={{ gridColumn: '5/7' }}
        onClick={(e) => viewYears()}
        type="button"
      >
        {year}
      </button>

      <button className={buttonClassName} onClick={(e) => nextMonth()} type="button">
        <ChevronRight size={20} className="stroke-current" />
      </button>

      {daysOfWeekNames.map((day) => (
        <div
          key={(200 + day).toString()}
          className="p-1 text-sm font-semibold"
          style={{ textAlign: 'center' }}
        >
          {day[0]}
        </div>
      ))}

      {dates}
    </div>
  );
};

/**
 * Month Selection Component
 * @param props
 */
const MonthSelection: React.FC<{}> = (props) => {
  const {
    viewYears, selectMonth, nextYear, prevYear, visible,
  } = useContext(DatepickerCtx);

  return (
    <div
      className="h-48"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '2rem auto',
        alignItems: 'stretch',
      }}
    >
      <div className="flex" style={{ gridColumn: '1/5' }}>
        <CalButton chevron="left" onClick={(e) => prevYear()} />
        <CalButton className="flex-grow" onClick={(e) => viewYears()}>
          {visible.year}
        </CalButton>
        <CalButton chevron="right" onClick={(e) => nextYear()} />
      </div>

      {monthNames.map((month, index) => (
        <CalButton onClick={(e) => selectMonth(index)}>{month.substring(0, 3)}</CalButton>
      ))}
    </div>
  );
};

/**
 * Year Selection Component
 * @param props
 */
const YearSelection: React.FC<{}> = (props) => {
  const {
    selectYear,
    prevDecade,
    nextDecade,
    visible: { year },
  } = useContext(DatepickerCtx);

  const years = [];
  const [minYear, maxYear] = [year - 6, year + 6];

  for (let i = minYear; i < maxYear; i++) {
    years.push(<CalButton onClick={(e) => selectYear(i)}>{i}</CalButton>);
  }

  return (
    <div
      className="h-48"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '2rem auto',
        alignItems: 'stretch',
      }}
    >
      <div className="flex" style={{ gridColumn: '1/5' }}>
        <CalButton chevron="left" onClick={(e) => prevDecade()} />
        <CalButton className="flex-grow">{`${minYear} - ${maxYear - 1}`}</CalButton>
        <CalButton chevron="right" onClick={(e) => nextDecade()} />
      </div>

      {years}
    </div>
  );
};

/**
 * Util functions
 */
/**
 * For formatting date
 * @param date
 */
function formattedDate(date: Date): string {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Beginning of Day of Week of a Month
 * @param date
 */
function beginningDayOfWeek(m: number, y: number): number {
  return new Date(y, m, 1).getDay();
}

/**
 * Is Leap Year
 * @param year
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Days in month
 */
function daysInMonth(month: number, year: number) {
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 1:
      return isLeapYear(year) ? 29 : 28;
    default:
      return 30;
  }
}
