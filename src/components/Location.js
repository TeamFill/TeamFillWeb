import { Input } from "antd";
import React from "react";
import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete";


type Props = {
  address: string;
  clearAddress: any;
  onChange: any;
  onAddressSelect: any;
};

type State = {
  address: string;
};

export class LocationSearchInput extends React.Component<Props, State> {
  state: State = {
    address: this.props.address
  };

  handleAddressChange = (address: string): void => {
    this.setState({ address });
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.address !== this.props.address) {
      this.setState({ address: nextProps.address });
    }
  }

  render(): JSX.Element {
    const { address } = this.state;

    return (
      <PlacesAutocomplete onChange={this.handleAddressChange} onSelect={this.props.onAddressSelect} value={address}>
        {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
          <React.Fragment>
            <Input
              {...getInputProps({
                id: "address-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion: Suggestion) => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer", padding: 25 }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };

                const spread: any = {
                  ...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })
                };

                return (
                  <div {...spread} key={suggestion.id}>
                    <div>{suggestion.description}</div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </PlacesAutocomplete>
    );
  }
}
SomeComponent.tsx
import { Card, Col, Divider, Form, Input, Row } from "antd";
import { LocationSearchInput } from "./location-search";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { FormComponentProps } from "antd/lib/form/Form";

type Props = {} & FormComponentProps;

type State = {
  address: string;
};

class SomeClass extends React.Component<Props, State> {
  state: State = {
    address: ""
  };

  clearAddress = (): void => {
    // Clear with this.props.form.setFieldsValue();
  };

  handleAddressChange = (address: string): void => {
    // Do something with address
  };

  handleAddressSelect = (address: string, placeID: string): void => {
    geocodeByAddress(address)
      .then(async (results: google.maps.GeocoderResult[]) => {
        // Do something with results[0]
        return getLatLng(results[0]);
      })
      .then((latLng: google.maps.LatLngLiteral) => {
        // Do something with latLng
      })
      .catch((error: any) => {
        console.error("Error", error);
      });
  };

  componentDidMount(): void {
    this.props.form.setFieldsValue({
      addressInput: ""
    });
  }

  render() {
    return (
      <Form>
        <Row>
          <Col>
            <FormItem>
              <span>Address</span>
              {getFieldDecorator("addressInput", {
                initialValue: "",
                rules: [{ required: false }]
              })(
                <LocationSearchInput
                  address={this.state.address}
                  clearAddress={this.clearAddress}
                  onChange={this.handleAddressChange}
                  onAddressSelect={this.handleAddressSelect}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const WrappedSomeClass = Form.create()(SomeClass);