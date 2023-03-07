import React from 'react';
import { Block, Nav, NavItem } from 'vcc-ui';
import { capitalize } from '../../services/utils';

type FilterProps = {
  types: string[];
  handleClick: (type: string) => void;
  selected: string;
};

const Filter: React.FC<FilterProps> = (props) => {
  const handleClick = (type: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      props.handleClick(type);
    };
  };

  return (
    <Block extend={{ margin: '1rem', textAlign: 'right' }}>
      <Nav>
        <NavItem
          isActive={props.selected === 'all'}
          onClick={handleClick('all')}
        >
          All
        </NavItem>
        {props.types.map((type) => (
          <NavItem
            isActive={props.selected === type}
            key={type}
            onClick={handleClick(type)}
          >
            {capitalize(type)}
          </NavItem>
        ))}
      </Nav>
    </Block>
  );
};

export default Filter;
