import React from "react";
import VStack from "../../containers/VStack";
import LeafTextInput from "../LeafTextInput/LeafTextInput";
import LeafDateInput from "../LeafDateInput/LeafDateInput";
import LeafNumberInput from "../LeafNumberInput/LeafNumberInput";

interface Props {
  label: string;
  type: string;
}

const LeafDynamicInput: React.FC<Props> = ({
  label,
  type,
}) => {
  return (
      <VStack
          spacing={2}
      >
        {
          {
            'string': <LeafTextInput label={label} onTextChange={(text: string) => text} />,
            'number': <LeafNumberInput label={label} onChange={(number: number) => number} />,
            'date': <LeafDateInput label={label} onChange={(date: Date | undefined) => date} />
          }[type]
        }
      </VStack>
  );
};

export default LeafDynamicInput;
