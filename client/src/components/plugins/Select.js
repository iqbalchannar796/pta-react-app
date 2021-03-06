import React, { Fragment } from 'react';
import Select from 'react-select';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageHeader from '../common/PageHeader';
import FalconEditor from '../common/FalconEditor';

const selectCode = `function SelectExample() {
  const [value, setValue] = useState(null);
  
  const options = [
    { value: 1, label: 'Microsoft Corporation' },
    { value: 2, label: 'Technext Limited' },
    { value: 3, label: 'Hewlett-Packard' }
  ];
  
  return (
    <Select
      value={value}
      onChange={value => setValue(value)}
      classNamePrefix='react-select'
      options={options}
    />
  );
}`;

const selectMultiCode = `function SelectExample() {
  const [value, setValue] = useState(null);
  
  const options = [
    { value: 1, label: 'Microsoft Corporation' },
    { value: 2, label: 'Technext Limited' },
    { value: 3, label: 'Hewlett-Packard' }
  ];
  
  return (
    <Select
      value={value}
      onChange={value => setValue(value)}
      classNamePrefix='react-select'
      options={options}
      isMulti
    />
  );
}`;

const SelectExample = () => (
  <Fragment>
    <PageHeader
      title="React Select"
      description="A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support."
      className="mb-3"
    >
      <Button tag="a" href="https://react-select.com/" target="_blank" color="link" size="sm" className="pl-0">
        React Select Documentation
        <FontAwesomeIcon icon="chevron-right" className="ml-1 fs--2" />
      </Button>
    </PageHeader>
    <Card>
      <CardBody className="bg-light">
        <Row>
          <Col lg className="mb-4 mb-lg-0">
            <FalconEditor code={selectCode} scope={{ Select }} language="jsx" />
          </Col>
          <Col>
            <FalconEditor code={selectMultiCode} scope={{ Select }} language="jsx" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  </Fragment>
);

export default SelectExample;
