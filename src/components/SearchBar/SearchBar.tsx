import React from "react";
import { Flex, TextInput, View } from "vcc-ui";

const SearchBar = (props) => {
  const [value, setValue] = React.useState("");
  const searchCar = (query) => {
    const result =
      props.itemList &&
      props.itemList.filter((post) => {
        if (query === "") {
          setValue("");
          return post;
        } else if (post.modelName.toLowerCase().includes(query.toLowerCase())) {
          setValue(query);
          return post;
        } else {
          setValue(query);
        }
      });
    props.setFilteredList(result);
  };
  return (
    <Flex
      extend={{
        alignItems: "center"
      }}
    >
      <TextInput
        value={value}
        placeholder="Search here"
        type="text"
        onChange={(e) => {
          searchCar(e.target.value);
        }}
      />
    </Flex>
  );
};

export default SearchBar;
