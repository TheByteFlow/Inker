import React from "react";
import { Input } from "@/components/ui/input";

const KeyValueInput: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Input type="text" placeholder="Platform" className="w-1/3" />
      <span>:</span>
      <Input type="url" placeholder="Enter URL" className="w-2/3" />
    </div>
  );
};

export default KeyValueInput;
