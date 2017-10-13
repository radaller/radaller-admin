import React, { Component } from 'react';
import RepositoryList from './RepositoryList';
import TextField from 'material-ui/TextField';

class FilteredRepositoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        }
    }
    onChange(value) {
        const filtered = this.props.items.filter(repository => value ? repository.name.includes(value) : true);
        this.setState({
            items: filtered
        });
    }
    render() {
        return [
            <TextField
                key={"search"}
                hintText="Repository Name"
                floatingLabelText="Filter Results"
                onChange={ (e, value) => this.onChange(value) }
            />,
            <RepositoryList
                key={"list"}
                {...this.props}
                items={this.state.items}
            />
        ];
    }
}

export default FilteredRepositoryList;