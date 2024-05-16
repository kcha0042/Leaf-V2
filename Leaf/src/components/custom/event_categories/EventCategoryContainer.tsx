import FormHeader from "../FormHeader";
import { PatientEventCategories } from "../../../model/patient/PatientEventCategory";
import VStack from "../../containers/VStack";
import LeafDimensions from "../../styling/LeafDimensions";
import { EventCategoryFields } from "./EventCategoryFields";
import LeafDynamicInput from "../../base/LeafDynamicInput/LeafDynamicInput";
import React from "react";

interface Props {
  category: PatientEventCategories;
}

const EventCategoryContainer: React.FC<Props> = ({category}) => {
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
            <LeafDynamicInput label={fieldName} type={EventCategoryFields[category][fieldName]} />
          )
        })}
      </VStack>
    </>
  )
}

export default EventCategoryContainer;
