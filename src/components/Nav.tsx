import React from "react";
import { TabNav, TabNavItem } from "vcc-ui";

type NavProps = {
  types: string[];
  onSelected: (type: string) => void;
};

const Nav = (props: NavProps) => {
  const [active, setActive] = React.useState('all');
  return (
    <>
      <TabNav enableLineTransition>
        <TabNavItem
          isActive={active === "all"}
          onClick={() => {
            setActive("all");
            props.onSelected("clear");
          }}
        >
          ALL
        </TabNavItem>

        {props.types.map((t, i) => {
          return (
            <TabNavItem
              key={t}
              isActive={active === t}
              onClick={() => {
                setActive(t);
                props.onSelected(t);
              }}
            >
              {t.toLocaleUpperCase()}
            </TabNavItem>
          );
        })}
      </TabNav>
    </>
  );
};

export default Nav;
