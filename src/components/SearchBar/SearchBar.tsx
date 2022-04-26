import React from "react";
import { Flex, TextInput, View } from "vcc-ui";
import { CarInfo, SearchList } from "../../util/types";

const SearchBar: React.FC<SearchList> = ({ itemList, setFilteredList }) => {
  const [value, setValue] = React.useState("");
  const searchCar = (value: string) => {
    const result =
      itemList &&
      itemList.filter((item: CarInfo) => {
        if (value === "") {
          setValue("");
          return item;
        } else if (item.bodyType.toLowerCase().includes(value.toLowerCase())) {
          setValue(value);
          return item;
        } else {
          setValue(value);
        }
      });
    setFilteredList(result);
  };
  return (
    <Flex
      extend={{
        alignItems: "center",
        padding: "50px 0px 50px 0px"
      }}
    >
      <View extend={{ width: "400px" }}>
        <TextInput
          value={value}
          placeholder="Search"
          type="text"
          onChange={(e) => {
            searchCar(e.target.value);
          }}
        />
      </View>
    </Flex>
  );
};

export default SearchBar;
