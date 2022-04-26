import React from "react";
import { SelectInput, Text } from "vcc-ui";
import { IFilterList } from "../util/types";

const SelectFilter: React.FC<IFilterList> = ({ itemList, setFilteredList }) => {
  const [value, setValue] = React.useState("");
  console.log("itemList", itemList);
  const uniqueBodyTypes: any = [
    ...new Set(itemList.map((item: any) => item.bodyType))
  ];
  const onInputSelect = (e: any) => {
    setValue(e)
    const filtered = itemList.filter((item) => {
      if (e == item.bodyType || e == "All") {
        return item;
      }
    });
    setFilteredList(filtered);
  };
  return (
    <>
      <Text>Please select body type</Text>
      <SelectInput
        value={value}
        onChange={(e) => onInputSelect(e.target.value)}
      >
        <option value="All">All</option>
        {uniqueBodyTypes &&
          uniqueBodyTypes.map((element: string) => (
            <option key={element} value={element}>
              {element.toUpperCase()}
            </option>
          ))}
      </SelectInput>
    </>
  );
};
export default SelectFilter;
