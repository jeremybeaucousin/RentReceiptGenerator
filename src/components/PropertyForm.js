import React from 'react';

import { FormControl, InputGroup, Row, Col } from 'react-bootstrap';

export class PropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChanges = props.handleChanges;
        this.state = {
            property: props.property
        };
    }

    handlePropertyChange = event => {
        let value = event.target.value;
        const column = event.target.name;
        this.setState(prevState => {
            let property = Object.assign(Object.create(Object.getPrototypeOf(prevState.property)), prevState.property);
            if (value && ["rent", "charges"].includes(column)) {
                value = parseFloat(value);
            }
            property[column] = value;
            this.handleChanges(property);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.property !== this.state.property) || (prevState.property !== this.state.property)) {
            this.setState((state, props) => {
                return { property: props.property };
            });
        }
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="PropertiesAdminName">Nom du bien :</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Nom du bien" name="name" type="text" value={this.state.property.name}
                                aria-label="Nom du bien" aria-describedby="PropertiesAdminName" onChange={this.handlePropertyChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="PropertiesAdminAdresse">Addresse du bien :</InputGroup.Text>
                            </InputGroup.Prepend>
                            <textarea className="form-control textarea-autosize" name="adress" id="adresse" value={this.state.property.adress} onChange={this.handlePropertyChange}
                                aria-label="Addresse du bien" aria-describedby="PropertiesAdminAdresse" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="PropertiesAdminRent">Loyer :</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Loyer" type="number" name="rent" value={this.state.property.rent}
                                aria-label="Loyer" aria-describedby="PropertiesAdminRent" onChange={this.handlePropertyChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="PropertiesAdminCharges">Charges :</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Charges" type="number" name="charges" value={this.state.property.charges}
                                aria-label="Charges" aria-describedby="PropertiesAdminCharges" onChange={this.handlePropertyChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </>
        );
    }
}