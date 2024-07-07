import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from "@/components/ui/input";

interface DatePickerProps {
  label: string;
  onDateChange: (date: Date | undefined) => void;
  initialDate?: Date;
}

export function DatePicker({ label, onDateChange, initialDate }: DatePickerProps) {
  const formatDate = (date: Date | undefined): string => {
    return date ? format(date, 'yyyy/MM/dd') : '';
  };

  const parseDate = (value: string): Date | undefined => {
    const parsed = parse(value, 'yyyy/MM/dd', new Date());
    return isNaN(parsed.getTime()) ? undefined : parsed;
  };

  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [inputValue, setInputValue] = useState<string>(formatDate(initialDate));

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    onDateChange(date);
    setInputValue(formatDate(date));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setDate(parsedDate);
      onDateChange(parsedDate);
    } else {
      setDate(undefined);
      onDateChange(undefined);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="yyyy/MM/dd"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
