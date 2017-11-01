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
    onChange = (e, value) => {
        const filtered = this.props.items.filter(repository => value ? repository.name.includes(value) : true);
        this.setState({
            items: filtered
        });
    };
    render() {
        return [
            <TextField
                key={"list-filter"}
                className="list-filter"
                name="list-filter"
                hintText="Repository Name"
                floatingLabelText="Filter Results"
                onChange={ this.onChange }
            />,
            <RepositoryList
                key={"list"}
                {...this.props}
                items={ this.state.items }
            />
        ];
    }
}

export default FilteredRepositoryList;