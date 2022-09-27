import React from 'react';
import { Block, Spacer, useTheme } from 'vcc-ui';

type DotPropsType = {
  active: boolean;
};

export const Dot: React.FC<DotPropsType> = (props) => {
  const theme = useTheme();
  const { active } = props;
  return (
    <>
      <Block
        extend={{
          borderRadius: '50%',
          backgroundColor: active
            ? theme.color.foreground.primary
            : theme.color.ornament.divider,
          width: '8px',
          height: '8px',
        }}
      />
      <Spacer size={1} />
    </>
  );
};
