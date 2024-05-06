import FormHeader from "../FormHeader";
import { PatientEventCategories } from "../../../model/patient/PatientEventCategory";
import VStack from "../../containers/VStack";
import LeafTextInput from "../../base/LeafTextInput/LeafTextInput";
import { useState } from "react";
import LeafDimensions from "../../styling/LeafDimensions";
import { EventCategoryFields } from "./EventCategoryFields";

interface Props {
  category: PatientEventCategories;
}

const EventCategoryContainer: React.FC<Props> = ({category}) => {
  const [title, setTitle] = useState<string | undefined>();

  return (
    <>
      <FormHeader title={category.toString()} />
      <VStack
        spacing={LeafDimensions.screenSpacing}
        style={{
          flex: 1,
        }}
      >
        {Object.keys(EventCategoryFields[category]).map((fieldName) => {
          return (
            <LeafTextInput key={fieldName} label={fieldName} onTextChange={(text: string) => setTitle(text)} />
          )
        })}
      </VStack>
    </>
  )
}

export default EventCategoryContainer;
