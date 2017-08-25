import { observable, action, useStrict, isObservable } from 'mobx';
import Field from './field';
useStrict(true);

class Form {
    @observable fields = [];
    valid = true;

    constructor(fields) {
        this.setFields(fields);
    }

    @action setFields(fields) {
        this.fields = [];

        fields.forEach((field) => {
            this.addField(field);
        });
    }

    @action addField(field) {
        const isObservableField = isObservable(field);
        const el = isObservableField ? field : new Field(field);
        this.fields.push(el);
    }

    @action validate() {
        this.fields.forEach((field) => {
            field.validate();
        });

        this.valid = this.fields.every(field => !field.error);
    }

    @action getFieldsData() {
        const data = {};
        this.fields.forEach(field => data[field.name] = field.value);
        return data;
    }
}

export default Form;