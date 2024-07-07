import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from './datePicker';

interface SelectorProps {
  departments: string[];
  regions: string[];
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onRegionChange: (region: string) => void;
  onDepartmentChange: (department: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ departments, regions, onStartDateChange, onEndDateChange, onRegionChange, onDepartmentChange }) => {
  return (
    <div className="flex justify-start space-x-4 mb-4 lg:flex-nowrap">
      <div className="w-40 mb-2">
        <Select onValueChange={(value) => onRegionChange(value === "all" ? "" : value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Région" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les régions</SelectItem>
            {regions.map((region, index) => (
              <SelectItem key={index} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-40 mb-2">
        <Select onValueChange={(value) => onDepartmentChange(value === "all" ? "" : value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Département" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les départements</SelectItem>
            {departments.map((department, index) => (
              <SelectItem key={index} value={department}>{department}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-40 mb-2">
        <DatePicker label="Date de début" onDateChange={(date) => onStartDateChange(date ? new Date(date) : null)} initialDate={new Date('2010-01-01')} />
      </div>
      <div className="w-40 mb-2">
        <DatePicker label="Date de fin" onDateChange={(date) => onEndDateChange(date ? new Date(date) : null)} initialDate={new Date('2024-06-30')} />
      </div>
    </div>
  );
};

export default Selector;
