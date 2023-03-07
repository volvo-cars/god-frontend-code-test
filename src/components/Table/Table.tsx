import React from 'react';
import { Col, Row, Text } from 'vcc-ui';
import styles from './Table.module.scss';

type TableProps = {
  data: Record<string, string | number>;
  style?: React.CSSProperties;
};

const Table: React.FC<TableProps> = (props) => {
  return (
    <article style={props.style}>
      {Object.keys(props.data).map((key) => {
        const value = props.data[key];

        return (
          <div key={key} className={styles.row}>
            <Row>
              <Col size={3}>
                <Text subStyle="emphasis">{key}</Text>
              </Col>
              <Col size={3}>
                <Text>{value}</Text>
              </Col>
            </Row>
          </div>
        );
      })}
    </article>
  );
};

export default Table;
